-- ===========================================================================
-- SEED 0001 — Settings and editorial content
-- ===========================================================================
-- Everything in this file is REAL PANTHER content taken from the approved
-- project brief: brand copy, the six services, the philosophy, the working
-- process, the FAQ, production capabilities and contact details. None of it
-- is invented, and none of it is flagged is_demo.
--
-- Placeholder-content lives in 0002 and is flagged.
--
-- Idempotent: every insert is ON CONFLICT DO NOTHING or an upsert, so the
-- file can be re-run safely.
--
-- {{MEDIA_BASE}} is substituted by scripts/seed.sh with the project's public
-- storage URL. Never hardcode it.
-- ===========================================================================

-- --- Site settings ---------------------------------------------------------
insert into public.site_settings (
  singleton, brand_name, brand_name_en, tagline, tagline_en,
  phone, whatsapp, address, address_en,
  default_seo_title, default_seo_title_en,
  default_seo_description, default_seo_description_en,
  footer_text, footer_text_en, copyright_text, copyright_text_en
) values (
  true, 'PANTHER', 'PANTHER',
  'نرصد بدقة. نسوّق بذكاء. ونصنع الأثر.',
  'We observe with precision. We market with intelligence. We create impact.',
  '+966541882358', '+966541882358',
  'المملكة العربية السعودية', 'Saudi Arabia',
  'PANTHER — وكالة تسويق رقمي', 'PANTHER — Marketing & Growth',
  'نساعد العلامات التجارية على بناء حضور أقوى، الوصول إلى جمهورها بدقة، وتحويل التسويق إلى نمو قابل للقياس.',
  'We help brands build a stronger presence, reach their audience with precision, and turn marketing into measurable growth.',
  'وكالة تسويق رقمي', 'Digital marketing agency',
  'جميع الحقوق محفوظة.', 'All rights reserved.'
) on conflict (singleton) do nothing;

-- --- Social channels -------------------------------------------------------
insert into public.social_links (platform, url, label, label_en, icon, order_index) values
  ('instagram', 'https://instagram.com/panther_marketing.sa', 'إنستقرام', 'Instagram', 'instagram', 1),
  ('tiktok',    'https://tiktok.com/@panther_marketing.sa',   'تيك توك',  'TikTok',    'tiktok',    2)
on conflict (platform) do nothing;

-- --- Quote form option lists ----------------------------------------------
-- Referenced by quote_requests via foreign key, so these must exist before
-- the public form can accept a submission.
insert into public.form_options (group_key, value, label, label_en, order_index) values
  ('budget', 'under_5k',   'أقل من 5,000 ريال',        'Under SAR 5,000',        1),
  ('budget', '5k_10k',     '5,000 – 10,000 ريال',      'SAR 5,000 – 10,000',     2),
  ('budget', '10k_20k',    '10,000 – 20,000 ريال',     'SAR 10,000 – 20,000',    3),
  ('budget', '20k_50k',    '20,000 – 50,000 ريال',     'SAR 20,000 – 50,000',    4),
  ('budget', 'over_50k',   '50,000+ ريال',             'SAR 50,000+',            5),
  ('budget', 'unspecified','الميزانية غير محددة',       'Not yet defined',        6),
  ('contact_method', 'whatsapp', 'واتساب',   'WhatsApp',   1),
  ('contact_method', 'phone',    'اتصال',    'Phone call', 2),
  ('contact_method', 'email',    'بريد إلكتروني', 'Email',  3)
on conflict (group_key, value) do nothing;

