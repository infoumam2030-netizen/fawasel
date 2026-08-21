-- ===========================================================================
-- 0001 — Foundation: extensions, enums, shared helpers
-- ===========================================================================

create extension if not exists "pgcrypto";      -- gen_random_uuid()
create extension if not exists "citext";        -- case-insensitive email

-- --- Enumerated states -----------------------------------------------------
-- Kept as real enums so an invalid value is rejected by the database rather
-- than by whatever code happens to be writing.

create type public.user_role as enum ('owner', 'editor', 'sales', 'designer');

create type public.content_status as enum ('draft', 'published', 'archived');

create type public.quote_status as enum (
  'new', 'contacted', 'qualified', 'proposal_sent', 'won', 'closed'
);

-- Preferred contact method is deliberately NOT an enum: the brief requires
-- new options to be addable without a migration. Allowed values live in
-- public.form_options and are validated by a foreign key.

-- --- updated_at ------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- --- Bilingual fallback ----------------------------------------------------
-- Arabic is the primary language and always populated; English is optional.
-- Requesting English falls back to Arabic when the translation is missing or
-- blank. IMMUTABLE so it can be used in indexes and generated columns.

create or replace function public.i18n(ar text, en text, locale text)
returns text
language sql
immutable
parallel safe
as $$
  select case
    when locale = 'en' then coalesce(nullif(btrim(en), ''), ar)
    else ar
  end;
$$;

comment on function public.i18n is
  'Bilingual accessor: returns the English value when locale = ''en'' and a '
  'non-blank translation exists, otherwise falls back to Arabic.';
