-- ===========================================================================
-- SEED 0002 — Placeholder portfolio, clients, packages and testimonials
-- ===========================================================================
-- Everything here is flagged is_demo = true.
--
-- What is REAL: client names, industries and the artwork itself, all read
-- from the supplied campaign files.
--
-- What is PLACEHOLDER: descriptions, challenge/strategy/execution copy,
-- package contents and testimonial quotes.
--
-- What is deliberately ABSENT: project_results. The brief forbids inventing
-- metrics, so no campaign figures are seeded. The Results section stays
-- hidden until real numbers are entered in the dashboard — which is the
-- correct behaviour, not an omission.
--
-- Replace all of this from the dashboard as real content arrives; nothing
-- here requires a code change to remove.
-- ===========================================================================

-- --- Projects --------------------------------------------------------------
-- Five case studies, one per supplied campaign folder. Covers and galleries
-- point at Supabase Storage; {{MEDIA_BASE}} is substituted at apply time.
insert into public.projects (
  title, title_en, slug, client_name, industry, industry_en,
  category_id, short_description, short_description_en,
  challenge, challenge_en, strategy, strategy_en, execution, execution_en,
  cover_image_url, year, featured, order_index, status, is_demo
)
select v.title, v.title_en, v.slug, v.client_name, v.industry, v.industry_en,
       c.id, v.short_description, v.short_description_en,
       v.challenge, v.challenge_en, v.strategy, v.strategy_en, v.execution, v.execution_en,
       '{{MEDIA_BASE}}/projects/' || v.slug || '/cover.webp',
       v.year, v.featured, v.order_index, 'published', true
from (values
  ('عيادات هيلثي', 'Healthy Clinics', 'healthy-clinics', 'عيادات هيلثي', 'قطاع طبي', 'Healthcare',
   'محتوى تجاري وحملات موسمية لعيادات متعددة التخصصات.',
   'Commercial content and seasonal campaigns for a multi-speciality clinic group.',
   '[محتوى تجريبي] وصف التحدي يُستبدل بالمحتوى الحقيقي من لوحة التحكم.',
   '[Demo content] The challenge description is replaced from the dashboard.',
   '[محتوى تجريبي] وصف الاستراتيجية يُستبدل بالمحتوى الحقيقي من لوحة التحكم.',
   '[Demo content] The strategy description is replaced from the dashboard.',
   '[محتوى تجريبي] وصف التنفيذ يُستبدل بالمحتوى الحقيقي من لوحة التحكم.',
   '[Demo content] The execution description is replaced from the dashboard.',
   2025, true, 1),

  ('وافية لقمة', 'Wafiya Loqma', 'wafiya-loqma', 'وافية لقمة', 'مطاعم وأغذية', 'Food & Beverage',
   'هوية محتوى وحملات ترويجية لمطعم في الرياض.',
   'Content identity and promotional campaigns for a Riyadh restaurant.',
   '[محتوى تجريبي] وصف التحدي يُستبدل بالمحتوى الحقيقي من لوحة التحكم.',
   '[Demo content] The challenge description is replaced from the dashboard.',
   '[محتوى تجريبي] وصف الاستراتيجية يُستبدل بالمحتوى الحقيقي من لوحة التحكم.',
   '[Demo content] The strategy description is replaced from the dashboard.',
   '[محتوى تجريبي] وصف التنفيذ يُستبدل بالمحتوى الحقيقي من لوحة التحكم.',
   '[Demo content] The execution description is replaced from the dashboard.',
   2026, true, 2),

  ('نقطة ضمان', 'Warranty Point', 'warranty-point', 'نقطة ضمان', 'خدمات سيارات', 'Automotive services',
   'حملات خدمية وصيانة موسمية لشبكة مراكز سيارات.',
   'Service and seasonal maintenance campaigns for an automotive centre network.',
   '[محتوى تجريبي] وصف التحدي يُستبدل بالمحتوى الحقيقي من لوحة التحكم.',
   '[Demo content] The challenge description is replaced from the dashboard.',
   '[محتوى تجريبي] وصف الاستراتيجية يُستبدل بالمحتوى الحقيقي من لوحة التحكم.',
   '[Demo content] The strategy description is replaced from the dashboard.',
   '[محتوى تجريبي] وصف التنفيذ يُستبدل بالمحتوى الحقيقي من لوحة التحكم.',
   '[Demo content] The execution description is replaced from the dashboard.',
   2026, true, 3),

  ('مكاتب المغيب', 'ALMUGHEB Offices', 'almugheb', 'المغيب للتطوير والاستثمار العقاري', 'عقارات', 'Real estate',
   'محتوى تسويقي عقاري يركّز على الثقة والضمان.',
   'Real-estate marketing content built around trust and guarantee.',
   '[محتوى تجريبي] وصف التحدي يُستبدل بالمحتوى الحقيقي من لوحة التحكم.',
   '[Demo content] The challenge description is replaced from the dashboard.',
   '[محتوى تجريبي] وصف الاستراتيجية يُستبدل بالمحتوى الحقيقي من لوحة التحكم.',
   '[Demo content] The strategy description is replaced from the dashboard.',
   '[محتوى تجريبي] وصف التنفيذ يُستبدل بالمحتوى الحقيقي من لوحة التحكم.',
   '[Demo content] The execution description is replaced from the dashboard.',
   2026, false, 4),

  ('هوم بادي', 'Home Body', 'home-body', 'Home Body', 'لياقة ورياضة', 'Fitness',
   'حملات محتوى لمنتجات اللياقة المنزلية.',
   'Content campaigns for home fitness products.',
   '[محتوى تجريبي] وصف التحدي يُستبدل بالمحتوى الحقيقي من لوحة التحكم.',
   '[Demo content] The challenge description is replaced from the dashboard.',
   '[محتوى تجريبي] وصف الاستراتيجية يُستبدل بالمحتوى الحقيقي من لوحة التحكم.',
   '[Demo content] The strategy description is replaced from the dashboard.',
   '[محتوى تجريبي] وصف التنفيذ يُستبدل بالمحتوى الحقيقي من لوحة التحكم.',
   '[Demo content] The execution description is replaced from the dashboard.',
   2026, false, 5)
) as v(title, title_en, slug, client_name, industry, industry_en,
       short_description, short_description_en, challenge, challenge_en,
       strategy, strategy_en, execution, execution_en, year, featured, order_index)