-- --- Homepage sections -----------------------------------------------------
-- Structured extras live in `content` JSONB rather than in a column per text
-- element, exactly as the schema intends.
insert into public.homepage_sections (section_key, title, title_en, subtitle, subtitle_en, description, description_en, content, order_index) values
  ('hero',
   'نرصد بدقة. نسوّق بذكاء. ونصنع الأثر.',
   'We observe with precision. We market with intelligence. We create impact.',
   'Marketing & Growth', 'Marketing & Growth',
   'نساعد العلامات التجارية على بناء حضور أقوى، الوصول إلى جمهورها بدقة، وتحويل التسويق إلى نمو قابل للقياس.',
   'We help brands build a stronger presence, reach their audience with precision, and turn marketing into measurable growth.',
   '{"motto":"SPEED. FOCUS. GROWTH.","services_line":"Strategy • Branding • Content • Ads • Web","cta_primary":"ابدأ مشروعك","cta_primary_en":"Start your project","cta_secondary":"اكتشف أعمالنا","cta_secondary_en":"Explore our work"}'::jsonb,
   1),

  ('trusted_brands', 'موثوقون من علامات تجارية', 'Trusted by brands', null, null, null, null, '{}'::jsonb, 2),

  ('statistics', null, null, null, null, null, null, '{}'::jsonb, 3),

  ('philosophy',
   'نرصد بدقة. نسوّق بذكاء. ونصنع الأثر.',
   'We observe. We market. We create impact.',
   'فلسفتنا', 'Our philosophy', null, null,
   '{"stages":[
      {"index":"01","title":"نرصد بدقة.","title_en":"We observe with precision.","body":"نفهم السوق والجمهور والفرصة.","body_en":"We understand the market, the audience and the opportunity."},
      {"index":"02","title":"نسوّق بذكاء.","title_en":"We market with intelligence.","body":"نبني الاستراتيجية ونختار القنوات والرسائل المناسبة.","body_en":"We build the strategy and choose the right channels and messages."},
      {"index":"03","title":"نصنع الأثر.","title_en":"We create impact.","body":"نحوّل التسويق إلى نتائج ونمو حقيقي.","body_en":"We turn marketing into results and real growth."}
    ]}'::jsonb,
   4),

  ('why_panther',
   'لماذا PANTHER', 'Why PANTHER', null, null, null, null,
   '{"principles":[
      {"index":"01","label":"Strategy","title":"الاستراتيجية","title_en":"Strategy","body":"لا نبدأ بالتنفيذ قبل فهم الهدف.","body_en":"We do not start executing before we understand the goal."},
      {"index":"02","label":"Precision","title":"الدقة","title_en":"Precision","body":"نصل للعميل المناسب بالرسالة المناسبة.","body_en":"We reach the right customer with the right message."},
      {"index":"03","label":"Speed","title":"السرعة","title_en":"Speed","body":"نحوّل الأفكار إلى تنفيذ سريع.","body_en":"We turn ideas into fast execution."},
      {"index":"04","label":"Growth","title":"النمو","title_en":"Growth","body":"نقيس ونحلل ونطور للوصول إلى نتائج أفضل.","body_en":"We measure, analyse and improve to reach better results."}
    ]}'::jsonb,
   5),

  ('services',
   'خدماتنا', 'Our services', 'WHAT WE DO', 'WHAT WE DO',
   'من الاستراتيجية إلى التنفيذ، نبني حلولًا تسويقية متكاملة تساعد علامتك التجارية على النمو.',
   'From strategy to execution, we build integrated marketing solutions that help your brand grow.',
   '{}'::jsonb, 6),

  ('how_we_work',
   'كيف نعمل', 'How we work', null, null, null, null,
   '{"steps":[
      {"index":"01","title":"Discover","body":"نفهم نشاطك، أهدافك، جمهورك والسوق.","body_en":"We understand your business, goals, audience and market."},
      {"index":"02","title":"Strategy","body":"نبني الاستراتيجية ونحدد الأولويات والقنوات.","body_en":"We build the strategy and set priorities and channels."},
      {"index":"03","title":"Create","body":"ننتج المحتوى والهوية والحلول الإبداعية.","body_en":"We produce the content, identity and creative solutions."},
      {"index":"04","title":"Launch","body":"نطلق الحملات ونبدأ التنفيذ.","body_en":"We launch the campaigns and begin execution."},
      {"index":"05","title":"Optimize","body":"نقيس الأداء ونحلل البيانات ونطور النتائج.","body_en":"We measure performance, analyse the data and improve results."},
      {"index":"06","title":"Grow","body":"نحوّل التعلم والنتائج إلى نمو مستمر.","body_en":"We turn learning and results into continuous growth."}
    ]}'::jsonb,
   7),

  ('selected_work',
   'أعمالنا', 'Selected work', 'SELECTED WORK', 'SELECTED WORK',
   'نحوّل الأفكار والاستراتيجيات إلى أعمال تصنع أثرًا حقيقيًا.',
   'We turn ideas and strategies into work that creates real impact.',
   '{}'::jsonb, 8),

  ('production',
   'إمكانياتنا الإنتاجية', 'Production capabilities', null, null,
   'لا نكتفي بالتخطيط للمحتوى — ننتجه.',
   'We do not just plan the content. We produce it.',
   '{"cta":"شوف إمكانياتنا","cta_en":"See our capabilities"}'::jsonb, 9),

  ('packages',
   'باقاتنا', 'Packages', 'PACKAGES', 'PACKAGES',
   'حلول مرنة مصممة حسب احتياجات علامتك وأهداف نموك.',
   'Flexible solutions designed around your brand and your growth goals.',
   '{}'::jsonb, 10),

  ('testimonials',
   'ماذا يقول عملاؤنا', 'What our clients say', 'WHAT OUR CLIENTS SAY', 'WHAT OUR CLIENTS SAY',
   null, null, '{}'::jsonb, 11),

  ('faq', 'الأسئلة الشائعة', 'Frequently asked questions', 'FAQ', 'FAQ', null, null, '{}'::jsonb, 12),

  ('final_cta',
   'مستعد تبدأ؟', 'Ready to start?', null, null,
   'خلينا نعرف إيه اللي محتاجه، ونبني لك الحل المناسب.',
   'Tell us what you need, and we will build the right solution for you.',
   '{"cta_primary":"طلب عرض سعر","cta_primary_en":"Request a quote","cta_secondary":"تواصل معنا","cta_secondary_en":"Contact us"}'::jsonb,
   13)
