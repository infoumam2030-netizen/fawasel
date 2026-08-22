#!/usr/bin/env bash
#
# Verifies the secret-handling guarantees the project depends on:
#   - the four expected variables are the ones the code actually reads
#   - .env.example carries names only, never values
#   - every secret-bearing file is git-ignored and untracked
#   - SUPABASE_SERVICE_ROLE_KEY is server-only and cannot reach the browser
#
#   npm run verify:env
#
# Run after any change to environment handling, and before any deploy.
set -uo pipefail

FAIL=0
ok()   { echo "  ✓ $1"; }
bad()  { echo "  ✗ $1"; FAIL=1; }
note() { echo "    $1"; }

echo "=== 1. Expected environment variables ==="
EXPECTED=(NEXT_PUBLIC_SUPABASE_URL NEXT_PUBLIC_SUPABASE_ANON_KEY SUPABASE_SERVICE_ROLE_KEY SUPABASE_DB_URL)
for v in "${EXPECTED[@]}"; do
  in_example=$(grep -cE "^${v}=" .env.example || true)
  in_code=$(grep -rE "process\.env\.${v}\b" src/ scripts/ 2>/dev/null | wc -l | tr -d ' ')
  in_scripts=$(grep -rE "\\\$\{?${v}\b" scripts/ 2>/dev/null | wc -l | tr -d ' ')
  used=$(( in_code + in_scripts ))
  if [[ "$in_example" -ge 1 && "$used" -ge 1 ]]; then
    ok "${v} — declared in .env.example, read in ${used} place(s)"
  elif [[ "$in_example" -lt 1 ]]; then
    bad "${v} — missing from .env.example"
  else
    bad "${v} — declared but never read"
  fi
done

echo
echo "=== 2. .env.example contains names only ==="
if grep -nE "^[A-Z_]+=.+" .env.example | grep -vE "^[0-9]+:NEXT_PUBLIC_SITE_URL=http://localhost:3000$" ; then
  bad ".env.example assigns a value to a variable above"
else
  ok "no variable carries a value (localhost site URL excepted — not a secret)"
fi
if grep -qiE "(eyJ[A-Za-z0-9_-]{20,}|sb_secret|service_role.*=.+[A-Za-z0-9]{20})" .env.example; then
  bad ".env.example appears to contain a key-shaped string"
else
  ok "no key-shaped strings present"
fi

echo
echo "=== 3. Secrets are git-ignored and untracked ==="
for f in .env .env.local .env.production .env.development.local .env.test.local; do
  if git check-ignore -q "$f"; then ok "$f is ignored"; else bad "$f is NOT ignored"; fi
done
TRACKED=$(git ls-files | grep -E '^\.env($|\.)' | grep -v '^\.env\.example$' || true)
if [[ -z "$TRACKED" ]]; then ok "no .env file is tracked (other than .env.example)"; else bad "tracked: $TRACKED"; fi
LEAKS=$(git ls-files | xargs grep -lE "(eyJ[A-Za-z0-9_-]{30,}\.[A-Za-z0-9_-]{20,}|postgres(ql)?://[^ ]*:[^ @]+@)" 2>/dev/null || true)
if [[ -z "$LEAKS" ]]; then ok "no JWT or credentialed connection string in any tracked file"; else bad "possible secret in: $LEAKS"; fi

echo
echo "=== 4. Service-role key is server-only ==="
if [[ $(grep -c '^import "server-only";' src/lib/supabase/admin.ts) -ge 1 ]]; then
  ok "admin.ts imports 'server-only' — a Client Component importing it fails the build"
else
  bad "admin.ts is missing the 'server-only' guard"
fi

if grep -rq "NEXT_PUBLIC_SUPABASE_SERVICE\|NEXT_PUBLIC_SERVICE_ROLE" src/ 2>/dev/null; then
  bad "the service-role key is exposed under a NEXT_PUBLIC_ prefix"
else
  ok "no NEXT_PUBLIC_ prefix on the service-role key"
fi

READERS=$(grep -rlE "process\.env\.SUPABASE_SERVICE_ROLE_KEY" src/ 2>/dev/null || true)
if [[ "$READERS" == "src/lib/supabase/admin.ts" ]]; then
  ok "read in exactly one module: src/lib/supabase/admin.ts"
else
  bad "read in unexpected places: ${READERS:-none}"
fi

CLIENT_IMPORTERS=$(grep -rl "supabase/admin" src/ 2>/dev/null | while read -r f; do
  head -1 "$f" | grep -q '"use client"' && echo "$f"; done)
if [[ -z "$CLIENT_IMPORTERS" ]]; then
  ok "no Client Component imports the admin client"
else
  bad "Client Component(s) import admin: $CLIENT_IMPORTERS"
fi

echo
echo "=== 5. Built client bundle carries no service-role reference ==="
if [[ -d .next/static ]]; then
  HITS=$(grep -rl "SUPABASE_SERVICE_ROLE_KEY\|service_role" .next/static 2>/dev/null | wc -l | tr -d ' ')
  if [[ "$HITS" == "0" ]]; then ok "0 client chunks reference the service role"; else bad "$HITS client chunk(s) reference it"; fi
  if [[ -n "${SUPABASE_SERVICE_ROLE_KEY:-}" ]]; then
    if grep -rqF "$SUPABASE_SERVICE_ROLE_KEY" .next/static 2>/dev/null; then
      bad "THE LIVE KEY VALUE APPEARS IN THE CLIENT BUNDLE"
    else
      ok "the live key value does not appear in any client chunk"
    fi
  else
    note "live key not set — value-level scan skipped"
  fi
else
  note ".next/static absent — run 'npm run build' first for this check"
fi

echo
if [[ "$FAIL" == "0" ]]; then echo "All environment-safety checks passed."; else echo "SOME CHECKS FAILED." >&2; fi
exit "$FAIL"
