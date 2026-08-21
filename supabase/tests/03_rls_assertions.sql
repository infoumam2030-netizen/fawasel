-- ===========================================================================
-- RLS behaviour assertions — local validation only
-- ===========================================================================
\set ON_ERROR_STOP on
truncate tests.results restart identity;

\set OWNER    '''11111111-1111-1111-1111-111111111111'''
\set EDITOR   '''22222222-2222-2222-2222-222222222222'''
\set SALES    '''33333333-3333-3333-3333-333333333333'''
\set DESIGNER '''44444444-4444-4444-4444-444444444444'''

-- ---------------------------------------------------------------- ANONYMOUS
select tests.check('anon sees only published services', '1',
  tests.count_as('anon', null, 'select count(*) from public.services')::text);

select tests.check('anon sees only published projects', '1',
  tests.count_as('anon', null, 'select count(*) from public.projects')::text);

select tests.check('anon cannot see draft service sub-services', '1',
  tests.count_as('anon', null, 'select count(*) from public.service_subservices')::text);

select tests.check('anon cannot see draft project images', '1',
  tests.count_as('anon', null, 'select count(*) from public.project_images')::text);

select tests.check('anon sees only visible project results', '1',
  tests.count_as('anon', null, 'select count(*) from public.project_results')::text);

select tests.check('anon sees only visible clients', '1',
  tests.count_as('anon', null, 'select count(*) from public.clients')::text);

select tests.check('anon sees only published packages', '1',
  tests.count_as('anon', null, 'select count(*) from public.packages')::text);

select tests.check('anon cannot see draft package features', '1',
  tests.count_as('anon', null, 'select count(*) from public.package_features')::text);

select tests.check('anon sees only published testimonials', '1',
  tests.count_as('anon', null, 'select count(*) from public.testimonials')::text);

select tests.check('anon sees only visible FAQ', '1',
  tests.count_as('anon', null, 'select count(*) from public.faq')::text);

select tests.check('anon is refused the media library', '-1',
  tests.count_as('anon', null, 'select count(*) from public.media')::text);

select tests.check('anon is refused profiles', '-1',
  tests.count_as('anon', null, 'select count(*) from public.profiles')::text);

select tests.check('anon is refused activity logs', '-1',
  tests.count_as('anon', null, 'select count(*) from public.activity_logs')::text);

select tests.check('anon is refused reading quote requests', '-1',
  tests.count_as('anon', null, 'select count(*) from public.quote_requests')::text);

select tests.check('anon cannot modify services', '42501',
  tests.write_as('anon', null,
    $q$update public.services set title = 'hacked' where slug = 'digital-marketing'$q$));

select tests.check('anon cannot delete projects', '42501',
  tests.write_as('anon', null, $q$delete from public.projects$q$));

-- Public submission is the one write anonymous users may perform.
select tests.check('anon may submit a quote request', 'ok',
  tests.write_as('anon', null, $q$
    insert into public.quote_requests (name, phone, project_details, preferred_contact_method)
    values ('عميل جديد', '+966541882358', 'أرغب في حملة تسويقية متكاملة.', 'whatsapp')
  $q$));

-- Privilege fields in the submitted body must be ignored, not trusted.
select tests.check('anon cannot self-assign a won status', 'ok',
  tests.write_as('anon', null, $q$
    insert into public.quote_requests (name, phone, project_details, status)
    values ('محاولة', '+966500000000', 'محاولة رفع الحالة إلى مربوحة.', 'won')
  $q$));

select tests.check('submitted status is forced to new', '2',
  (select count(*)::text from public.quote_requests where status = 'new'));

select tests.check('request numbers are generated server-side', '2',
  (select count(*)::text from public.quote_requests
   where request_number ~ ('^PAN-' || to_char(now(), 'YYYY') || '-[0-9]{4}$')));

select tests.check('request numbers are unique', '2',
  (select count(distinct request_number)::text from public.quote_requests));

-- ------------------------------------------------------------------- EDITOR
select tests.check('editor sees draft services', '2',
  tests.count_as('authenticated', :EDITOR, 'select count(*) from public.services')::text);

select tests.check('editor sees draft projects', '2',
  tests.count_as('authenticated', :EDITOR, 'select count(*) from public.projects')::text);