on conflict (section_key) do nothing;

-- --- Statistics ------------------------------------------------------------
-- Figures as printed in the approved brief. Value is numeric with the "+"
-- kept in `suffix`, so the counter can animate from zero.
-- Guarded by label rather than ON CONFLICT: the table has no unique
-- constraint on label, so ON CONFLICT DO NOTHING would silently duplicate
-- every row on a re-run.
insert into public.statistics (label, label_en, value, suffix, order_index)
select v.label, v.label_en, v.value, v.suffix, v.order_index
from (values
  ('سنوات من الخبرة', 'Years of experience', 5::numeric,   '+', 1),
  ('عميل راضٍ',       'Happy clients',       120::numeric, '+', 2),
  ('مشروع مكتمل',     'Completed projects',  450::numeric, '+', 3),
  ('خدمة متاحة',      'Services available',  30::numeric,  '+', 4)
) as v(label, label_en, value, suffix, order_index)
where not exists (select 1 from public.statistics t where t.label = v.label);

-- --- FAQ -------------------------------------------------------------------
insert into public.faq (question, question_en, answer, answer_en, order_index)
select v.question, v.question_en, v.answer, v.answer_en, v.order_index
from (values
  ('ما هي مدة التعاقد؟', 'How long is the contract?',
   'نوفر عقودًا مرنة تبدأ من 3 أشهر، 6 أشهر، أو 12 شهرًا، ويتم اختيار المدة الأنسب بناءً على أهداف المشروع وطبيعة العمل.',
   'We offer flexible contracts starting from 3, 6 or 12 months. The right term is chosen based on the project goals and the nature of the work.', 1),
  ('هل توجد فترة تجربة قبل التعاقد؟', 'Is there a trial period before contracting?',
   'نعم، نوفر فترة تجربة لمدة أسبوع تتيح للعميل التعرف على آلية عملنا وجودة التنفيذ قبل الالتزام بعقد طويل المدى.',
   'Yes. We offer a one-week trial so you can see how we work and the quality of our execution before committing to a longer engagement.', 2),
  ('هل تعتمد PANTHER على الذكاء الاصطناعي في العمل؟', 'Does PANTHER use AI in its work?',
   'نستخدم تقنيات الذكاء الاصطناعي كعامل مساعد لتطوير الأفكار، تسريع بعض مراحل الإنتاج ورفع كفاءة العمل، مع الحفاظ على دور الاستراتيجية والإبداع والخبرة البشرية في اتخاذ القرارات وتنفيذ الحلول المناسبة لكل علامة.',
   'We use AI as an assistive tool to develop ideas, speed up parts of production and raise efficiency, while strategy, creativity and human expertise remain responsible for decisions and for the solutions we build for each brand.', 3),
  ('هل طريقة الدفع مرنة؟', 'Are payment terms flexible?',
   'نحرص على توفير آلية دفع مناسبة للطرفين بما يتوافق مع طبيعة المشروع ومدته ونطاق الخدمات، ويتم الاتفاق على تفاصيل الدفع بوضوح قبل بدء العمل.',
   'We work to agree payment terms that suit both sides, matched to the project, its duration and its scope. Payment details are agreed clearly before work begins.', 4),
  ('كيف تبدأ إجراءات التعاقد مع PANTHER؟', 'How does working with PANTHER begin?',
   'نبدأ بفهم نشاطك وأهدافك واحتياجاتك، ثم نحدد نطاق العمل والخدمات المناسبة ونقدم عرضًا واضحًا يتضمن التفاصيل والتكلفة والمدة. بعد اعتماد العرض، يتم توقيع العقد والبدء في التنفيذ.',
   'We start by understanding your business, goals and needs, then define the scope and the right services and present a clear proposal covering details, cost and timeline. Once approved, the contract is signed and execution begins.', 5)
) as v(question, question_en, answer, answer_en, order_index)
where not exists (select 1 from public.faq t where t.question = v.question);

