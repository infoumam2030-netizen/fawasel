-- ===========================================================================
-- 0002 — Profiles, roles and the authorisation helpers every policy uses
-- ===========================================================================

create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text not null default '',
  email       citext not null,
  avatar_url  text,
  role        public.user_role not null default 'editor',
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  constraint profiles_email_unique unique (email)
);

create index profiles_role_idx on public.profiles (role) where is_active;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- --- Authorisation helpers -------------------------------------------------
--
-- SECURITY DEFINER is required, not a shortcut: a policy on `profiles` that
-- queried `profiles` directly would recurse. Running as the function owner
-- bypasses RLS for this one lookup and breaks the cycle. search_path is
-- pinned so the body cannot be hijacked by a caller-controlled path.

create or replace function public.auth_role()
returns public.user_role
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select p.role from public.profiles p where p.id = auth.uid() and p.is_active;
$$;

create or replace function public.has_role(variadic roles public.user_role[])
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select coalesce(public.auth_role() = any(roles), false);
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select public.auth_role() is not null;
$$;

comment on function public.has_role is
  'True when the caller is an active profile holding one of the given roles. '
  'Every write policy funnels through this.';

-- --- Provisioning ----------------------------------------------------------
-- A profile row is created for every new auth user. New accounts land on the
-- least-privileged content role; granting owner/sales is an explicit act.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- --- Privilege-escalation guard --------------------------------------------
-- Without this, "update your own profile" would let any editor make itself
-- owner. Only an owner may change role or is_active, and never on itself —
-- so the last owner cannot accidentally demote the account.

create or replace function public.guard_profile_privileges()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  -- Backend contexts have no end-user identity: the service-role key, the
  -- SQL editor and migrations must be able to bootstrap the first owner and
  -- administer roles. Reaching this trigger already requires an UPDATE grant
  -- on profiles, which anon does not have.
  if auth.uid() is null then
    return new;
  end if;

  if new.role is distinct from old.role or new.is_active is distinct from old.is_active then
    if not public.has_role('owner') then
      raise exception 'only an owner may change a role or activation state'
        using errcode = '42501';
    end if;
    if new.id = auth.uid() then
      raise exception 'an owner cannot change their own role or activation state'
        using errcode = '42501';
    end if;
  end if;
  return new;
end;
$$;

create trigger profiles_guard_privileges
  before update on public.profiles
  for each row execute function public.guard_profile_privileges();

-- --- RLS -------------------------------------------------------------------

alter table public.profiles enable row level security;

create policy "profiles: read own"
  on public.profiles for select to authenticated
  using (id = auth.uid());

create policy "profiles: owner reads all"
  on public.profiles for select to authenticated
  using (public.has_role('owner'));

create policy "profiles: update own"
  on public.profiles for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

create policy "profiles: owner manages"
  on public.profiles for all to authenticated
  using (public.has_role('owner'))
  with check (public.has_role('owner'));

-- Deliberately no policy for anon: profiles are never publicly readable.

grant select, update on public.profiles to authenticated;
grant insert, delete on public.profiles to authenticated;