select tests.check('editor may create a service', 'ok',
  tests.write_as('authenticated', :EDITOR, $q$
    insert into public.services (title, slug, short_description)
    values ('خدمة جديدة', 'new-service', 'وصف')
  $q$));

select tests.check('editor cannot read quote requests', '0',
  tests.count_as('authenticated', :EDITOR, 'select count(*) from public.quote_requests')::text);

select tests.check('editor cannot read internal lead notes', '0',
  tests.count_as('authenticated', :EDITOR, 'select count(*) from public.quote_request_notes')::text);

select tests.check('editor cannot read the activity log', '0',
  tests.count_as('authenticated', :EDITOR, 'select count(*) from public.activity_logs')::text);

select tests.check('editor cannot read other profiles', '1',
  tests.count_as('authenticated', :EDITOR, 'select count(*) from public.profiles')::text);

select tests.check('editor cannot promote itself to owner', '42501',
  tests.write_as('authenticated', :EDITOR,
    format($q$update public.profiles set role = 'owner' where id = %L$q$,
           '22222222-2222-2222-2222-222222222222')));

-- -------------------------------------------------------------------- SALES
select tests.check('sales reads quote requests', '2',
  tests.count_as('authenticated', :SALES, 'select count(*) from public.quote_requests')::text);

select tests.check('sales may advance a lead status', 'ok',
  tests.write_as('authenticated', :SALES,
    $q$update public.quote_requests set status = 'contacted'
       where request_number = (select min(request_number) from public.quote_requests)$q$));

select tests.check('status change is recorded in history', '1',
  (select count(*)::text from public.quote_request_status_history
   where old_status = 'new' and new_status = 'contacted'));

select tests.check('sales cannot delete a lead', '42501',
  tests.write_as('authenticated', :SALES, $q$delete from public.quote_requests$q$));

-- RLS filters rows rather than raising, so the meaningful assertion is that
-- nothing changed, not that an error was thrown.
select tests.check('sales cannot edit CMS content (0 rows affected)', '0',
  tests.affected_as('authenticated', :SALES,
    $q$update public.services set title = 'HACKED' where slug = 'digital-marketing'$q$));

select tests.check('sales cannot insert CMS content', '42501',
  tests.write_as('authenticated', :SALES,
    $q$insert into public.services (title, slug, short_description)
       values ('خدمة', 'sales-injected', 'وصف')$q$));

select tests.check('sales cannot read the media library', '0',
  tests.count_as('authenticated', :SALES, 'select count(*) from public.media')::text);

-- ----------------------------------------------------------------- DESIGNER
select tests.check('designer reads the media library', '1',
  tests.count_as('authenticated', :DESIGNER, 'select count(*) from public.media')::text);

select tests.check('designer may add media', 'ok',
  tests.write_as('authenticated', :DESIGNER, $q$
    insert into public.media (file_name, storage_path, public_url, mime_type, file_size, folder)
    values ('shot.webp', 'projects/shot.webp', 'https://example.test/shot.webp', 'image/webp', 2048, 'projects')
  $q$));

select tests.check('designer cannot read quote requests', '0',
  tests.count_as('authenticated', :DESIGNER, 'select count(*) from public.quote_requests')::text);

select tests.check('designer cannot edit services (0 rows affected)', '0',
  tests.affected_as('authenticated', :DESIGNER,
    $q$update public.services set title = 'HACKED' where slug = 'digital-marketing'$q$));

select tests.check('designer cannot insert services', '42501',
  tests.write_as('authenticated', :DESIGNER,
    $q$insert into public.services (title, slug, short_description)
       values ('خدمة', 'designer-injected', 'وصف')$q$));

-- Proof that neither attempt above touched the data.
select tests.check('service title survived unauthorised updates', 'التسويق الإلكتروني',
  (select title from public.services where slug = 'digital-marketing'));

select tests.check('no unauthorised service rows were created', '0',
  (select count(*)::text from public.services
   where slug in ('sales-injected', 'designer-injected')));

-- -------------------------------------------------------------------- OWNER
select tests.check('owner reads all profiles', '4',
  tests.count_as('authenticated', :OWNER, 'select count(*) from public.profiles')::text);

