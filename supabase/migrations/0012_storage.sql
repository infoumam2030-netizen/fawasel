-- ===========================================================================
-- 0012 — Storage bucket and object policies
-- ===========================================================================
--
-- A single public `media` bucket, organised by the folder prefixes the brief
-- specifies (brand/ services/ projects/ clients/ testimonials/ production/
-- website/ team/ seo/). Public read is intentional — these are the images the
-- marketing site serves. Write access is restricted to the roles that manage
-- content.
--
-- The bucket is not a substitute for validation: the MIME allow-list is
-- enforced here AND as a check constraint on public.media.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media',
  'media',
  true,
  10485760,  -- 10 MB
  array['image/webp', 'image/avif', 'image/png', 'image/jpeg', 'image/svg+xml']
)
on conflict (id) do update
  set public             = excluded.public,
      file_size_limit    = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

create policy "media bucket: public read"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'media');

create policy "media bucket: content roles upload"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'media'
    and public.has_role('owner', 'editor', 'designer')
    and (storage.foldername(name))[1] in (
      'brand', 'services', 'projects', 'clients', 'testimonials',
      'production', 'website', 'team', 'seo'
    )
  );

create policy "media bucket: content roles update"
  on storage.objects for update to authenticated
  using (bucket_id = 'media' and public.has_role('owner', 'editor', 'designer'))
  with check (bucket_id = 'media' and public.has_role('owner', 'editor', 'designer'));

create policy "media bucket: content roles delete"
  on storage.objects for delete to authenticated
  using (bucket_id = 'media' and public.has_role('owner', 'editor', 'designer'));
