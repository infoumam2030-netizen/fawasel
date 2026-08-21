-- ===========================================================================
-- LOCAL VALIDATION SHIMS — never applied to Supabase
-- ===========================================================================
-- Supabase provides the auth and storage schemas, the anon/authenticated/
-- service_role roles, and auth.uid(). A plain Postgres instance does not, so
-- this file recreates just enough of them to execute the migrations and
-- exercise the RLS policies locally.
-- ===========================================================================

create schema if not exists auth;
create schema if not exists storage;

do $$ begin
  if not exists (select 1 from pg_roles where rolname = 'anon') then
    create role anon nologin noinherit;
  end if;
  if not exists (select 1 from pg_roles where rolname = 'authenticated') then
    create role authenticated nologin noinherit;
  end if;
  if not exists (select 1 from pg_roles where rolname = 'service_role') then
    create role service_role nologin noinherit bypassrls;
  end if;
end $$;

grant usage on schema public to anon, authenticated, service_role;

create table if not exists auth.users (
  id uuid primary key default gen_random_uuid(),
  email text,
  raw_user_meta_data jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- Mirrors Supabase: reads the subject claim from the request-scoped JWT.
create or replace function auth.uid()
returns uuid
language sql
stable
as $$
  select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid;
$$;

create or replace function auth.role()
returns text
language sql
stable
as $$
  select coalesce(nullif(current_setting('request.jwt.claim.role', true), ''), 'anon');
$$;

create table if not exists storage.buckets (
  id text primary key,
  name text not null,
  public boolean not null default false,
  file_size_limit bigint,
  allowed_mime_types text[],
  created_at timestamptz not null default now()
);

create table if not exists storage.objects (
  id uuid primary key default gen_random_uuid(),
  bucket_id text references storage.buckets(id),
  name text not null,
  owner uuid,
  metadata jsonb,
  created_at timestamptz not null default now()
);

alter table storage.objects enable row level security;
grant usage on schema storage to anon, authenticated;
grant select on storage.buckets to anon, authenticated;
grant select, insert, update, delete on storage.objects to authenticated;
grant select on storage.objects to anon;

-- storage.foldername(name) → text[]; used by the bucket policies.
create or replace function storage.foldername(name text)
returns text[]
language sql
immutable
as $$
  select string_to_array(regexp_replace(name, '/[^/]*$', ''), '/');
$$;
