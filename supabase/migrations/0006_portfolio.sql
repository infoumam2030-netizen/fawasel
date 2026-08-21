-- ===========================================================================
-- 0006 — Portfolio: categories, projects, images, results, relations, slugs
-- ===========================================================================

create table public.portfolio_categories (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  name_en     text,
  slug        text not null,
  description    text,
  description_en text,
  order_index integer not null default 0,
  is_visible  boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  constraint portfolio_categories_slug_unique unique (slug),
  constraint portfolio_categories_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
);

create index portfolio_categories_order_idx
  on public.portfolio_categories (order_index) where is_visible;

create trigger portfolio_categories_set_updated_at
  before update on public.portfolio_categories
  for each row execute function public.set_updated_at();

-- --- projects --------------------------------------------------------------

create table public.projects (
  id                   uuid primary key default gen_random_uuid(),
  title                text not null,
  title_en             text,
  slug                 text not null,
  client_name          text,
  industry             text,
  industry_en          text,
  -- RESTRICT: a category still in use must be reassigned before deletion,
  -- rather than silently orphaning published work.
  category_id          uuid references public.portfolio_categories(id) on delete restrict,
  short_description    text not null,
  short_description_en text,
  full_description     text,
  full_description_en  text,
  challenge            text,
  challenge_en         text,
  strategy             text,
  strategy_en          text,
  execution            text,
  execution_en         text,
  cover_image_url      text,
  year                 integer,
  featured             boolean not null default false,
  order_index          integer not null default 0,
  status               public.content_status not null default 'draft',
  seo_title            text,
  seo_title_en         text,
  seo_description      text,
  seo_description_en   text,
  is_demo              boolean not null default false,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now(),
  published_at         timestamptz,
  created_by           uuid references public.profiles(id) on delete set null,
  updated_by           uuid references public.profiles(id) on delete set null,
  constraint projects_slug_unique unique (slug),
  constraint projects_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  constraint projects_year_range check (year is null or year between 1990 and 2100)
);

comment on column public.projects.is_demo is
  'Marks placeholder content built from the supplied assets while real case '
  'study copy is pending. Surfaced in the dashboard so demo rows are never '
  'mistaken for real client work.';

create index projects_status_order_idx on public.projects (status, order_index);
create index projects_category_idx on public.projects (category_id) where status = 'published';
create index projects_featured_idx on public.projects (order_index)
  where featured and status = 'published';

create trigger projects_set_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

create trigger projects_track_published_at
  before insert or update on public.projects
  for each row execute function public.track_published_at();

-- --- project_slug_history --------------------------------------------------
-- Renaming a project must not break a live URL. Every previous slug is kept
-- so the route handler can issue a 301 to the current one.

create table public.project_slug_history (
  id         uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  slug       text not null,
  created_at timestamptz not null default now(),
  constraint project_slug_history_slug_unique unique (slug)
);

create index project_slug_history_project_idx on public.project_slug_history (project_id);

create or replace function public.record_project_slug_history()
returns trigger
language plpgsql
as $$
begin
  if new.slug is distinct from old.slug then
    insert into public.project_slug_history (project_id, slug)
    values (old.id, old.slug)
    on conflict (slug) do nothing;
  end if;
  return new;
end;
$$;

create trigger projects_record_slug_history
  after update of slug on public.projects
  for each row execute function public.record_project_slug_history();

-- --- project_images --------------------------------------------------------

create table public.project_images (
  id           uuid primary key default gen_random_uuid(),
  project_id   uuid not null references public.projects(id) on delete cascade,
  media_id     uuid,
  image_url    text not null,
  alt_text     text,
  alt_text_en  text,
  caption      text,
  caption_en   text,
  order_index  integer not null default 0,
  is_featured  boolean not null default false,
  created_at   timestamptz not null default now()
);

create index project_images_project_idx on public.project_images (project_id, order_index);

-- --- project_services (many-to-many) ---------------------------------------

create table public.project_services (
  project_id uuid not null references public.projects(id) on delete cascade,
  service_id uuid not null references public.services(id) on delete cascade,
  primary key (project_id, service_id)
);

create index project_services_service_idx on public.project_services (service_id);

-- --- project_results -------------------------------------------------------
-- Only ever populated with real, administrator-entered figures. Nothing in
-- the codebase generates a metric.

create table public.project_results (
  id             uuid primary key default gen_random_uuid(),
  project_id     uuid not null references public.projects(id) on delete cascade,
  value          text not null,
  label          text not null,
  label_en       text,
  description    text,
  description_en text,
  prefix         text,
  suffix         text,
  order_index    integer not null default 0,
  is_visible     boolean not null default true,
  created_at     timestamptz not null default now()
);

create index project_results_project_idx on public.project_results (project_id, order_index);

-- --- project_related -------------------------------------------------------
-- Manual curation; when empty the UI falls back to category/service matching
-- and hides the section entirely if there is still nothing to show.

create table public.project_related (
  project_id         uuid not null references public.projects(id) on delete cascade,
  related_project_id uuid not null references public.projects(id) on delete cascade,
  order_index        integer not null default 0,
  primary key (project_id, related_project_id),
  constraint project_related_not_self check (project_id <> related_project_id)
);

-- --- RLS -------------------------------------------------------------------

alter table public.portfolio_categories  enable row level security;
alter table public.projects              enable row level security;
alter table public.project_slug_history  enable row level security;
alter table public.project_images        enable row level security;
alter table public.project_services      enable row level security;
alter table public.project_results       enable row level security;
alter table public.project_related       enable row level security;

create policy "portfolio_categories: public read visible"
  on public.portfolio_categories for select to anon, authenticated using (is_visible);
create policy "portfolio_categories: admins read all"
  on public.portfolio_categories for select to authenticated
  using (public.has_role('owner', 'editor'));
create policy "portfolio_categories: admins write"
  on public.portfolio_categories for all to authenticated
  using (public.has_role('owner', 'editor')) with check (public.has_role('owner', 'editor'));

create policy "projects: public read published"
  on public.projects for select to anon, authenticated using (status = 'published');
create policy "projects: admins read all"
  on public.projects for select to authenticated
  using (public.has_role('owner', 'editor'));
create policy "projects: admins write"
  on public.projects for all to authenticated
  using (public.has_role('owner', 'editor')) with check (public.has_role('owner', 'editor'));

-- Child tables inherit the parent's publication state, so an unpublished
-- case study cannot be reconstructed from its images or metrics.
do $$
declare t text;
declare own_visibility text;
begin
  foreach t in array array[
    'project_slug_history', 'project_images', 'project_services',
    'project_results', 'project_related'
  ]
  loop
    -- project_results carries its own is_visible flag; the others are
    -- governed solely by the parent project's publication state.
    own_visibility := case when t = 'project_results' then 'is_visible and ' else '' end;

    execute format($f$
      create policy "%1$s: public read via published parent" on public.%1$I
        for select to anon, authenticated
        using (%2$s exists (
          select 1 from public.projects p
          where p.id = %1$I.project_id and p.status = 'published'
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

grant select on public.portfolio_categories, public.projects to anon;
grant select, insert, update, delete
  on public.portfolio_categories, public.projects to authenticated;
