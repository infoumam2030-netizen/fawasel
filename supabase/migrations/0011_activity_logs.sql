-- ===========================================================================
-- 0011 — Activity log (append-only)
-- ===========================================================================

create table public.activity_logs (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references public.profiles(id) on delete set null,
  action      text not null,
  entity_type text,
  entity_id   uuid,
  metadata    jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now(),
  constraint activity_logs_action_format check (action ~ '^[a-z_]+\.[a-z_]+$')
);

comment on table public.activity_logs is
  'Append-only audit trail. There is no UPDATE or DELETE policy for any role, '
  'including owner, so history cannot be rewritten from the application.';

create index activity_logs_created_idx on public.activity_logs (created_at desc);
create index activity_logs_user_idx on public.activity_logs (user_id, created_at desc);
create index activity_logs_entity_idx on public.activity_logs (entity_type, entity_id);

alter table public.activity_logs enable row level security;

-- Only an owner may read the full trail.
create policy "activity_logs: owner reads"
  on public.activity_logs for select to authenticated
  using (public.has_role('owner'));

-- Any admin may append, but only under their own identity.
create policy "activity_logs: admins append"
  on public.activity_logs for insert to authenticated
  with check (public.is_admin() and user_id = auth.uid());

-- Deliberately no UPDATE and no DELETE policy, and no grant for them either.

grant select, insert on public.activity_logs to authenticated;
