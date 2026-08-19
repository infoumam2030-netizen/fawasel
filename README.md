# طيبة 109

موقع تعريفي فاخر لمشروع **طيبة 109** — مشروع سكني تحت الإنشاء يضم 14 وحدة
سكنية (شقق ودوبلكسات) شمال شرق الرياض. مبني بهوية بصرية تحريرية معمارية
(كحلي/ذهبي)، وبنية قابلة لإعادة الاستخدام لأي مشروع سكني مستقبلي.

## المكدس التقني

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** للحركة والانتقالات (بطيئة، هادئة، محترمة لـ `prefers-reduced-motion`)
- **Lucide Icons**
- **next/font/google** — خط **IBM Plex Sans Arabic** فقط في كل الموقع
- **Google Sheets** (googleapis + تصدير CSV عام) لبيانات توفر الوحدات

## البدء السريع

```bash
npm install
cp .env.example .env.local   # اختياري: لربط Google Sheets ببيانات حقيقية
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000). بدون ربط Google
Sheets، يعمل الموقع تلقائيًا ببيانات تجريبية (14 وحدة: 10 شقق + 4 دوبلكس)
مطابقة لهيكل المشروع الحقيقي.

### أوامر أخرى

```bash
npm run build   # بناء الإنتاج
npm start       # تشغيل بناء الإنتاج محليًا
npm run lint    # فحص الشيفرة
```

## ملف الإعدادات المركزي

كل محتوى المشروع (الاسم، الحالة، الألوان، الأسعار، المميزات، المعالم
القريبة، الضمانات، البنية التحتية، بيانات التواصل...) موجود في مكان واحد:

```
src/config/site.config.ts
```

لا تحتوي أي مكوّنات على محتوى مكتوب مباشرة — كل شيء يُقرأ من هذا الملف.

### بيانات لم تُدخل بعد (بيّنة عمدًا)

الحقول التالية تُركت فارغة لأن المعلومات الحقيقية لم تُزوَّد بعد، ويجب
تعديلها يدويًا في `site.config.ts` قبل الإطلاق:

- `contact.whatsapp`, `contact.phone`
- `location.googleMapsUrl`, `location.googleMapsEmbedUrl`, `location.coordinates`
- `constructionProgress` (يبقى `null` ويظهر "تحت الإنشاء" فقط، حتى تُزوَّد
  نسبة إنجاز حقيقية لاحقًا)

أزرار واتساب/الاتصال تتعطل تلقائيًا (بمظهر معطّل واضح) طالما هذه الحقول
فارغة، بدلًا من إنتاج روابط مكسورة.

## ربط Google Sheets (بيانات الوحدات)

الطريقة الافتراضية **لا تحتاج Service Account ولا مفتاح JSON**: شارك
الشيت بخيار "Anyone with the link can view"، وأضف معرّفه فقط:

```
GOOGLE_SHEET_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

الأعمدة المتوقعة في تبويب "Units"، بالترتيب، بدءًا من الصف الثاني:

| العمود | الوصف |
| --- | --- |
| A | Unit ID (رقم الوحدة) |
| B | Name (اسم الوحدة) |
| C | Type (`شقة` أو `دوبلكس`) |
| D | Area (المساحة بالمتر) |
| E | Price (السعر) |
| F | Status (`متاح` / `محجوز` / `مباع`) |
| G | Floor (الدور، اختياري) |
| H | Features (مميزات مفصولة بـ `;`) |
| I | Images (روابط صور مفصولة بـ `;`) |
| J | Floor plan (رابط صورة المخطط) |

للاطلاع على سلوك الموقع في كل حالة ربط (غير مربوط / مربوط وشغال / مربوط
وفشل الطلب)، راجع التعليقات في `src/services/units.ts` — النقطة المهمة:
الموقع لا يتعطل أبدًا؛ يتدرّج تلقائيًا لبيانات تجريبية أو حالة فارغة.

## الوسائط (Media Assets)

نظرًا لعدم توفر تصوير حقيقي بعد، تم توليد رسومات SVG معمارية تجريدية
(خطوط ذهبية رفيعة على خلفية كحلية) كبدائل مؤقتة:

```
public/images/hero/hero.svg
public/images/gallery/privacy.svg
public/images/floor-plans/apartment.svg
public/images/floor-plans/duplex-first.svg
public/images/floor-plans/duplex-second.svg
public/images/og/og-image.svg
```

استبدل هذه الملفات بنفس الأسماء (أو حدّث المسارات في `site.config.ts`)
عند توفر التصوير الفعلي والمخططات الهندسية، دون أي تعديل على الشيفرة.

## هيكل المشروع

```
src/
  app/                 صفحات ومسارات API (App Router)
  components/
    layout/            شريط التنقل العلوي
    sections/           14 قسمًا لتدفق الصفحة الرئيسية
    ui/                 مكوّنات واجهة قابلة لإعادة الاستخدام
  config/               site.config.ts — كل المحتوى في مكان واحد
  hooks/                React hooks (وحدات مباشرة، عدّاد تصاعدي...)
  lib/                  دوال مساعدة، أنماط حركة، تجميع بيانات الوحدات
  services/             منطق الأعمال (Google Sheets، تحويل بيانات الوحدات)
  types/                تعريفات TypeScript المشتركة
```

## الأداء وإمكانية الوصول

- مكوّنات خادمية (Server Components) افتراضيًا؛ الحدود العميلية محصورة
  بالأقسام التفاعلية فقط (تبويبات، قوائم، عدّادات).
- تحميل كسول وتقسيم للشيفرة (`next/dynamic`) للأقسام الأدنى من الصفحة.
- تحسين الصور عبر `next/image`.
- هيكل عناوين دلالي، `aria-label` على العناصر التفاعلية، ودعم كامل لـ
  `prefers-reduced-motion` بدون أي تعارض في الترطيب (hydration).
- بيانات SEO عربية كاملة (Metadata، OpenGraph، Twitter، Schema.org،
  `robots.txt`، `sitemap.xml`).

## النشر

يمكن نشر المشروع مباشرة على [Vercel](https://vercel.com/new) أو أي منصة
تدعم Next.js 15. تأكد من ضبط متغيرات البيئة نفسها الموجودة في
`.env.example` في إعدادات المنصة المستخدمة.