select tests.check('owner reads quote requests', '2',
  tests.count_as('authenticated', :OWNER, 'select count(*) from public.quote_requests')::text);

select tests.check('owner reads the activity log', '0',
  tests.count_as('authenticated', :OWNER, 'select count(*) from public.activity_logs')::text);

select tests.check('owner may append to the activity log', 'ok',
  tests.write_as('authenticated', :OWNER,
    format($q$insert into public.activity_logs (user_id, action, entity_type)
              values (%L, 'service.created', 'service')$q$,
           '11111111-1111-1111-1111-111111111111')));

select tests.check('owner cannot rewrite the activity log', '42501',
  tests.write_as('authenticated', :OWNER,
    $q$update public.activity_logs set action = 'service.deleted'$q$));

select tests.check('owner cannot erase the activity log', '42501',
  tests.write_as('authenticated', :OWNER, $q$delete from public.activity_logs$q$));

select tests.check('owner cannot hard-delete a lead', '42501',
  tests.write_as('authenticated', :OWNER, $q$delete from public.quote_requests$q$));

select tests.check('owner may change another user''s role', 'ok',
  tests.write_as('authenticated', :OWNER,
    format($q$update public.profiles set role = 'sales' where id = %L$q$,
           '44444444-4444-4444-4444-444444444444')));

select tests.check('owner cannot change its own role', '42501',
  tests.write_as('authenticated', :OWNER,
    format($q$update public.profiles set role = 'editor' where id = %L$q$,
           '11111111-1111-1111-1111-111111111111')));

-- ------------------------------------------------------- INTEGRITY & I18N

-- Renaming a project must preserve the old URL for a redirect.
update public.projects set slug = 'renamed-project' where slug = 'published-project';
select tests.check('slug history is recorded on rename', '1',
  (select count(*)::text from public.project_slug_history where slug = 'published-project'));

-- Arabic is the fallback whenever an English translation is missing or blank.
select tests.check('i18n falls back to Arabic when English is absent', 'العربية',
  public.i18n('العربية', null, 'en'));
select tests.check('i18n falls back to Arabic when English is blank', 'العربية',
  public.i18n('العربية', '   ', 'en'));
select tests.check('i18n returns English when present', 'English',
  public.i18n('العربية', 'English', 'en'));
select tests.check('i18n returns Arabic for the Arabic locale', 'العربية',
  public.i18n('العربية', 'English', 'ar'));

-- A shown price must exist; a hidden one need not.
select tests.check('a visible price cannot be null', '23514',
  tests.write_as('postgres', null,
    $q$insert into public.packages (name, status, show_price, price)
       values ('باقة بلا سعر', 'published', true, null)$q$));

select tests.check('a hidden price may be null', 'ok',
  tests.write_as('postgres', null,
    $q$insert into public.packages (name, status, show_price, price)
       values ('باقة بسعر مخفي', 'published', false, null)$q$));

-- Ratings are constrained at the database, not just in the form.
select tests.check('a rating above five is rejected', '23514',
  tests.write_as('postgres', null,
    $q$insert into public.testimonials (client_name, testimonial_text, rating)
       values ('عميل', 'نص', 6)$q$));

-- Slugs must be URL-safe.
select tests.check('an invalid slug is rejected', '23514',
  tests.write_as('postgres', null,
    $q$insert into public.services (title, slug, short_description)
       values ('خدمة', 'Not A Slug!', 'وصف')$q$));

-- Only one settings row may ever exist.
select tests.check('site settings are a singleton', 'ok',
  tests.write_as('postgres', null,
    $q$insert into public.site_settings (brand_name) values ('PANTHER')$q$));
select tests.check('a second settings row is rejected', '23505',
  tests.write_as('postgres', null,
    $q$insert into public.site_settings (brand_name) values ('DUPLICATE')$q$));

-- A category still in use cannot be deleted out from under published work.
select tests.check('an in-use category cannot be deleted', '23503',
  tests.write_as('postgres', null,
    $q$delete from public.portfolio_categories where slug = 'digital-marketing'$q$));

-- Publishing stamps published_at; unpublishing clears it.
select tests.check('published_at is stamped automatically', '1',
  (select count(*)::text from public.services
   where slug = 'digital-marketing' and published_at is not null));
