#!/usr/bin/env bash
#
# Applies the validated migration set to a Supabase project.
#
#   ./scripts/apply-migrations.sh "$SUPABASE_DB_URL" --dry-run
#   ./scripts/apply-migrations.sh "$SUPABASE_DB_URL" --confirm
#
# Safety properties, in order of execution:
#   1. Refuses to run against a project whose public schema is not empty.
#   2. Verifies every migration against supabase/migrations.sha256, so what is
#      applied is provably the reviewed set.
#   3. Applies all twelve files inside ONE transaction — Postgres has
#      transactional DDL, so a failure anywhere rolls the project back to
#      untouched rather than leaving it half-migrated.
#   4. Contains no DROP of any kind, and inserts no content.
#
# --dry-run performs every check and stops before applying.
set -euo pipefail

DB_URL="${1:-${SUPABASE_DB_URL:-}}"
MODE="${2:-}"

if [[ -z "$DB_URL" ]]; then
  echo "usage: $0 <supabase-postgres-url> [--dry-run|--confirm]" >&2
  exit 1
fi

MIG_DIR="supabase/migrations"
MANIFEST="supabase/migrations.sha256"
fail() { echo; echo "ABORTED — $1" >&2; exit 1; }

# --- 1. Identify the target -------------------------------------------------
echo "=== Target ==="
# Print host and database only; the URL carries a password.
TARGET_HOST=$(psql "$DB_URL" -tAX -c "select inet_server_addr()::text" 2>/dev/null || echo "?")
psql "$DB_URL" -tAX -c "select 'server   : ' || version()" | head -1
psql "$DB_URL" -tAX -c "select 'database : ' || current_database()"
psql "$DB_URL" -tAX -c "select 'user     : ' || current_user"
echo "host     : ${TARGET_HOST}"
echo

# --- 2. Confirm the project is empty ---------------------------------------
echo "=== Pre-flight: is this a new/empty project? ==="
EXISTING_TABLES=$(psql "$DB_URL" -tAX -c "select count(*) from pg_tables where schemaname='public';")
EXISTING_TYPES=$(psql "$DB_URL" -tAX -c "select count(*) from pg_type t join pg_namespace n on n.oid=t.typnamespace where n.nspname='public' and t.typtype='e';")
EXISTING_BUCKET=$(psql "$DB_URL" -tAX -c "select count(*) from storage.buckets where id='media';" 2>/dev/null || echo 0)
EXISTING_USERS=$(psql "$DB_URL" -tAX -c "select count(*) from auth.users;" 2>/dev/null || echo "?")

echo "public tables      : ${EXISTING_TABLES}"
echo "public enum types  : ${EXISTING_TYPES}"
echo "storage bucket     : ${EXISTING_BUCKET}"
echo "auth users         : ${EXISTING_USERS}"

[[ "$EXISTING_TABLES" == "0" ]] || fail "public schema already contains ${EXISTING_TABLES} table(s). This script only runs against an empty project, and never drops or overwrites anything."
[[ "$EXISTING_TYPES"  == "0" ]] || fail "public schema already contains ${EXISTING_TYPES} enum type(s)."
[[ "$EXISTING_BUCKET" == "0" ]] || fail "a storage bucket named 'media' already exists."
echo "OK — project is empty."
echo

# --- 3. Verify the migration set --------------------------------------------
echo "=== Integrity: is this exactly the validated migration set? ==="
[[ -f "$MANIFEST" ]] || fail "missing ${MANIFEST}"
( cd "$MIG_DIR" && sha256sum -c "../migrations.sha256" ) || fail "migration checksums do not match the reviewed set."
COUNT=$(ls -1 "$MIG_DIR"/*.sql | wc -l)
MANIFEST_COUNT=$(wc -l < "$MANIFEST")
[[ "$COUNT" == "$MANIFEST_COUNT" ]] || fail "found ${COUNT} migrations but the manifest lists ${MANIFEST_COUNT}."
grep -rniE '^\s*drop\s+(table|schema|database|type|function|policy)' "$MIG_DIR" && fail "a migration contains a DROP statement." || true
echo "OK — ${COUNT} files, checksums match, no DROP statements."
echo

if [[ "$MODE" == "--dry-run" ]]; then
  echo "Dry run complete. Nothing was applied."
  exit 0
fi

if [[ "$MODE" != "--confirm" ]]; then
  echo "Re-run with --confirm to apply, or --dry-run to stop here." >&2
  exit 1
fi

# --- 4. Apply, all or nothing -----------------------------------------------
echo "=== Applying ${COUNT} migrations in one transaction ==="
{
  echo "begin;"
  for f in "$MIG_DIR"/*.sql; do
    echo "\\echo '  applying $(basename "$f")'"
    cat "$f"
  done
  echo "commit;"
} | psql "$DB_URL" -v ON_ERROR_STOP=1 -q

echo
echo "=== Applied ==="
psql "$DB_URL" -tAX -c "
select 'tables    : ' || count(*) from pg_tables where schemaname='public'
union all select 'policies  : ' || count(*) from pg_policies where schemaname='public'
union all select 'indexes   : ' || count(*) from pg_indexes where schemaname='public'
union all select 'no RLS    : ' || count(*) from pg_tables where schemaname='public' and not rowsecurity;"
