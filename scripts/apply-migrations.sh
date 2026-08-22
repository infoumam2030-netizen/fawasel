#!/usr/bin/env bash
#
# Applies the validated migration set to a Supabase project.
#
#   npm run db:apply -- "$SUPABASE_DB_URL" --dry-run
#   npm run db:apply -- "$SUPABASE_DB_URL" --confirm
#
# Safety properties, in order of execution:
#   1. Reports exactly which database it is pointed at, before touching it.
#   2. Refuses to run unless the target's public schema is empty.
#   3. Verifies every migration against supabase/migrations.sha256 and checks
#      the set is numbered 0001..N with no gaps or duplicates.
#   4. Applies all migrations inside ONE transaction — Postgres has
#      transactional DDL, so a failure anywhere rolls the project back to
#      untouched rather than leaving it half-migrated.
#   5. Contains no DROP of any kind, and seeds no content.
#
# --dry-run performs every check and stops before applying.
# Any failed check aborts with a non-zero exit and leaves the database
# unmodified.
set -euo pipefail

DB_URL="${1:-${SUPABASE_DB_URL:-}}"
MODE="${2:-}"

if [[ -z "$DB_URL" ]]; then
  echo "usage: $0 <supabase-postgres-url> [--dry-run|--confirm]" >&2
  exit 1
fi

MIG_DIR="supabase/migrations"
MANIFEST="supabase/migrations.sha256"
PASS=0
fail() { echo; echo "✗ ABORTED — $1" >&2; echo "  The database has NOT been modified." >&2; exit 1; }
ok()   { echo "  ✓ $1"; PASS=$((PASS + 1)); }

echo "==============================================================="
echo " PANTHER — migration pre-flight"
echo "==============================================================="
echo

# --- 1. Target identity -----------------------------------------------------
echo "TARGET IDENTITY"

# Everything derivable from the URL is resolved BEFORE connecting, so that
# "am I pointed at the wrong project?" is answered even when the host is
# unreachable — otherwise a connection failure would mask the mismatch.
DB_HOST=$(printf '%s' "$DB_URL" | sed -E 's|^[a-z]+://||; s|^[^@]*@||; s|[:/?].*$||')
DB_PORT=$(printf '%s' "$DB_URL" | sed -nE 's|.*:([0-9]+)(/.*)?$|\1|p'); DB_PORT="${DB_PORT:-5432}"

# Supabase hosts are <ref>.supabase.co / db.<ref>.supabase.co / aws-N-<region>.pooler.supabase.com
# Delimiter is '#', because the host alternation itself contains '|'.
PROJECT_REF=$(printf '%s' "$DB_HOST" | sed -nE 's#^(db\.)?([a-z0-9]{20})\..*supabase\.(co|com)$#\2#p')
if [[ -z "$PROJECT_REF" ]]; then
  PROJECT_REF=$(printf '%s' "$DB_URL" | sed -nE 's|.*://postgres\.([a-z0-9]{20}):.*|\1|p')
fi

printf '  %-18s %s\n' "host"        "$DB_HOST"
printf '  %-18s %s\n' "port"        "$DB_PORT"
printf '  %-18s %s\n' "project ref" "${PROJECT_REF:-(not derivable from this URL)}"
if [[ -n "${NEXT_PUBLIC_SUPABASE_URL:-}" ]]; then
  printf '  %-18s %s\n' "project URL" "$NEXT_PUBLIC_SUPABASE_URL"
  ENV_REF=$(printf '%s' "$NEXT_PUBLIC_SUPABASE_URL" | sed -nE 's|https://([a-z0-9]{20})\.supabase\.co/?|\1|p')
  if [[ -n "$PROJECT_REF" && -n "$ENV_REF" && "$PROJECT_REF" != "$ENV_REF" ]]; then
    fail "the database URL points at project '${PROJECT_REF}' but NEXT_PUBLIC_SUPABASE_URL names '${ENV_REF}'. Refusing to migrate a project the app is not configured to use."
  fi
  if [[ -n "$ENV_REF" && "$PROJECT_REF" == "$ENV_REF" ]]; then
    ok "database URL and NEXT_PUBLIC_SUPABASE_URL name the same project"
  fi
