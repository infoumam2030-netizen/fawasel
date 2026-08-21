-- ===========================================================================
-- 0008 — Testimonials
-- ===========================================================================

create table public.testimonials (
  id                 uuid primary key default gen_random_uuid(),
  client_name        text not null,
  company_name       text,
  company_name_en    text,
  job_title          text,
  job_title_en       text,
  profile_image_url  text,
  company_logo_url   text,
  rating             smallint,
  testimonial_text    text not null,
  testimonial_text_en text,
  -- SET NULL: removing a project must not destroy the testimonial itself.
  project_id         uuid references public.projects(id) on delete set null,
  order_index        integer not null default 0,
  featured           boolean not null default false,
  status             public.content_status not null default 'draft',
  is_demo            boolean not null default false,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  published_at       timestamptz,
  constraint testimonials_rating_range check (rating is null or rating between 1 and 5)
);

comment on column public.testimonials.is_demo is
  'Marks example testimonials used while real, attributable client quotes are '
  'pending. No demo row may ever be presented as a real review.';

create index testimonials_status_order_idx on public.testimonials (status, order_index);
create index testimonials_project_idx on public.testimonials (project_id);

create trigger testimonials_set_updated_at
  before update on public.testimonials
  for each row execute function public.set_updated_at();

create trigger testimonials_track_published_at
  before insert or update on public.testimonials
  for each row execute function public.track_published_at();

alter table public.testimonials enable row level security;

create policy "testimonials: public read published"
  on public.testimonials for select to anon, authenticated using (status = 'published');
create policy "testimonials: admins read all"
  on public.testimonials for select to authenticated using (public.has_role('owner', 'editor'));
create policy "testimonials: admins write"
  on public.testimonials for all to authenticated
  using (public.has_role('owner', 'editor')) with check (public.has_role('owner', 'editor'));

grant select on public.testimonials to anon;
grant select, insert, update, delete on public.testimonials to authenticated;
