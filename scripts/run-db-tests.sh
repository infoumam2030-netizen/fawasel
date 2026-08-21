#!/usr/bin/env bash
# Applies the migrations to a throwaway Postgres database and runs the RLS
# suite against it. Nothing here touches a Supabase project.
#
#   ./scripts/run-db-tests.sh "postgresql://postgres@localhost:5433/postgres?host=/tmp"
set -euo pipefail

ADMIN_URL="${1:-${SUPABASE_DB_URL:-}}"
if [[ -z "$ADMIN_URL" ]]; then
  echo "usage: $0 <postgres-admin-url>" >&2
  exit 1
fi

DB_NAME="panther_test_$$"
TEST_URL="${ADMIN_URL/\/postgres\?//${DB_NAME}?}"

psql "$ADMIN_URL" -q -c "create database ${DB_NAME};"
trap 'psql "$ADMIN_URL" -q -c "drop database if exists ${DB_NAME};" >/dev/null 2>&1 || true' EXIT

# Local shims stand in for the auth/storage schemas Supabase provides.
psql "$TEST_URL" -v ON_ERROR_STOP=1 -q -f supabase/tests/00_local_shims.sql
for migration in supabase/migrations/*.sql; do
  psql "$TEST_URL" -v ON_ERROR_STOP=1 -q -f "$migration"
done
psql "$TEST_URL" -v ON_ERROR_STOP=1 -q -f supabase/tests/01_rls_harness.sql
psql "$TEST_URL" -v ON_ERROR_STOP=1 -q -f supabase/tests/02_rls_fixtures.sql
psql "$TEST_URL" -q -f supabase/tests/03_rls_assertions.sql >/dev/null

psql "$TEST_URL" -P pager=off -c \
  "select seq, case when passed then 'PASS' else 'FAIL' end as result, name, expected, actual
     from tests.results order by seq;"

FAILED=$(psql "$TEST_URL" -tAc "select count(*) from tests.results where not passed;")
TOTAL=$(psql "$TEST_URL" -tAc "select count(*) from tests.results;")
echo
if [[ "$FAILED" -gt 0 ]]; then
  echo "${FAILED} of ${TOTAL} checks FAILED"
  exit 1
fi
echo "all ${TOTAL} checks passed"