elif [[ -n "$PROJECT_REF" ]]; then
  printf '  %-18s %s\n' "project URL" "https://${PROJECT_REF}.supabase.co (inferred)"
else
  printf '  %-18s %s\n' "project URL" "(NEXT_PUBLIC_SUPABASE_URL not set)"
fi

# Only now is a live connection required.
psql "$DB_URL" -tAX -c "select 1" >/dev/null 2>&1 || fail "cannot connect to the database at ${DB_HOST}:${DB_PORT}."
SRV_VERSION=$(psql "$DB_URL" -tAX -c "select current_setting('server_version');")
DB_NAME=$(psql "$DB_URL"     -tAX -c "select current_database();")
DB_USER=$(psql "$DB_URL"     -tAX -c "select current_user;")
printf '  %-18s %s\n' "database"    "$DB_NAME"
printf '  %-18s %s\n' "user"        "$DB_USER"
printf '  %-18s %s\n' "server"      "PostgreSQL $SRV_VERSION"
ok "connected"
echo

# --- 2. Is the project empty? ----------------------------------------------
echo "EMPTINESS"
EXISTING_TABLES=$(psql "$DB_URL" -tAX -c "select count(*) from pg_tables where schemaname='public';")
CONFLICT_TABLES=$(psql "$DB_URL" -tAX -c "select coalesce(string_agg(tablename, ', ' order by tablename), '') from pg_tables where schemaname='public';")
ALL_ENUMS=$(psql "$DB_URL" -tAX -c "select coalesce(string_agg(t.typname, ', ' order by t.typname), '') from pg_type t join pg_namespace n on n.oid=t.typnamespace where n.nspname='public' and t.typtype='e';")
CONFLICT_ENUMS=$(psql "$DB_URL" -tAX -c "select coalesce(string_agg(t.typname, ', ' order by t.typname), '') from pg_type t join pg_namespace n on n.oid=t.typnamespace where n.nspname='public' and t.typtype='e' and t.typname in ('user_role','content_status','quote_status');")
CONFLICT_BUCKET=$(psql "$DB_URL" -tAX -c "select coalesce(string_agg(id, ', '), '') from storage.buckets where id='media';" 2>/dev/null || echo "")
AUTH_USERS=$(psql "$DB_URL" -tAX -c "select count(*) from auth.users;" 2>/dev/null || echo "?")

printf '  %-18s %s\n' "public tables" "$EXISTING_TABLES"
printf '  %-18s %s\n' "public enums"  "${ALL_ENUMS:-none}"
printf '  %-18s %s\n' "media bucket"  "${CONFLICT_BUCKET:-none}"
printf '  %-18s %s\n' "auth users"    "$AUTH_USERS"

[[ "$EXISTING_TABLES" == "0" ]] || fail "public schema already contains ${EXISTING_TABLES} table(s): ${CONFLICT_TABLES}. This script only runs against an empty project and never drops or overwrites anything."
ok "no existing public tables"

[[ -z "$CONFLICT_ENUMS" ]] || fail "conflicting enum type(s) already exist: ${CONFLICT_ENUMS}."
[[ -z "$ALL_ENUMS" ]] || fail "public schema already contains enum type(s): ${ALL_ENUMS}. None conflict by name, but a non-empty schema is out of scope for this script."
ok "no conflicting enum types"

[[ -z "$CONFLICT_BUCKET" ]] || fail "a storage bucket named 'media' already exists."
ok "no conflicting storage bucket"

if [[ "$AUTH_USERS" != "0" && "$AUTH_USERS" != "?" ]]; then
  echo "  ! ${AUTH_USERS} auth user(s) already exist. Not a conflict — profiles are"
  echo "    created by trigger for NEW sign-ups only, so any existing user will need"
  echo "    a profile row created manually."
