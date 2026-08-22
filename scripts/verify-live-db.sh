#!/usr/bin/env bash
#
# Runs the full RLS suite against a LIVE database without leaving anything
# behind.
#
#   npm run db:verify -- "$SUPABASE_DB_URL"
#
# Why this exists rather than reusing db:test:
#
#   db:test creates a throwaway database, applies the migrations to it, and
#   drops it afterwards. That is right for local work and wrong for a managed
#   Supabase project: the connecting role generally cannot CREATE DATABASE,
#   and adapting the suite to run directly would write fixture rows into real
#   tables — which is precisely the "no seeded data" rule.
#
#   So the entire suite — helper schema, fixtures, assertions and all — runs
#   inside ONE transaction that is ALWAYS rolled back. The behaviour is
#   verified against the real policies on the real database, and not one row,
#   function or schema survives. The results are captured before the rollback
#   so they can still be reported.
set -euo pipefail

DB_URL="${1:-${SUPABASE_DB_URL:-}}"
[[ -n "$DB_URL" ]] || { echo "usage: $0 <postgres-url>" >&2; exit 1; }

echo "=== Behavioural RLS suite (in a rolled-back transaction) ==="

RESULTS=$(psql "$DB_URL" -v ON_ERROR_STOP=1 -tAF'|' <<'SQL'
begin;
\i supabase/tests/01_rls_harness.sql
\i supabase/tests/02_rls_fixtures.sql
\i supabase/tests/03_rls_assertions.sql
\echo '---RESULTS---'
select seq, case when passed then 'PASS' else 'FAIL' end, name, expected, actual
from tests.results order by seq;
rollback;
SQL
)

echo "$RESULTS" | sed -n '/---RESULTS---/,$p' | tail -n +2 \
  | awk -F'|' '{printf "  %-6s %-2s %s\n", $2, "", $3; if ($2=="FAIL") printf "         expected=%s actual=%s\n", $4, $5}'

TOTAL=$(echo "$RESULTS" | sed -n '/---RESULTS---/,$p' | tail -n +2 | grep -c '|' || true)
FAILED=$(echo "$RESULTS" | sed -n '/---RESULTS---/,$p' | tail -n +2 | awk -F'|' '$2=="FAIL"' | wc -l | tr -d ' ')

echo
echo "=== Residue check — the suite must have left nothing behind ==="
psql "$DB_URL" -tAX -c "
select '  tests schema present : ' || count(*) from pg_namespace where nspname = 'tests'
union all select '  rows in public tables: ' || coalesce(sum(n), 0) from (
  select (xpath('/row/c/text()', query_to_xml(format('select count(*) c from public.%I', c.relname), false, true, '')))[1]::text::int n
  from pg_class c join pg_namespace ns on ns.oid = c.relnamespace
  where ns.nspname = 'public' and c.relkind = 'r') x
union all select '  auth users          : ' || count(*) from auth.users;"

echo
echo "=== Structural invariant sweep (read-only) ==="
psql "$DB_URL" -tAX -c "
select '  tables without RLS                              : ' || count(*) from pg_tables where schemaname='public' and not rowsecurity
union all select '  anon grants beyond SELECT/INSERT                : ' || count(*) from information_schema.role_table_grants
  where table_schema='public' and grantee='anon' and privilege_type not in ('SELECT','INSERT')
union all select '  DELETE policies on quote_requests               : ' || count(*) from pg_policies
  where schemaname='public' and tablename='quote_requests' and cmd='DELETE'
union all select '  UPDATE/DELETE policies on activity_logs         : ' || count(*) from pg_policies
  where schemaname='public' and tablename='activity_logs' and cmd in ('UPDATE','DELETE')
union all select '  SECURITY DEFINER fns without pinned search_path : ' || count(*) from pg_proc p
  join pg_namespace n on n.oid=p.pronamespace where n.nspname='public' and p.prosecdef
  and not exists (select 1 from unnest(coalesce(p.proconfig,'{}')) c where c like 'search_path=%')
union all select '  anon SELECT policies lacking a grant            : ' || count(*) from (
  select p.tablename from pg_policies p where p.schemaname='public' and 'anon'=any(p.roles) and p.cmd='SELECT'
  except select table_name from information_schema.role_table_grants
    where table_schema='public' and grantee='anon' and privilege_type='SELECT') y;"

echo
echo "=== Object counts ==="
psql "$DB_URL" -tAX -c "
select '  tables    : ' || count(*) from pg_tables where schemaname='public'
union all select '  policies  : ' || count(*) from pg_policies where schemaname='public'
union all select '  indexes   : ' || count(*) from pg_indexes where schemaname='public'
union all select '  buckets   : ' || count(*) from storage.buckets;"

echo
if [[ "$FAILED" -gt 0 ]]; then echo "${FAILED} of ${TOTAL} behavioural checks FAILED"; exit 1; fi
echo "all ${TOTAL} behavioural checks passed — nothing persisted"
