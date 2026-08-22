#!/usr/bin/env bash
#
# Applies the seed content to a migrated database.
#
#   npm run db:seed -- "$SUPABASE_DB_URL"
#
# 0001 is real PANTHER content from the approved brief.
# 0002 is placeholder content, every row flagged is_demo = true.
#
# Both files are idempotent, so re-running changes nothing. Neither contains
# invented metrics: project_results is deliberately empty.
#
# {{MEDIA_BASE}} is replaced with the project's public storage URL, derived
# from NEXT_PUBLIC_SUPABASE_URL — no URL is ever hardcoded into the SQL.
set -euo pipefail

DB_URL="${1:-${SUPABASE_DB_URL:-}}"
[[ -n "$DB_URL" ]] || { echo "usage: $0 <postgres-url> [--demo-only|--real-only]" >&2; exit 1; }
MODE="${2:-all}"

MEDIA_BASE="${MEDIA_BASE:-}"
if [[ -z "$MEDIA_BASE" ]]; then
  [[ -n "${NEXT_PUBLIC_SUPABASE_URL:-}" ]] \
    || { echo "Set NEXT_PUBLIC_SUPABASE_URL (or MEDIA_BASE) so image URLs can be built." >&2; exit 1; }
  MEDIA_BASE="${NEXT_PUBLIC_SUPABASE_URL%/}/storage/v1/object/public/media"
fi
echo "media base: ${MEDIA_BASE}"

# Refuse to seed a database that has not been migrated.
TABLES=$(psql "$DB_URL" -tAX -c "select count(*) from pg_tables where schemaname='public';")
[[ "$TABLES" -ge 28 ]] || { echo "ABORTED — expected 28 migrated tables, found ${TABLES}. Run db:apply first." >&2; exit 1; }

FILES=()
[[ "$MODE" != "--demo-only" ]] && FILES+=("supabase/seed/0001_settings_and_content.sql")
[[ "$MODE" != "--real-only" ]] && FILES+=("supabase/seed/0002_demo_portfolio.sql")

# One transaction: a partial seed is worse than none.
{
  echo "begin;"
  for f in "${FILES[@]}"; do
    echo "\\echo '  seeding $(basename "$f")'"
    sed "s#{{MEDIA_BASE}}#${MEDIA_BASE}#g" "$f"
  done
  echo "commit;"
} | psql "$DB_URL" -v ON_ERROR_STOP=1 -q

echo
psql "$DB_URL" -tAX -c "
select '  services      : ' || count(*) from public.services
union all select '  projects      : ' || count(*) || ' (' || count(*) filter (where is_demo) || ' demo)' from public.projects
union all select '  clients       : ' || count(*) || ' (' || count(*) filter (where is_demo) || ' demo)' from public.clients
union all select '  packages      : ' || count(*) from public.packages
union all select '  testimonials  : ' || count(*) || ' (' || count(*) filter (where is_demo) || ' demo)' from public.testimonials
union all select '  faq           : ' || count(*) from public.faq
union all select '  statistics    : ' || count(*) from public.statistics
union all select '  sections      : ' || count(*) from public.homepage_sections
union all select '  form options  : ' || count(*) from public.form_options
union all select '  project images: ' || count(*) from public.project_images
union all select '  results       : ' || count(*) || '  <- must be 0: no invented metrics' from public.project_results;"
