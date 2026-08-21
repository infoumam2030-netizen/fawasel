-- ===========================================================================
-- 0003 — Site settings, social links, configurable form options
-- ===========================================================================

-- --- site_settings ---------------------------------------------------------
-- One row, enforced by a constraint. The single source of truth for contact
-- details and SEO defaults; nothing may duplicate these values elsewhere.

create table public.site_settings (
  id                      uuid primary key default gen_random_uuid(),
  singleton               boolean not null default true,

  brand_name              text not null default 'PANTHER',
  brand_name_en           text,
  tagline                 text,
  tagline_en              text,

  phone                   text,
  whatsapp                text,
  email                   citext,
  address                 text,
  address_en              text,
  working_hours           text,
  working_hours_en        text,
  google_maps_url         text,

  logo_url                text,
  favicon_url             text,
  footer_text             text,
  footer_text_en          text,
  copyright_text          text,
  copyright_text_en       text,

  default_seo_title       text,
  default_seo_title_en    text,
  default_seo_description text,
  default_seo_description_en text,
  default_og_image_url    text,

  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now(),
  updated_by              uuid references public.profiles(id) on delete set null,

  -- Guarantees exactly one settings row can ever exist.
  constraint site_settings_singleton check (singleton),
  constraint site_settings_only_one unique (singleton)
);

create trigger site_settings_set_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();

-- --- social_links ----------------------------------------------------------
-- A table rather than columns on site_settings, so a channel can be added,
-- reordered or hidden without a migration.

create table public.social_links (
  id          uuid primary key default gen_random_uuid(),
  platform    text not null,
  url         text not null,
  label       text not null,
  label_en    text,
  icon        text,
  order_index integer not null default 0,
  is_visible  boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  constraint social_links_platform_unique unique (platform),
  constraint social_links_url_scheme check (url ~* '^https?://')
);

create index social_links_visible_order_idx
  on public.social_links (order_index) where is_visible;

create trigger social_links_set_updated_at
  before update on public.social_links
  for each row execute function public.set_updated_at();

-- --- form_options ----------------------------------------------------------
-- Budget ranges and preferred contact methods, editable from the dashboard.
-- The brief is explicit that these must not be hardcoded in a component.

create table public.form_options (
  id          uuid primary key default gen_random_uuid(),
  group_key   text not null,
  value       text not null,
  label       text not null,
  label_en    text,
  order_index integer not null default 0,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  constraint form_options_group_check check (group_key in ('budget', 'contact_method')),
  constraint form_options_unique unique (group_key, value)
);

create index form_options_group_order_idx
  on public.form_options (group_key, order_index) where is_active;

create trigger form_options_set_updated_at
  before update on public.form_options
  for each row execute function public.set_updated_at();

-- --- RLS -------------------------------------------------------------------

alter table public.site_settings enable row level security;
alter table public.social_links  enable row level security;
alter table public.form_options  enable row level security;

-- Settings and visible social links are public information: the footer, the
-- WhatsApp CTA and the quote form all need them without authentication.
create policy "site_settings: public read"
  on public.site_settings for select to anon, authenticated using (true);

create policy "site_settings: owner writes"
  on public.site_settings for all to authenticated
  using (public.has_role('owner')) with check (public.has_role('owner'));

create policy "social_links: public read visible"
  on public.social_links for select to anon, authenticated using (is_visible);

create policy "social_links: admins read all"
  on public.social_links for select to authenticated
  using (public.has_role('owner', 'editor'));

create policy "social_links: admins write"
  on public.social_links for all to authenticated
  using (public.has_role('owner', 'editor')) with check (public.has_role('owner', 'editor'));

create policy "form_options: public read active"
  on public.form_options for select to anon, authenticated using (is_active);

create policy "form_options: admins read all"
  on public.form_options for select to authenticated
  using (public.has_role('owner', 'editor'));

create policy "form_options: admins write"
  on public.form_options for all to authenticated
  using (public.has_role('owner', 'editor')) with check (public.has_role('owner', 'editor'));

grant select on public.site_settings, public.social_links, public.form_options to anon;
grant select, insert, update, delete
  on public.site_settings, public.social_links, public.form_options to authenticated;
