-- ===========================================================================
-- 0004 — Editable homepage content: sections, statistics, FAQ, production
-- ===========================================================================

-- --- homepage_sections -----------------------------------------------------
-- Keyed, not free-form: the codebase owns which sections exist and how they
-- are laid out; the CMS owns their copy, order and visibility. `content` is
-- JSONB for the small structured extras a section needs (the philosophy's
-- three stages, the four Why PANTHER principles) without adding a column per
-- text element.

create table public.homepage_sections (
  id             uuid primary key default gen_random_uuid(),
  section_key    text not null,
  title          text,
  title_en       text,
  subtitle       text,
  subtitle_en    text,
  description    text,
  description_en text,
  content        jsonb not null default '{}'::jsonb,
  image_url      text,
  is_visible     boolean not null default true,
  order_index    integer not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  updated_by     uuid references public.profiles(id) on delete set null,
  constraint homepage_sections_key_unique unique (section_key),
  constraint homepage_sections_key_known check (
    section_key in (
      'hero', 'trusted_brands', 'statistics', 'philosophy', 'why_panther',
      'services', 'how_we_work', 'selected_work', 'production', 'results',
      'packages', 'testimonials', 'faq', 'final_cta'
    )
  )
);

create index homepage_sections_order_idx
  on public.homepage_sections (order_index) where is_visible;

create trigger homepage_sections_set_updated_at
  before update on public.homepage_sections
  for each row execute function public.set_updated_at();

-- --- statistics ------------------------------------------------------------
-- value is stored numerically with prefix/suffix kept separate, so "450+"
-- can be counted up from zero without parsing the "+" back off a string.

create table public.statistics (
  id             uuid primary key default gen_random_uuid(),
  label          text not null,
  label_en       text,
  value          numeric not null,
  prefix         text,
  suffix         text,
  description    text,
  description_en text,
  icon           text,
  order_index    integer not null default 0,
  is_visible     boolean not null default true,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index statistics_order_idx on public.statistics (order_index) where is_visible;

create trigger statistics_set_updated_at
  before update on public.statistics
  for each row execute function public.set_updated_at();

-- --- faq -------------------------------------------------------------------

create table public.faq (
  id          uuid primary key default gen_random_uuid(),
  question    text not null,
  question_en text,
  answer      text not null,
  answer_en   text,
  order_index integer not null default 0,
  is_visible  boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index faq_order_idx on public.faq (order_index) where is_visible;

create trigger faq_set_updated_at
  before update on public.faq
  for each row execute function public.set_updated_at();

-- --- production_capabilities ----------------------------------------------

create table public.production_capabilities (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  name_en        text,
  description    text,
  description_en text,
  image_url      text,
  icon           text,
  order_index    integer not null default 0,
  is_visible     boolean not null default true,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index production_capabilities_order_idx
  on public.production_capabilities (order_index) where is_visible;

create trigger production_capabilities_set_updated_at
  before update on public.production_capabilities
  for each row execute function public.set_updated_at();

-- --- RLS -------------------------------------------------------------------

alter table public.homepage_sections       enable row level security;
alter table public.statistics              enable row level security;
alter table public.faq                     enable row level security;
alter table public.production_capabilities enable row level security;

do $$
declare t text;
begin
  foreach t in array array['homepage_sections', 'statistics', 'faq', 'production_capabilities']
  loop
    execute format($f$
      create policy "%1$s: public read visible" on public.%1$I
        for select to anon, authenticated using (is_visible);

      create policy "%1$s: admins read all" on public.%1$I
        for select to authenticated using (public.has_role('owner', 'editor'));

      create policy "%1$s: admins write" on public.%1$I
        for all to authenticated
        using (public.has_role('owner', 'editor'))
        with check (public.has_role('owner', 'editor'));
    $f$, t);

    execute format('grant select on public.%I to anon', t);
    execute format('grant select, insert, update, delete on public.%I to authenticated', t);
  end loop;
end $$;
