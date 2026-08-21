-- ===========================================================================
-- 0007 — Clients, packages, package features and services
-- ===========================================================================

create table public.clients (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  name_en        text,
  logo_url       text,
  website_url    text,
  industry       text,
  industry_en    text,
  description    text,
  description_en text,
  order_index    integer not null default 0,
  is_featured    boolean not null default false,
  is_visible     boolean not null default true,
  is_demo        boolean not null default false,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  constraint clients_website_scheme check (website_url is null or website_url ~* '^https?://')
);

create index clients_visible_order_idx on public.clients (order_index) where is_visible;

create trigger clients_set_updated_at
  before update on public.clients
  for each row execute function public.set_updated_at();

-- --- packages --------------------------------------------------------------
-- price is nullable and paired with show_price: the dashboard decides whether
-- a figure is public, and a hidden price must never render as an empty field.

create table public.packages (
  id                uuid primary key default gen_random_uuid(),
  name              text not null,
  name_en           text,
  description       text,
  description_en    text,
  price             numeric(12, 2),
  currency          text not null default 'SAR',
  billing_period    text,
  billing_period_en text,
  cta_text          text,
  cta_text_en       text,
  badge             text,
  badge_en          text,
  featured          boolean not null default false,
  show_price        boolean not null default true,
  order_index       integer not null default 0,
  status            public.content_status not null default 'draft',
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  published_at      timestamptz,
  constraint packages_price_non_negative check (price is null or price >= 0),
  constraint packages_price_present_when_shown check (not show_price or price is not null),
  constraint packages_currency_format check (currency ~ '^[A-Z]{3}$')
);

create index packages_status_order_idx on public.packages (status, order_index);

create trigger packages_set_updated_at
  before update on public.packages
  for each row execute function public.set_updated_at();

create trigger packages_track_published_at
  before insert or update on public.packages
  for each row execute function public.track_published_at();

-- --- package_features ------------------------------------------------------

create table public.package_features (
  id              uuid primary key default gen_random_uuid(),
  package_id      uuid not null references public.packages(id) on delete cascade,
  feature_text    text not null,
  feature_text_en text,
  order_index     integer not null default 0,
  is_active       boolean not null default true,
  created_at      timestamptz not null default now()
);

create index package_features_package_idx on public.package_features (package_id, order_index);

-- --- package_services (many-to-many) ---------------------------------------

create table public.package_services (
  package_id uuid not null references public.packages(id) on delete cascade,
  service_id uuid not null references public.services(id) on delete cascade,
  primary key (package_id, service_id)
);

-- --- RLS -------------------------------------------------------------------

alter table public.clients          enable row level security;
alter table public.packages         enable row level security;
alter table public.package_features enable row level security;
alter table public.package_services enable row level security;

create policy "clients: public read visible"
  on public.clients for select to anon, authenticated using (is_visible);
create policy "clients: admins read all"
  on public.clients for select to authenticated using (public.has_role('owner', 'editor'));
create policy "clients: admins write"
  on public.clients for all to authenticated
  using (public.has_role('owner', 'editor')) with check (public.has_role('owner', 'editor'));

create policy "packages: public read published"
  on public.packages for select to anon, authenticated using (status = 'published');
create policy "packages: admins read all"
  on public.packages for select to authenticated using (public.has_role('owner', 'editor'));
create policy "packages: admins write"
  on public.packages for all to authenticated
  using (public.has_role('owner', 'editor')) with check (public.has_role('owner', 'editor'));

do $$
declare t text;
declare own_visibility text;
begin
  foreach t in array array['package_features', 'package_services']
  loop
    own_visibility := case when t = 'package_features' then 'is_active and ' else '' end;

    execute format($f$
      create policy "%1$s: public read via published parent" on public.%1$I
        for select to anon, authenticated
        using (%2$s exists (
          select 1 from public.packages pk
          where pk.id = %1$I.package_id and pk.status = 'published'
        ));

      create policy "%1$s: admins read all" on public.%1$I
        for select to authenticated using (public.has_role('owner', 'editor'));

      create policy "%1$s: admins write" on public.%1$I
        for all to authenticated
        using (public.has_role('owner', 'editor'))
        with check (public.has_role('owner', 'editor'));
    $f$, t, own_visibility);

    execute format('grant select on public.%I to anon', t);
    execute format('grant select, insert, update, delete on public.%I to authenticated', t);
  end loop;
end $$;

grant select on public.clients, public.packages to anon;
grant select, insert, update, delete on public.clients, public.packages to authenticated;
