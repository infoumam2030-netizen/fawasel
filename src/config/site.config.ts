import type { SiteConfig } from "@/types/config";

/**
 * Central configuration for the entire site.
 * To reuse this template for a different real-estate project, only this
 * file (plus /public media assets and .env values) needs to change —
 * no component or page should ever hardcode project-specific content.
 */
export const siteConfig: SiteConfig = {
  projectName: "تاون هاوس القادسية",
  projectTagline: "ميني كومباوند خاص شمال شرق الرياض",
  developerName: "فواصل المستقبل",
  exclusiveMarketerName: "أمم العقارية",
  language: "ar",
  direction: "rtl",

  whatsappNumber: "+966556278284",
  phoneNumber: "+966556278284",
  googleMapsUrl: "https://maps.app.goo.gl/q8jxefQBTWEWtmMz8?g_st=ic",
  googleMapsEmbedUrl:
    "https://www.google.com/maps?q=24.8076,46.8257&hl=ar&z=15&output=embed",
  coordinates: { lat: 24.8076, lng: 46.8257 },
  address: "شمال شرق الرياض، بين أحياء القادسية وإشبيلية والرماية",

  colors: {
    primary: "#6B4FA1",
    accent: "#7C5BCB",
    hover: "#9370DB",
    background: "#F8F6FC",
    dark: "#111111",
    gold: "#C9A55C",
    text: "#2A2A2A",
  },

  seo: {
    title: "تاون هاوس القادسية | فواصل المستقبل — بدأ البيع الآن",
    description:
      "تاون هاوس القادسية من فواصل المستقبل — ميني كومباوند خاص من 18 وحدة فاخرة شمال شرق الرياض، بمساحات تبدأ من 210م وسطحين خاصين وموقفين بالقبو. تسليم فوري وأسعار تبدأ من 1,330,000 ريال.",
    keywords: [
      "تاون هاوس القادسية",
      "فواصل المستقبل",
      "تاون هاوس الرياض",
      "عقارات الرياض",
      "ميني كومباوند",
      "أمم العقارية",
      "تاون هاوس شمال الرياض",
    ],
    siteUrl: "https://fawaseel-alqadisiyah.sa",
    ogImage: "/images/og-image.svg",
  },

  hero: {
    videoSrc: "/videos/hero-drone.mp4",
    posterImage: "/images/hero-poster.svg",
    title: "تاون هاوس القادسية",
    subtitle: "بدأ البيع الآن",
    ctaPrimary: "استفسر الآن",
    ctaSecondary: "تصفح الوحدات",
  },

  about: {
    title: "فواصل المستقبل — ميني كومباوند خاص بخصوصية استثنائية",
    description:
      "مشروع تاون هاوس القادسية ميني كومباوند خاص مكوّن من 18 وحدة تاون هاوس بتصميم موحّد داخل كومباوند خاص يوفّر مستوى أمان وخصوصية أعلى من المشاريع المفتوحة. كل وحدة مكوّنة من 3 طوابق مع قبو خاص بموقفين للسيارات، وتتميّز بسطحين منفصلين ومساحات خضراء داخلية ومشتركة، مع سكاي لايت في كل وحدة يضمن إضاءة وتهوية طبيعية مستمرة.",
    highlights: [
      "18 وحدة تاون هاوس فقط ضمن كومباوند خاص",
      "3 طوابق + قبو خاص بموقفين لكل وحدة",
      "سطحان منفصلان بمساحة 34م و18م",
      "سكاي لايت لإضاءة وتهوية طبيعية دائمة",
      "مساحات خضراء داخلية ومشتركة",
      "تسليم فوري بدون انتظار",
    ],
  },

  quickStats: [
    { id: "units", label: "وحدة تاون هاوس", value: 18 },
    { id: "floors", label: "طوابق لكل وحدة", value: 3 },
    { id: "parking", label: "موقف سيارة بالقبو", value: 2 },
    { id: "roofs", label: "سطح لكل وحدة", value: 2 },
    { id: "area", label: "مساحة الوحدة", value: 210, suffix: "م+" },
    { id: "delivery", label: "موعد التسليم", value: 0, prefix: "فوري" },
  ],

  gallery: [
    { id: "g1", src: "/images/gallery/exterior-1.svg", alt: "الواجهة الخارجية لتاون هاوس القادسية" },
    { id: "g2", src: "/images/gallery/exterior-2.svg", alt: "مدخل الكومباوند الخاص" },
    { id: "g3", src: "/images/gallery/majlis.svg", alt: "المجلس بتشطيب مودرن فاخر" },
    { id: "g4", src: "/images/gallery/living.svg", alt: "الصالة الرئيسية" },
    { id: "g5", src: "/images/gallery/master.svg", alt: "غرفة الماستر مع الدريسنج" },
    { id: "g6", src: "/images/gallery/rooftop.svg", alt: "السطح العلوي المفتوح" },
    { id: "g7", src: "/images/gallery/skylight.svg", alt: "فتحة السكاي لايت الداخلية" },
    { id: "g8", src: "/images/gallery/night.svg", alt: "إضاءة المشروع الليلية" },
  ],

  floorPlans: [
    {
      id: "ground",
      name: "الدور الأرضي",
      image: "/images/floor-plans/ground-floor.svg",
      features: ["مجلس رجال مستقل", "صالة معيشة واسعة", "مطبخ مفتوح", "دورة مياه ضيوف", "موقفان بالقبو"],
    },
    {
      id: "first",
      name: "الدور الأول",
      image: "/images/floor-plans/first-floor.svg",
      features: ["4 غرف نوم", "غرفة ماستر مع دريسنج", "5 دورات مياه", "سكاي لايت مركزي"],
    },
    {
      id: "penthouse",
      name: "السطح العلوي",
      image: "/images/floor-plans/penthouse.svg",
      features: ["سطح أول بمساحة 34م", "سطح ثاني بمساحة 18م", "جلسة عائلية خارجية", "مساحة مفتوحة قابلة للتخصيص"],
    },
  ],

  warrantyItems: [
    { id: "green-pipes", years: 50, label: "المواسير الخضراء", description: "ضمان ممتد على شبكة المواسير الخضراء", icon: "pipette" },
    { id: "electrical", years: 25, label: "الكهرباء", description: "ضمان شامل على التمديدات الكهربائية", icon: "zap" },
    { id: "tanks", years: 15, label: "الخزانات", description: "ضمان على خزانات المياه", icon: "database" },
    { id: "aluminium", years: 15, label: "الألمنيوم", description: "ضمان على أعمال الألمنيوم والنوافذ", icon: "layout-panel-top" },
    { id: "hidden-defect", years: 10, label: "تأمين العيوب الخفية", description: "تأمين ضد العيوب الإنشائية الخفية", icon: "shield-check" },
    { id: "insulation", years: 10, label: "العزل المائي والحراري", description: "ضمان على العزل المائي والحراري", icon: "thermometer" },
    { id: "doors", years: 10, label: "الأبواب", description: "ضمان على جميع الأبواب الداخلية والخارجية", icon: "door-closed" },
    { id: "elevator", years: 10, label: "المصعد", description: "ضمان على المصعد وتشغيله", icon: "arrow-up-down" },
    { id: "smart-home", years: 10, label: "المنزل الذكي", description: "ضمان على أنظمة المنزل الذكي", icon: "smartphone" },
    { id: "lighting", years: 5, label: "الإضاءة", description: "ضمان على وحدات الإضاءة", icon: "lightbulb" },
    { id: "grohe", years: 5, label: "خلاطات GROHE", description: "ضمان على خلاطات ومستلزمات GROHE", icon: "droplets" },
    { id: "general", years: 1, label: "الضمان العام", description: "ضمان عام شامل على جميع أعمال الوحدة", icon: "badge-check" },
  ],

  landmarks: [
    { id: "imam-saud-road", name: "طريق الإمام سعود", duration: "دقيقة واحدة", category: "road" },
    { id: "jaber-road", name: "طريق جابر", duration: "دقيقة واحدة", category: "road" },
    { id: "admin-complex", name: "المجمع الإداري الحكومي", duration: "دقيقتان", category: "government" },
    { id: "stadium", name: "استاد ومدينة الملك فهد الرياضية", duration: "3 دقائق", category: "landmark" },
    { id: "northern-ring", name: "الدائري الشمالي", duration: "5 دقائق", category: "road" },
    { id: "khurais-road", name: "طريق خريص", duration: "7 دقائق", category: "road" },
    { id: "granada-mall", name: "غرناطة مول", duration: "13 دقيقة", category: "mall" },
    { id: "nakheel-mall", name: "النخيل مول", duration: "15 دقيقة", category: "mall" },
    { id: "imam-saud-university", name: "جامعة الإمام سعود", duration: "15 دقيقة", category: "school" },
    { id: "kafd", name: "المدينة المالية (كافد)", duration: "20 دقيقة", category: "landmark" },
    { id: "sar-train", name: "محطة قطار سار", duration: "20 دقيقة", category: "transit" },
    { id: "family-care", name: "مستشفى Family Care", duration: "على بعد دقائق", category: "hospital" },
    { id: "national-guard-hospital", name: "مستشفى الحرس الوطني", duration: "حي الرماية القريب", category: "hospital" },
    { id: "schools", name: "مدارس أهلية ودولية", duration: "حي إشبيلية", category: "school" },
    { id: "muhaizila-park", name: "حديقة المعيزلة", duration: "قريبة", category: "park" },
    { id: "khaleej-park", name: "حديقة الخليج", duration: "قريبة", category: "park" },
  ],

  socialLinks: [
    { id: "instagram", label: "إنستقرام", url: "#", icon: "instagram" },
    { id: "twitter", label: "إكس", url: "#", icon: "twitter" },
    { id: "snapchat", label: "سناب شات", url: "#", icon: "snapchat" },
    { id: "tiktok", label: "تيك توك", url: "#", icon: "tiktok" },
  ],

  googleSheetId: process.env.GOOGLE_SHEET_ID ?? "",
  googleSheetRange: process.env.GOOGLE_SHEET_RANGE ?? "Units!A2:J100",
};