-- --- Production capabilities ----------------------------------------------
insert into public.production_capabilities (name, name_en, order_index)
select v.name, v.name_en, v.order_index
from (values
  ('التصوير الاحترافي',     'Professional photography', 1),
  ('إنتاج الفيديو',         'Video production',         2),
  ('التصوير بالدرون',       'Drone photography',        3),
  ('الإنتاج الاستوديوهي',   'Studio production',        4),
  ('تصوير المنتجات',        'Product photography',      5),
  ('التصوير العقاري',       'Real estate photography',  6),
  ('الإنتاج التجاري',       'Commercial production',    7),
  ('محتوى السوشيال ميديا',  'Social media content',     8),
  ('الإخراج الإبداعي',      'Creative direction',       9)
) as v(name, name_en, order_index)
where not exists (select 1 from public.production_capabilities t where t.name = v.name);

-- --- Portfolio categories --------------------------------------------------
insert into public.portfolio_categories (name, name_en, slug, order_index) values
  ('التسويق الإلكتروني', 'Digital Marketing', 'digital-marketing', 1),
  ('البراندينج',         'Branding',          'branding',          2),
  ('المواقع الإلكترونية','Websites',          'websites',          3),
  ('الإنتاج المرئي',     'Production',        'production',        4),
  ('المعارض والمؤتمرات', 'Events',            'events',            5),
  ('المطبوعات',          'Printing',          'printing',          6)
on conflict (slug) do nothing;

-- --- Services --------------------------------------------------------------
insert into public.services (title, title_en, slug, short_description, short_description_en, order_index, status, is_featured) values
  ('التسويق الإلكتروني', 'Digital Marketing', 'digital-marketing',
   'إدارة الحملات والقنوات الرقمية للوصول إلى الجمهور المناسب وتحقيق نمو قابل للقياس.',
   'Managing digital campaigns and channels to reach the right audience and drive measurable growth.', 1, 'published', true),
  ('البراندينج والشعارات', 'Branding & Identity', 'branding-identity',
   'بناء هوية بصرية متكاملة تعبّر عن شخصية العلامة وتميّزها في السوق.',
   'Building a complete visual identity that expresses your brand and sets it apart.', 2, 'published', true),
  ('المواقع الإلكترونية والأنظمة', 'Websites & Digital Systems', 'websites-systems',
   'تصميم وتطوير مواقع وأنظمة رقمية سريعة وآمنة وقابلة للنمو.',
   'Designing and building fast, secure and scalable websites and digital systems.', 3, 'published', true),
  ('التصوير والإنتاج المرئي', 'Photography & Visual Production', 'photography-production',
   'إنتاج محتوى بصري احترافي من التصوير الفوتوغرافي إلى الفيديو والدرون.',
   'Producing professional visual content, from photography to video and drone.', 4, 'published', false),
  ('تنظيم المعارض والمؤتمرات', 'Events & Exhibitions', 'events-exhibitions',
   'تخطيط وتنفيذ المعارض والمؤتمرات بتجربة متكاملة من الفكرة إلى التنفيذ.',
   'Planning and delivering exhibitions and conferences end to end.', 5, 'published', false),
  ('المطبوعات', 'Printing & Production', 'printing-production',
   'تصميم وتنفيذ المطبوعات التجارية والتسويقية بجودة عالية.',
   'Designing and producing high-quality commercial and marketing print.', 6, 'published', false)
on conflict (slug) do nothing;
