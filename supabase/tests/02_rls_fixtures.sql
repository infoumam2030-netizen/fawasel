-- Minimal fixtures for the RLS suite. Local validation only.
truncate tests.results;

insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'owner@panther.test'),
  ('22222222-2222-2222-2222-222222222222', 'editor@panther.test'),
  ('33333333-3333-3333-3333-333333333333', 'sales@panther.test'),
  ('44444444-4444-4444-4444-444444444444', 'designer@panther.test')
on conflict do nothing;

update public.profiles set role = 'owner'    where id = '11111111-1111-1111-1111-111111111111';
update public.profiles set role = 'editor'   where id = '22222222-2222-2222-2222-222222222222';
update public.profiles set role = 'sales'    where id = '33333333-3333-3333-3333-333333333333';
update public.profiles set role = 'designer' where id = '44444444-4444-4444-4444-444444444444';

insert into public.services (id, title, slug, short_description, status) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'التسويق الإلكتروني', 'digital-marketing', 'وصف', 'published'),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'خدمة مسودة', 'draft-service', 'وصف', 'draft');

insert into public.service_subservices (service_id, name) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'إدارة الحملات'),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'بند مخفي');

insert into public.portfolio_categories (id, name, slug) values
  ('cccccccc-0000-0000-0000-000000000001', 'التسويق الإلكتروني', 'digital-marketing');

insert into public.projects (id, title, slug, short_description, category_id, status) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'مشروع منشور', 'published-project', 'وصف',
   'cccccccc-0000-0000-0000-000000000001', 'published'),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'مشروع مسودة', 'draft-project', 'وصف',
   'cccccccc-0000-0000-0000-000000000001', 'draft');

insert into public.project_images (project_id, image_url) values
  ('bbbbbbbb-0000-0000-0000-000000000001', 'https://example.test/a.webp'),
  ('bbbbbbbb-0000-0000-0000-000000000002', 'https://example.test/secret.webp');

insert into public.project_results (project_id, value, label, is_visible) values
  ('bbbbbbbb-0000-0000-0000-000000000001', '120', 'نمو الوصول', true),
  ('bbbbbbbb-0000-0000-0000-000000000001', '99', 'مخفي', false);

insert into public.clients (name, is_visible) values ('عميل ظاهر', true), ('عميل مخفي', false);

insert into public.packages (id, name, status, show_price, price) values
  ('dddddddd-0000-0000-0000-000000000001', 'باقة النمو', 'published', true, 5000),
  ('dddddddd-0000-0000-0000-000000000002', 'باقة مسودة', 'draft', false, null);

insert into public.package_features (package_id, feature_text) values
  ('dddddddd-0000-0000-0000-000000000001', 'ميزة ظاهرة'),
  ('dddddddd-0000-0000-0000-000000000002', 'ميزة مخفية');

insert into public.testimonials (client_name, testimonial_text, status, is_demo) values
  ('عميل', 'رأي منشور', 'published', true),
  ('عميل', 'رأي مسودة', 'draft', true);

insert into public.faq (question, answer, is_visible) values
  ('سؤال ظاهر', 'جواب', true), ('سؤال مخفي', 'جواب', false);

insert into public.media (file_name, storage_path, public_url, mime_type, file_size, folder) values
  ('logo.webp', 'brand/logo.webp', 'https://example.test/logo.webp', 'image/webp', 1024, 'brand');

insert into public.form_options (group_key, value, label) values
  ('budget', 'under_5k', 'أقل من 5,000 ريال'),
  ('contact_method', 'whatsapp', 'واتساب');