join public.portfolio_categories c on c.slug = 'digital-marketing'
on conflict (slug) do nothing;

-- Every project is delivered by digital marketing plus visual production.
insert into public.project_services (project_id, service_id)
select p.id, s.id
from public.projects p
cross join public.services s
where p.is_demo
  and s.slug in ('digital-marketing', 'photography-production')
on conflict do nothing;

-- --- Gallery ---------------------------------------------------------------
-- Four gallery images per project, matching prepare-media.py's output names.
insert into public.project_images (project_id, image_url, alt_text, alt_text_en, order_index)
select p.id,
       format('{{MEDIA_BASE}}/projects/%s/gallery-%s.webp', p.slug, lpad(g::text, 2, '0')),
       format('%s — عمل %s', p.title, g),
       format('%s — work %s', coalesce(p.title_en, p.title), g),
       g
from public.projects p
cross join generate_series(1, 4) as g
where p.is_demo
  and not exists (
    select 1 from public.project_images pi
    where pi.project_id = p.id and pi.order_index = g
  );

-- --- Clients ---------------------------------------------------------------
-- Names and industries are REAL, read from the supplied "شركاء نجاحنا"
-- graphic. logo_url is intentionally NULL: that file is a single composite in
-- which the logos overlap each other on a promotional background, so no clean
-- individual logo can be extracted from it. The marquee renders a typographic
-- treatment until real logo files are uploaded through the dashboard — which
-- needs no code change.
insert into public.clients (name, name_en, industry, industry_en, order_index, is_visible, is_featured, is_demo)
select v.name, v.name_en, v.industry, v.industry_en, v.order_index, v.is_visible, v.is_featured, v.is_demo
from (values
  ('النحلة الذهبية', 'Golden Bee', 'تسويق', 'Marketing', 1, true, true, true),
  ('مجمع أضواء نمار الطبي', 'Adwaa Nimar Medical Complex', 'قطاع طبي', 'Healthcare', 2, true, true, true),
  ('البسمة الثمينة', 'Noble Smile Dental Care', 'طب أسنان', 'Dental care', 3, true, true, true),
  ('عيادات بيور هيلث', 'Pure Health Clinics', 'قطاع طبي', 'Healthcare', 4, true, true, true),
  ('المغيب للتطوير والاستثمار العقاري', 'ALMUGHEB Real Estate', 'عقارات', 'Real estate', 5, true, true, true),
  ('سوفتوير آرت', 'Software Art', 'حلول تقنية', 'Technology', 6, true, false, true),
  ('وافية لقمة', 'Wafiya Loqma', 'مطاعم', 'Food & Beverage', 7, true, false, true),
  ('الوفيرا للمقاولات', 'Aloe Vera Contracting', 'مقاولات', 'Contracting', 8, true, false, true),
  ('سكاي هاوس للتسويق العقاري', 'Sky House Real Estate Marketing', 'عقارات', 'Real estate', 9, true, false, true),
  ('جميلة', 'Jamiiila', 'تجميل', 'Beauty', 10, true, false, true),
  ('أوليه سبا', 'OLYÉ Spa', 'عناية وسبا', 'Spa & wellness', 11, true, false, true),
  ('درر الجزيرة العقارية', 'Dorr Aljazeerah Real Estate', 'عقارات', 'Real estate', 12, true, false, true),
  ('السريع', 'Alsurayyi', 'قطع غيار وإطارات', 'Auto parts', 13, true, false, true),
  ('سترونج موتورز', 'Strong Motors', 'سيارات', 'Automotive', 14, true, false, true),
  ('أونست سكوب للتطوير العقاري', 'Onest Scope Development', 'عقارات', 'Real estate', 15, true, false, true),
  ('صيدلية كير بلس', 'Care Plus Pharmacy', 'صيدليات', 'Pharmacy', 16, true, false, true),
  ('شركة أعمال الأولى الدولية', 'First International Business Co.', 'أعمال', 'Business services', 17, true, false, true),
  ('فانتاستيك كير', 'Fantastic Care', 'رعاية', 'Care services', 18, true, false, true),
  ('نقطة ضمان', 'Warranty Point', 'خدمات سيارات', 'Automotive services', 19, true, false, true)
) as v(name, name_en, industry, industry_en, order_index, is_visible, is_featured, is_demo)
where not exists (select 1 from public.clients t where t.name = v.name);

