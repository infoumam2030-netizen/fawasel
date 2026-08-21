-- ===========================================================================
-- 0005 — Services and sub-services
-- ===========================================================================

create table public.services (
  id                    uuid primary key default gen_random_uuid(),
  title                 text not null,
  title_en              text,
  slug                  text not null,
  short_description     text not null,
  short_description_en  text,
  description           text,
  description_en        text,
  image_url             text,
  icon                  text,
  order_index           integer not null default 0,
  status                public.content_status not null default 'draft',
  is_featured           boolean not null default false,
  seo_title             text,
  seo_title_en          text,
  seo_description       text,
  seo_description_en    text,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  published_at          timestamptz,
  created_by            uuid references public.profiles(id) on delete set null,
  updated_by            uuid references public.profiles(id) on delete set null,
  constraint services_slug_unique unique (slug),
  constraint services_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
);

create index services_status_order_idx on public.services (status, order_index);
create index services_featured_idx on public.services (order_index)
  where is_featured and status = 'published';

create trigger services_set_updated_at
  before update on public.services
  for each row execute function public.set_updated_at();

-- Stamps published_at the first time a row reaches 'published', and clears
-- it when unpublished, so the CMS never has to remember to set it.
create or replace function public.track_published_at()
returns trigger
language plpgsql
as $$
begin
  if new.status = 'published' and (old.status is distinct from 'published') then
    new.published_at = coalesce(new.published_at, now());
  elsif new.status <> 'published' then
    new.published_at = null;
  end if;
  return new;
end;
$$;

create trigger services_track_published_at
  before insert or update on public.services
  for each row execute function public.track_published_at();

-- --- service_subservices ---------------------------------------------------

create table public.service_subservices (
  id             uuid primary key default gen_random_uuid(),
  service_id     uuid not null references public.services(id) on delete cascade,
  name           text not null,
  name_en        text,
  description    text,
  description_en text,
  order_index    integer not null default 0,
  is_active      boolean not null default true,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index service_subservices_service_idx
  on public.service_subservices (service_id, order_index);

create trigger service_subservices_set_updated_at
  before update on public.service_subservices
  for each row execute function public.set_updated_at();

-- --- RLS -------------------------------------------------------------------

alter table public.services            enable row level security;
alter table public.service_subservices enable row level security;

create policy "services: public read published"
  on public.services for select to anon, authenticated
  using (status = 'published');

create policy "services: admins read all"
  on public.services for select to authenticated
  using (public.has_role('owner', 'editor'));

create policy "services: admins write"
  on public.services for all to authenticated
  using (public.has_role('owner', 'editor'))
  with check (public.has_role('owner', 'editor'));

-- A sub-service inherits its parent's visibility: a draft service must not
-- leak its contents through the child table.
create policy "service_subservices: public read via published parent"
  on public.service_subservices for select to anon, authenticated
  using (
    is_active
    and exists (
      select 1 from public.services s
      where s.id = service_id and s.status = 'published'
    )
  );

create policy "service_subservices: admins read all"
  on public.service_subservices for select to authenticated
  using (public.has_role('owner', 'editor'));

create policy "service_subservices: admins write"
  on public.service_subservices for all to authenticated
  using (public.has_role('owner', 'editor'))
  with check (public.has_role('owner', 'editor'));

grant select on public.services, public.service_subservices to anon;
grant select, insert, update, delete
  on public.services, public.service_subservices to authenticated;
