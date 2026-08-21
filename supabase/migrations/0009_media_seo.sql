-- ===========================================================================
-- 0009 — Media library and per-entity SEO metadata
-- ===========================================================================

-- --- media -----------------------------------------------------------------
-- Metadata only. Bytes live in Supabase Storage; nothing is ever base64'd
-- into a column.
--
-- Note the deliberate asymmetry: media rows are readable by admins ONLY. The
-- public site never queries this table — it renders the public_url already
-- copied onto the content row — so the library (including filenames, folders
-- and who uploaded what) stays private while the images stay public.

create table public.media (
  id           uuid primary key default gen_random_uuid(),
  file_name    text not null,
  storage_path text not null,
  public_url   text not null,
  mime_type    text not null,
  file_size    bigint not null,
  width        integer,
  height       integer,
  alt_text     text,
  alt_text_en  text,
  folder       text not null default 'website',
  uploaded_by  uuid references public.profiles(id) on delete set null,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  constraint media_storage_path_unique unique (storage_path),
  constraint media_file_size_positive check (file_size > 0),
  constraint media_folder_known check (
    folder in ('brand', 'services', 'projects', 'clients', 'testimonials',
               'production', 'website', 'team', 'seo')
  ),
  -- Defence in depth alongside the storage-bucket MIME allow-list.
  constraint media_mime_allowed check (
    mime_type in ('image/webp', 'image/avif', 'image/png', 'image/jpeg', 'image/svg+xml')
  )
);

create index media_folder_created_idx on public.media (folder, created_at desc);
create index media_uploaded_by_idx on public.media (uploaded_by);

create trigger media_set_updated_at
  before update on public.media
  for each row execute function public.set_updated_at();

-- project_images.media_id could not be declared before media existed.
alter table public.project_images
  add constraint project_images_media_fk
  foreign key (media_id) references public.media(id) on delete set null;

-- --- seo_metadata ----------------------------------------------------------
-- Generic per-entity overrides. entity_id is intentionally not a foreign key:
-- it addresses several different tables, and static pages ('home', 'about')
-- have no row at all.

create table public.seo_metadata (
  id                 uuid primary key default gen_random_uuid(),
  entity_type        text not null,
  entity_id          uuid,
  entity_key         text,
  seo_title          text,
  seo_title_en       text,
  seo_description    text,
  seo_description_en text,
  og_title           text,
  og_title_en        text,
  og_description     text,
  og_description_en  text,
  og_image_url       text,
  canonical_url      text,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  constraint seo_metadata_entity_type_known check (
    entity_type in ('page', 'project', 'service', 'package')
  ),
  -- Exactly one addressing mode: a row id, or a static page key.
  constraint seo_metadata_target check (
    (entity_id is not null and entity_key is null)
    or (entity_id is null and entity_key is not null)
  )
);

create unique index seo_metadata_entity_idx
  on public.seo_metadata (entity_type, entity_id) where entity_id is not null;
create unique index seo_metadata_page_idx
  on public.seo_metadata (entity_type, entity_key) where entity_key is not null;

create trigger seo_metadata_set_updated_at
  before update on public.seo_metadata
  for each row execute function public.set_updated_at();

-- --- RLS -------------------------------------------------------------------

alter table public.media        enable row level security;
alter table public.seo_metadata enable row level security;

-- Designers get the media library; sales deliberately does not.
create policy "media: admins read"
  on public.media for select to authenticated
  using (public.has_role('owner', 'editor', 'designer'));

create policy "media: admins write"
  on public.media for all to authenticated
  using (public.has_role('owner', 'editor', 'designer'))
  with check (public.has_role('owner', 'editor', 'designer'));

-- No anon policy on media: the library is not public.

-- SEO metadata is by definition rendered into public pages.
create policy "seo_metadata: public read"
  on public.seo_metadata for select to anon, authenticated using (true);

create policy "seo_metadata: admins write"
  on public.seo_metadata for all to authenticated
  using (public.has_role('owner', 'editor'))
  with check (public.has_role('owner', 'editor'));

grant select on public.seo_metadata to anon;
grant select, insert, update, delete on public.media, public.seo_metadata to authenticated;