-- --- Packages --------------------------------------------------------------
-- Placeholder tiers. The brief specifies no package contents or pricing, so
-- prices are hidden rather than invented: show_price = false makes the CTA
-- "اطلب عرض السعر", which is the correct behaviour for an agency that quotes
-- per engagement.
-- Guarded by name: packages have no unique constraint, so a bare
-- ON CONFLICT DO NOTHING would duplicate the whole tier list on a re-run.
insert into public.packages (name, name_en, description, description_en, show_price, price, badge, badge_en, featured, order_index, status)
select v.name, v.name_en, v.description, v.description_en, v.show_price, v.price, v.badge, v.badge_en, v.featured, v.order_index, 'published'
from (values
  ('الباقة الأساسية', 'Essential', '[محتوى تجريبي] باقة للبدايات التي تحتاج حضورًا رقميًا منظمًا.',
   '[Demo content] For brands starting to build an organised digital presence.', false, null::numeric, null::text, null::text, false, 1),
  ('باقة النمو', 'Growth', '[محتوى تجريبي] باقة للعلامات التي تريد تسريع النمو وقياسه.',
   '[Demo content] For brands ready to accelerate and measure growth.', false, null::numeric, 'الأكثر طلبًا', 'Most requested', true, 2),
  ('الباقة المتكاملة', 'Full Scale', '[محتوى تجريبي] باقة شاملة من الاستراتيجية إلى الإنتاج والإعلانات.',
   '[Demo content] End to end, from strategy through production and paid media.', false, null::numeric, null::text, null::text, false, 3)
) as v(name, name_en, description, description_en, show_price, price, badge, badge_en, featured, order_index)
where not exists (select 1 from public.packages t where t.name = v.name);

insert into public.package_features (package_id, feature_text, feature_text_en, order_index)
select pk.id, f.text, f.text_en, f.idx
from public.packages pk
cross join lateral (values
  ('[تجريبي] إدارة حسابات التواصل الاجتماعي', '[Demo] Social media management', 1),
  ('[تجريبي] إنتاج محتوى شهري',               '[Demo] Monthly content production', 2),
  ('[تجريبي] تقرير أداء دوري',                 '[Demo] Regular performance reporting', 3)
) as f(text, text_en, idx)
where not exists (
  select 1 from public.package_features pf
  where pf.package_id = pk.id and pf.order_index = f.idx
);

-- --- Testimonials ----------------------------------------------------------
-- EXAMPLE testimonials, flagged is_demo and labelled in the copy itself so
-- they can never be mistaken for real client reviews. No rating is set —
-- inventing a score would be inventing a metric.
insert into public.testimonials (client_name, company_name, company_name_en, job_title, job_title_en, testimonial_text, testimonial_text_en, order_index, featured, status, is_demo)
select v.client_name, v.company_name, v.company_name_en, v.job_title, v.job_title_en, v.testimonial_text, v.testimonial_text_en, v.order_index, v.featured, 'published', true
from (values
  ('[مثال توضيحي]', 'اسم الشركة', 'Company name', 'المدير التنفيذي', 'CEO',
   '[محتوى تجريبي — ليس رأي عميل حقيقي] يُستبدل هذا النص بشهادة عميل موثقة من لوحة التحكم.',
   '[Demo content — not a real client review] This text is replaced with a verified client testimonial from the dashboard.',
   1, true),
  ('[مثال توضيحي]', 'اسم الشركة', 'Company name', 'مدير التسويق', 'Marketing Manager',
   '[محتوى تجريبي — ليس رأي عميل حقيقي] يُستبدل هذا النص بشهادة عميل موثقة من لوحة التحكم.',
   '[Demo content — not a real client review] This text is replaced with a verified client testimonial from the dashboard.',
   2, false),
  ('[مثال توضيحي]', 'اسم الشركة', 'Company name', 'مؤسس', 'Founder',
   '[محتوى تجريبي — ليس رأي عميل حقيقي] يُستبدل هذا النص بشهادة عميل موثقة من لوحة التحكم.',
   '[Demo content — not a real client review] This text is replaced with a verified client testimonial from the dashboard.',
   3, false)
) as v(client_name, company_name, company_name_en, job_title, job_title_en, testimonial_text, testimonial_text_en, order_index, featured)
where not exists (select 1 from public.testimonials t where t.order_index = v.order_index);
