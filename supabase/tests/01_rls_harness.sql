-- ===========================================================================
-- RLS test harness — local validation only, never applied to Supabase
-- ===========================================================================

create schema if not exists tests;

-- Runs a query as the given Postgres role with the given JWT subject, and
-- returns the row count — or -1 when the database refuses outright (no
-- grant). RLS with a grant but no matching policy returns 0 rows, so the two
-- outcomes are reported distinctly.
create or replace function tests.count_as(actor text, uid text, q text)
returns bigint
language plpgsql
as $$
declare n bigint;
begin
  perform set_config('request.jwt.claim.sub', coalesce(uid, ''), true);
  perform set_config('role', actor, true);
  execute q into n;
  perform set_config('role', 'postgres', true);
  return n;
exception when others then
  perform set_config('role', 'postgres', true);
  return -1;
end;
$$;

-- Attempts a write and reports 'ok' or the SQLSTATE that blocked it.
create or replace function tests.write_as(actor text, uid text, q text)
returns text
language plpgsql
as $$
begin
  perform set_config('request.jwt.claim.sub', coalesce(uid, ''), true);
  perform set_config('role', actor, true);
  execute q;
  perform set_config('role', 'postgres', true);
  return 'ok';
exception when others then
  perform set_config('role', 'postgres', true);
  return sqlstate;
end;
$$;

create table if not exists tests.results (
  seq        serial primary key,
  name       text not null,
  expected   text not null,
  actual     text not null,
  passed     boolean generated always as (expected = actual) stored
);

create or replace function tests.check(name text, expected text, actual text)
returns void
language sql
as $$
  insert into tests.results (name, expected, actual) values (name, expected, actual);
$$;

-- Reports how many rows a write actually affected, or the SQLSTATE that
-- blocked it. Necessary because RLS filters rows rather than raising: an
-- UPDATE a role is not entitled to make succeeds while changing nothing, so
-- asserting on the error code alone would mistake "silently blocked" for
-- "allowed".
create or replace function tests.affected_as(actor text, uid text, q text)
returns text
language plpgsql
as $$
declare n bigint;
begin
  perform set_config('request.jwt.claim.sub', coalesce(uid, ''), true);
  perform set_config('role', actor, true);
  execute q;
  get diagnostics n = row_count;
  perform set_config('role', 'postgres', true);
  return n::text;
exception when others then
  perform set_config('role', 'postgres', true);
  return sqlstate;
end;
$$;
