import type { SiteConfig } from "@/types/config";

/**
 * Central configuration for the entire site. To reuse this architecture for
 * a different residential project, only this file (plus /public media and
 * .env values) needs to change — no component should ever hardcode
 * project-specific content.
 */
export const siteConfig: SiteConfig = {
  projectName: "طيبة 109",
  projectStatus: "تحت الإنشاء",
  projectType: "مشروع سكني",
  projectDescription:
    "مشروع سكني يضم وحدات سكنية متنوعة تشمل شققًا ودوبلكسات بمساحات وتصاميم مختلفة.",
  unitsCount: 14,
  language: "ar",
  direction: "rtl",

  colors: {
    navy: "#071A2B",
    deepNavy: "#04111D",
    luxuryNavy: "#0B2238",
    gold: "#C9A45C",
    darkGold: "#9E7835",
    lightGold: "#E2CC9B",
    background: "#F8F6F0",
    white: "#FFFFFF",
    text: "#151A1F",
    muted: "#66707A",
    border: "#DED8CC",
  },

  // Not provided yet — intentionally left empty rather than invented.
  contact: {
    whatsapp: "",
    phone: "",
  },

  location: {
    googleMapsUrl: "",
    googleMapsEmbedUrl: "",
    coordinates: { lat: null, lng: null },
    landmarks: [
      { id: "taiba-park", name: "حديقة طيبة", distance: "800 متر" },
      { id: "khurais-road", name: "طريق الخرج", distance: "2.8 كم" },
      { id: "aljeel-schools", name: "مدارس الجيل العالمية", distance: "3 كم" },
      { id: "rabiah-hospital", name: "مستشفى رابية", distance: "3.5 كم" },
      { id: "arafat-road", name: "طريق عرفات", distance: "4 كم" },
      { id: "khurais-housing", name: "إسكان طريق الخرج", distance: "4 كم" },
      { id: "dar-albaida-exit", name: "مخرج الدار البيضاء", distance: "5 كم" },
      { id: "aziziyah-exit", name: "مخرج العزيزية", distance: "15 كم" },
    ],
    districts: [
      { id: "dar-albaida", name: "حي الدار البيضاء", distance: "8 كم" },
      { id: "alshifa", name: "حي الشفا", distance: "21 كم" },
      { id: "alsuli", name: "حي السلي", distance: "25 كم" },
    ],
  },

  streetWidths: [
    { id: "residential", value: "15 / 18م", label: "شوارع الأراضي السكنية" },
    { id: "residential-commercial", value: "30 / 36م", label: "شوارع الأراضي السكنية التجارية" },
    { id: "commercial", value: "60م", label: "الشوارع التجارية" },
  ],

  facilities: [
    { id: "health", label: "مرفق صحي", icon: "cross" },
    { id: "police", label: "مركز شرطة", icon: "shield" },
    { id: "park", label: "حديقة", icon: "trees" },
    { id: "education", label: "مجمع تعليمي", icon: "graduation-cap" },
    { id: "civil-defense", label: "دفاع مدني", icon: "flame" },
  ],

  infrastructure: [
    { id: "sewage", label: "شبكة صرف صحي", icon: "waves" },
    { id: "water", label: "شبكة مياه", icon: "droplet" },
    { id: "electricity", label: "شبكة كهرباء", icon: "zap" },
    { id: "telephone", label: "شبكة هاتف", icon: "phone" },
    { id: "lighting", label: "إنارة", icon: "lamp" },
    { id: "drainage", label: "تصريف سيول", icon: "cloud-rain" },
  ],

  warranties: [
    { id: "electrical", years: 2, label: "ضمان أعمال الكهرباء" },
    { id: "plumbing", years: 2, label: "ضمان أعمال السباكة" },
    { id: "cooperative-insurance", years: 10, label: "تأمين تعاوني" },
  ],

  // Not provided yet — the UI must never fabricate a percentage.
  constructionProgress: null,

  nav: [
    { href: "#hero", label: "الرئيسية" },
    { href: "#editorial", label: "عن المشروع" },
    { href: "#units", label: "الوحدات" },
    { href: "#location", label: "الموقع" },
    { href: "#warranties", label: "الضمانات" },
  ],

  hero: {
    eyebrow: "مشروع سكني تحت الإنشاء",
    title: "طيبة 109",
    supportingStatement: ["سكن يجمع الخصوصية،", "المساحة، والموقع."],
    unitsLine: "14 وحدة سكنية بتصاميم متنوعة",
    pricingHighlight: "تبدأ من 300,000 ريال",
    ctaPrimary: "استكشف الوحدات",
    ctaSecondary: "تواصل معنا",
    image: "/images/hero/hero.svg",
  },

  editorialIntro: {
    number: "01",
    title: ["أكثر من وحدة سكنية.", "مساحة لحياة كاملة."],
    description:
      "مشروع سكني تحت الإنشاء يضم 14 وحدة سكنية بتصاميم متنوعة، توفر مساحات عملية وخصوصية عالية، مع خدمات وبنية تحتية متكاملة ومرافق متنوعة داخل المخطط، إضافة إلى قربه من الطرق الرئيسية والخدمات الحيوية.",
  },

  projectNumbers: [
    { id: "units", value: 14, label: "وحدة سكنية" },
    { id: "starting-price", value: 300, suffix: "K", label: "ريال — تبدأ الأسعار" },
    { id: "duplex-area", value: 250, suffix: "م²", label: "مساحة الدوبلكس" },
    { id: "roof-area", value: 150, suffix: "م²", label: "مساحات الأسطح تصل إلى" },
    { id: "insurance-years", value: 10, label: "سنوات تأمين تعاوني" },
  ],

  unitTypes: {
    apartment: {
      label: "الشقق",
      startingPrice: 300_000,
      area: null,
      features: [
        "مدخل خاص ومستقل",
        "مجلس رجال مستقل",
        "دورة مياه للمجلس",
        "صالة معيشة واسعة",
        "مطبخ",
        "غرفة ماستر مع دورة مياه خاصة",
        "سطح مستقل لبعض الوحدات",
      ],
      highlight: "أسطح تصل إلى 150م²",
      floorPlans: [
        {
          id: "apartment-layout",
          label: "مخطط الشقة",
          image: "/images/floor-plans/apartment.svg",
          features: ["مجلس رجال", "صالة معيشة", "مطبخ", "2 غرفة نوم", "2 دورة مياه", "سطح مستقل"],
        },
      ],
    },
    duplex: {
      label: "الدوبلكسات",
      startingPrice: 700_000,
      area: 250,
      features: ["دورين", "ملحق خارجي", "مجلس رجال", "مقلط رجال", "صالة معيشة", "مطبخ", "3 غرف ماستر", "دورات مياه خاصة"],
      highlight: "250م² على دورين",
      floorPlans: [
        {
          id: "first",
          label: "الدور الأول",
          image: "/images/floor-plans/duplex-first.svg",
          features: ["ملحق خارجي", "مجلس رجال", "مقلط رجال", "صالة معيشة واسعة", "مطبخ", "غرفة ماستر", "دورة مياه خاصة", "دورة مياه إضافية"],
        },
        {
          id: "second",
          label: "الدور الثاني",
          image: "/images/floor-plans/duplex-second.svg",
          features: ["2 غرفة نوم ماستر", "دورات مياه خاصة", "دورة مياه إضافية", "صالة معيشة"],
        },
      ],
    },
  },

  privacy: {
    title: ["الخصوصية ليست تفصيلًا.", "إنها جزء من التصميم."],
    highlights: ["مدخل خاص ومستقل", "مجلس رجال مستقل", "أسطح مستقلة لبعض الوحدات"],
    image: "/images/gallery/privacy.svg",
  },

  marketing: {
    mainMessage: "طيبة 109 — سكن يجمع الخصوصية، المساحة، والموقع",
    supportingMessage:
      "مشروع سكني تحت الإنشاء يضم 14 وحدة سكنية بتصاميم متنوعة، توفر مساحات عملية وخصوصية عالية، مع خدمات وبنية تحتية متكاملة ومرافق متنوعة داخل المخطط، إضافة إلى قربه من الطرق الرئيسية والخدمات الحيوية.",
    pricingMessage: "خيارات سكنية تبدأ من 300,000 ريال، مع وحدات دوبلكس بمساحات تصل إلى 250م².",
  },

  seo: {
    title: "طيبة 109 | سكن يجمع الخصوصية، المساحة، والموقع",
    description:
      "مشروع سكني تحت الإنشاء يضم 14 وحدة سكنية بتصاميم متنوعة، توفر مساحات عملية وخصوصية عالية، مع خدمات وبنية تحتية متكاملة ومرافق متنوعة داخل المخطط، إضافة إلى قربه من الطرق الرئيسية والخدمات الحيوية.",
    keywords: ["طيبة 109", "مشروع سكني الرياض", "شقق للبيع الرياض", "دوبلكس للبيع الرياض", "عقارات سكنية الرياض"],
    siteUrl: "https://taiba109.sa",
    ogImage: "/images/og/og-image.svg",
  },

  googleSheetId: process.env.GOOGLE_SHEET_ID ?? "",
  googleSheetRange: process.env.GOOGLE_SHEET_RANGE ?? "Units!A2:J100",
};