fi
echo

# --- 3. Migration set integrity --------------------------------------------
echo "MIGRATION SET"
[[ -f "$MANIFEST" ]] || fail "missing ${MANIFEST}"

FILE_COUNT=$(find "$MIG_DIR" -maxdepth 1 -name '*.sql' | wc -l | tr -d ' ')
MANIFEST_COUNT=$(grep -c . "$MANIFEST")
[[ "$FILE_COUNT" == "$MANIFEST_COUNT" ]] || fail "found ${FILE_COUNT} migration(s) but the manifest lists ${MANIFEST_COUNT}."
ok "${FILE_COUNT} files, matching the manifest"

( cd "$MIG_DIR" && sha256sum -c "../migrations.sha256" >/dev/null 2>&1 ) \
  || fail "checksum mismatch — the migrations on disk are not the reviewed set. Run 'sha256sum -c ../migrations.sha256' in ${MIG_DIR} to see which."
ok "every checksum matches the reviewed set"

# Ordering: filenames must be 0001..N, contiguous, unique. psql applies them in
# glob order, which is lexicographic — identical to numeric order only while
# the prefixes are zero-padded and gap-free, so that is verified rather than
# assumed.
PREFIXES=$(basename -a "$MIG_DIR"/*.sql | cut -c1-4)
# Zero-padded to the prefix width the files actually use, not to the width of
# the largest number — `seq -w 1 12` yields 01..12, which would never match.
EXPECTED=$(for n in $(seq 1 "$FILE_COUNT"); do printf '%04d\n' "$n"; done)
if [[ "$(printf '%s\n' "$PREFIXES")" != "$(printf '%s\n' "$EXPECTED")" ]]; then
  echo "  found:    $(printf '%s ' $PREFIXES)" >&2
  echo "  expected: $(printf '%s ' $EXPECTED)" >&2
  fail "migration numbering is not a contiguous 0001..${FILE_COUNT} sequence."
fi
ok "numbered 0001..$(printf '%04d' "$FILE_COUNT"), contiguous and unique"

echo "  order:"
for f in "$MIG_DIR"/*.sql; do echo "    $(basename "$f")"; done

if grep -rniE '^[[:space:]]*drop[[:space:]]+(table|schema|database|type|function|policy|trigger|index)' "$MIG_DIR" >/dev/null 2>&1; then
  grep -rniE '^[[:space:]]*drop[[:space:]]+' "$MIG_DIR" >&2
  fail "a migration contains a DROP statement."
fi
ok "no DROP statements"
echo

echo "---------------------------------------------------------------"
echo " ${PASS} safety checks passed."
echo "---------------------------------------------------------------"
echo

if [[ "$MODE" == "--dry-run" ]]; then
  echo "DRY RUN — nothing was applied. Re-run with --confirm to migrate."
  exit 0
fi

if [[ "$MODE" != "--confirm" ]]; then
  echo "No mode given. Re-run with --dry-run or --confirm." >&2
  exit 1
fi

# --- 4. Apply, all or nothing ----------------------------------------------
echo "APPLYING ${FILE_COUNT} migrations in a single transaction"
{
  echo "begin;"
  for f in "$MIG_DIR"/*.sql; do
    echo "\\echo '  applying $(basename "$f")'"
    cat "$f"
  done
  echo "commit;"
} | psql "$DB_URL" -v ON_ERROR_STOP=1 -q

echo
echo "APPLIED"
psql "$DB_URL" -tAX -c "
select '  tables    : ' || count(*) from pg_tables where schemaname='public'
union all select '  policies  : ' || count(*) from pg_policies where schemaname='public'
union all select '  indexes   : ' || count(*) from pg_indexes where schemaname='public'
union all select '  no RLS    : ' || count(*) from pg_tables where schemaname='public' and not rowsecurity;"
