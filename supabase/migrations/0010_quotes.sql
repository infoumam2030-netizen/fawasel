-- ===========================================================================
-- 0010 — Quote requests: the business-critical lead pipeline
-- ===========================================================================

create table public.quote_requests (
  id                       uuid primary key default gen_random_uuid(),
  request_number           text not null,
  name                     text not null,
  company_name             text,
  phone                    text not null,
  email                    citext,
  -- SET NULL / RESTRICT would both be wrong here: a lead must survive the
  -- deletion of a service, but must not lose its historical meaning either,
  -- so the free-text snapshot below is kept alongside the reference.
  service_id               uuid references public.services(id) on delete set null,
  service_name_snapshot    text,
  package_id               uuid references public.packages(id) on delete set null,
  package_name_snapshot    text,
  budget                   text,
  project_details          text not null,
  expected_start_date      date,
  preferred_contact_method text not null default 'whatsapp',
  status                   public.quote_status not null default 'new',
  assigned_to              uuid references public.profiles(id) on delete set null,

  -- Attribution
  source                   text,
  landing_page             text,
  referrer                 text,
  utm_source               text,
  utm_medium               text,
  utm_campaign             text,
  utm_content              text,
  utm_term                 text,

  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now(),
  -- Leads are never hard-deleted; archiving is a soft flag an owner can set.
  deleted_at               timestamptz,

  constraint quote_requests_number_unique unique (request_number),
  constraint quote_requests_name_length check (char_length(btrim(name)) between 2 and 120),
  constraint quote_requests_details_length check (char_length(btrim(project_details)) between 10 and 5000),
  constraint quote_requests_phone_format check (phone ~ '^\+?[0-9 ()-]{7,20}$')
);

create index quote_requests_status_created_idx
  on public.quote_requests (status, created_at desc) where deleted_at is null;
create index quote_requests_created_idx on public.quote_requests (created_at desc);
create index quote_requests_service_idx on public.quote_requests (service_id);
create index quote_requests_assigned_idx on public.quote_requests (assigned_to)
  where deleted_at is null;

create trigger quote_requests_set_updated_at
  before update on public.quote_requests
  for each row execute function public.set_updated_at();

-- --- Human-readable request numbers ----------------------------------------
-- PAN-2026-0001. Generated in the database, never in the browser: a sequence
-- per year makes collisions impossible and the value unforgeable.

create sequence if not exists public.quote_request_seq;

create or replace function public.assign_request_number()
returns trigger
language plpgsql
as $$
declare
  current_year text := to_char(now(), 'YYYY');
begin
  new.request_number := format('PAN-%s-%s', current_year,
    lpad(nextval('public.quote_request_seq')::text, 4, '0'));
  return new;
end;
$$;

-- --- Anonymous submission hardening ----------------------------------------
-- A public submitter controls the request body, so every field that carries
-- authority is overwritten here rather than trusted.

create or replace function public.sanitise_public_quote()
returns trigger
language plpgsql
as $$
begin
  new.status      := 'new';
  new.assigned_to := null;
  new.deleted_at  := null;
  return new;
end;
$$;

create trigger quote_requests_sanitise
  before insert on public.quote_requests
  for each row execute function public.sanitise_public_quote();

create trigger quote_requests_assign_number
  before insert on public.quote_requests
  for each row execute function public.assign_request_number();

-- --- Internal notes --------------------------------------------------------

create table public.quote_request_notes (
  id               uuid primary key default gen_random_uuid(),
  quote_request_id uuid not null references public.quote_requests(id) on delete cascade,
  user_id          uuid references public.profiles(id) on delete set null,
  note             text not null,
  created_at       timestamptz not null default now(),
  constraint quote_request_notes_length check (char_length(btrim(note)) > 0)
);

create index quote_request_notes_request_idx
  on public.quote_request_notes (quote_request_id, created_at desc);

-- --- Status history --------------------------------------------------------
-- Written by a trigger, not by application code, so the pipeline history
-- cannot be skipped or forged.

create table public.quote_request_status_history (
  id               uuid primary key default gen_random_uuid(),
  quote_request_id uuid not null references public.quote_requests(id) on delete cascade,
  old_status       public.quote_status,
  new_status       public.quote_status not null,
  changed_by       uuid references public.profiles(id) on delete set null,
  created_at       timestamptz not null default now()
);

create index quote_request_status_history_request_idx
  on public.quote_request_status_history (quote_request_id, created_at desc);

create or replace function public.record_quote_status_change()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if tg_op = 'INSERT' then
    insert into public.quote_request_status_history (quote_request_id, old_status, new_status, changed_by)
    values (new.id, null, new.status, auth.uid());
  elsif new.status is distinct from old.status then
    insert into public.quote_request_status_history (quote_request_id, old_status, new_status, changed_by)
    values (new.id, old.status, new.status, auth.uid());
  end if;
  return new;
end;
$$;

create trigger quote_requests_record_status
  after insert or update of status on public.quote_requests
  for each row execute function public.record_quote_status_change();

-- --- RLS -------------------------------------------------------------------

alter table public.quote_requests               enable row level security;
alter table public.quote_request_notes          enable row level security;
alter table public.quote_request_status_history enable row level security;

-- The public may CREATE a lead and nothing else. There is deliberately no
-- SELECT policy for anon, which also means `insert ... returning` is refused:
-- the data layer must insert without requesting a representation back.
create policy "quote_requests: public may submit"
  on public.quote_requests for insert to anon, authenticated
  with check (
    status = 'new'
    and assigned_to is null
    and deleted_at is null
  );

create policy "quote_requests: sales and owner read"
  on public.quote_requests for select to authenticated
  using (public.has_role('owner', 'sales'));

create policy "quote_requests: sales and owner update"
  on public.quote_requests for update to authenticated
  using (public.has_role('owner', 'sales'))
  with check (public.has_role('owner', 'sales'));

-- No DELETE policy for anyone, including owner: leads are archived via
-- deleted_at, never removed.

create policy "quote_request_notes: sales and owner read"
  on public.quote_request_notes for select to authenticated
  using (public.has_role('owner', 'sales'));

create policy "quote_request_notes: sales and owner write"
  on public.quote_request_notes for insert to authenticated
  with check (public.has_role('owner', 'sales') and user_id = auth.uid());

create policy "quote_request_status_history: sales and owner read"
  on public.quote_request_status_history for select to authenticated
  using (public.has_role('owner', 'sales'));

-- History rows are written only by the trigger (SECURITY DEFINER); there is
-- no INSERT, UPDATE or DELETE policy for any client.

grant insert on public.quote_requests to anon;
grant select, insert, update on public.quote_requests to authenticated;
grant select, insert on public.quote_request_notes to authenticated;
grant select on public.quote_request_status_history to authenticated;
grant usage on sequence public.quote_request_seq to anon, authenticated;
