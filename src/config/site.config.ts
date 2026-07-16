import type { SiteConfig } from "@/types/config";

/**
 * Central configuration for the MY CAR CARD corporate/partner website.
 * All copy, content, and brand data lives here — components stay
 * presentation-only so the site can be re-skinned without touching JSX.
 */
export const siteConfig: SiteConfig = {
  companyName: "ماي كار كارد",
  companyNameEn: "MY CAR CARD",
  tagline: "منظومة رقمية ذكية لخدمات السيارات في المملكة",
  language: "ar",
  direction: "rtl",

  phoneNumber: "+966500000000",
  email: "partners@mycarcard.sa",
  address: "الرياض، المملكة العربية السعودية",

  colors: {
    navy: "#0A0F3D",
    navyDeep: "#060920",
    gold: "#F5B731",
    white: "#FFFFFF",
    softGray: "#EEF2F7",
  },

  seo: {
    title: "MY CAR CARD | منظومة السيارات الذكية في السعودية",
    description:
      "MY CAR CARD شركة تقنية سعودية تبني منظومة رقمية متكاملة تربط ملاك السيارات بمزودي الخدمات عبر منصة ذكية واحدة — حجز، تتبع، مدفوعات، وتحليلات في مكان واحد.",
    keywords: [
      "MY CAR CARD",
      "ماي كار كارد",
      "منصة خدمات سيارات",
      "تقنية سيارات السعودية",
      "شركاء صيانة السيارات",
      "رؤية السعودية 2030",
      "منصة حجز خدمات السيارات",
    ],
    siteUrl: "https://mycarcard.sa",
    ogImage: "/images/og-image.svg",
  },

  nav: [
    { href: "#ecosystem", label: "المنصة" },
    { href: "#solutions", label: "الحلول" },
    { href: "#technology", label: "التقنية" },
    { href: "#industries", label: "القطاعات" },
    { href: "#partner-journey", label: "الشراكة" },
    { href: "#story", label: "من نحن" },
  ],

  hero: {
    eyebrow: "منظومة سعودية لتقنية السيارات",
    title: "مستقبل خدمات السيارات",
    highlight: "يبدأ من هنا",
    subtitle:
      "منصة ذكية واحدة تربط ملاك السيارات بمزودي الخدمة المعتمدين — حجز فوري، أسعار شفافة، تتبع مباشر، ومنظومة رقمية متكاملة مبنية لتقود التحول الرقمي في قطاع خدمات السيارات بالمملكة.",
    ctaPrimary: "كن شريكاً",
    ctaSecondary: "استكشف المنصة",
    scrollLabel: "مرّر للأسفل",
  },

  story: {
    eyebrow: "قصتنا",
    title: "لماذا وُجدت MY CAR CARD",
    description:
      "وُلدت MY CAR CARD من ملاحظة بسيطة: قطاع خدمات السيارات في المملكة ضخم ومتنامٍ، لكنه ما زال يُدار بأدوات الأمس — اتصالات متفرقة، أسعار غير موحدة، ومتابعة يدوية بلا شفافية. رأينا فرصة لبناء الجسر الرقمي الذي يربط كل طرف في هذه المنظومة: مالك السيارة، ومزوّد الخدمة، والسوق ككل.",
    mission:
      "توحيد منظومة خدمات السيارات في السعودية ضمن منصة رقمية واحدة تُبنى على الشفافية والسرعة والثقة، وتمكّن كل مزوّد خدمة من النمو رقمياً بأدوات احترافية.",
    vision:
      "أن نكون الشبكة الذكية الأولى لخدمات السيارات في المملكة، ورافداً حقيقياً للتحوّل الرقمي ضمن مستهدفات رؤية السعودية 2030.",
    timeline: [
      {
        id: "idea",
        year: "01",
        title: "الفكرة",
        description: "رصدنا الفجوة الرقمية في قطاع خدمات السيارات وبدأنا تصميم منظومة تحل جذور المشكلة لا أعراضها.",
      },
      {
        id: "build",
        year: "02",
        title: "البناء",
        description: "بنينا بنية تقنية سحابية قابلة للتوسع تربط الحجز والمدفوعات والتتبع في نظام واحد موحّد.",
      },
      {
        id: "launch",
        year: "03",
        title: "الإطلاق",
        description: "أطلقنا التطبيق والمنصة لأول شركاء الخدمة، مع تجربة استخدام مصمّمة بمعايير عالمية.",
      },
      {
        id: "scale",
        year: "04",
        title: "التوسع",
        description: "نتوسّع اليوم عبر مدن المملكة، ونبني شبكة شراكات تغطي كل قطاعات خدمات السيارة.",
      },
    ],
    values: [
      { id: "transparency", title: "الشفافية", description: "أسعار واضحة وبيانات دقيقة لكل الأطراف دون غموض.", icon: "eye" },
      { id: "innovation", title: "الابتكار", description: "تقنية حديثة تُعيد تصميم تجربة خدمات السيارات من الصفر.", icon: "sparkles" },
      { id: "trust", title: "الثقة", description: "شركاء معتمدون وبيانات محمية وعمليات موثوقة من البداية للنهاية.", icon: "shield-check" },
      { id: "partnership", title: "الشراكة", description: "نجاح شركائنا هو مقياس نجاحنا — نبني أدوات تنمّي أعمالهم فعلياً.", icon: "handshake" },
    ],
  },

  challenges: {
    eyebrow: "تحديات السوق",
    title: "السوق يحتاج تحوّلاً رقمياً حقيقياً",
    description: "خمسة تحديات جوهرية تواجه قطاع خدمات السيارات اليوم — وكيف تحلّها MY CAR CARD.",
    items: [
      {
        id: "pricing",
        problem: "أسعار غير موحدة",
        problemDescription: "تفاوت كبير في أسعار نفس الخدمة بين مراكز مختلفة دون معيار واضح.",
        solution: "أسعار شفافة وموحدة",
        solutionDescription: "مقارنة فورية وأسعار معروضة بوضوح قبل الحجز مباشرة.",
        icon: "tag",
      },
      {
        id: "booking",
        problem: "حجز يدوي ومرهق",
        problemDescription: "اتصالات متكررة وانتظار طويل لتأكيد موعد بسيط.",
        solution: "حجز ذكي فوري",
        solutionDescription: "حجز الخدمة خلال ثوانٍ من الجوال، بلا مكالمات ولا انتظار.",
        icon: "calendar-check",
      },
      {
        id: "transparency",
        problem: "غياب الشفافية",
        problemDescription: "لا وضوح في تفاصيل العروض أو حالة الخدمة أثناء التنفيذ.",
        solution: "شفافية كاملة",
        solutionDescription: "تفاصيل دقيقة لكل عرض وكل خطوة من رحلة الخدمة.",
        icon: "eye",
      },
      {
        id: "tracking",
        problem: "لا متابعة للطلب",
        problemDescription: "صعوبة معرفة حالة السيارة أو مرحلة تنفيذ الخدمة بعد الحجز.",
        solution: "تتبع لحظي مباشر",
        solutionDescription: "متابعة حالة الطلب لحظة بلحظة من الحجز حتى التسليم.",
        icon: "radar",
      },
      {
        id: "platform",
        problem: "منظومة مجزّأة",
        problemDescription: "كل مزوّد خدمة يعمل بمعزل — بلا ربط، بلا بيانات، بلا نمو رقمي.",
        solution: "منصة موحدة متكاملة",
        solutionDescription: "نظام واحد يربط الحجز والدفع والتحليلات لكل الأطراف.",
        icon: "network",
      },
    ],
  },

  ecosystem: {
    eyebrow: "منظومة المنصة",
    title: "كل شيء متصل في مركز واحد",
    description: "MY CAR CARD ليست تطبيقاً — إنها منظومة تقنية متكاملة تربط عشر ركائز رقمية في نظام واحد ذكي.",
    center: "MY CAR CARD",
    nodes: [
      { id: "booking", label: "الحجز", icon: "calendar-check", angle: 0 },
      { id: "partners", label: "الشركاء", icon: "handshake", angle: 36 },
      { id: "crm", label: "إدارة العملاء", icon: "users", angle: 72 },
      { id: "tracking", label: "التتبع", icon: "radar", angle: 108 },
      { id: "payments", label: "المدفوعات", icon: "credit-card", angle: 144 },
      { id: "analytics", label: "التحليلات", icon: "bar-chart-3", angle: 180 },
      { id: "notifications", label: "الإشعارات", icon: "bell", angle: 216 },
      { id: "offers", label: "العروض", icon: "percent", angle: 252 },
      { id: "app", label: "تطبيق الجوال", icon: "smartphone", angle: 288 },
      { id: "api", label: "API", icon: "plug-zap", angle: 324 },
    ],
  },

  solutions: {
    eyebrow: "الحلول",
    title: "حلول تقنية لكل طرف في المنظومة",
    description: "منظومة أدوات احترافية مصمّمة لتشغيل أعمال خدمات السيارات رقمياً بالكامل.",
    items: [
      { id: "smart-booking", title: "حجز ذكي", description: "نظام حجز فوري يقلّل زمن الانتظار ويوزّع الطلبات تلقائياً.", icon: "calendar-check", metric: "أقل من دقيقتين", metricLabel: "متوسط زمن الحجز" },
      { id: "digital-offers", title: "عروض رقمية", description: "إدارة العروض والخصومات بصلاحيات مرنة وتحديث لحظي.", icon: "percent" },
      { id: "partner-dashboard", title: "لوحة الشريك", description: "لوحة تحكم شاملة لإدارة الطلبات والفريق والإيرادات.", icon: "layout-dashboard" },
      { id: "customer-tracking", title: "تتبع العملاء", description: "رؤية كاملة لرحلة كل عميل من الحجز حتى ما بعد الخدمة.", icon: "radar" },
      { id: "notifications", title: "إشعارات فورية", description: "تنبيهات آنية للعميل والشريك عند كل تحديث في الطلب.", icon: "bell" },
      { id: "mobile-services", title: "خدمات متنقلة", description: "دعم كامل لنماذج الخدمة المتنقلة خارج مقر المركز.", icon: "car-front" },
      { id: "reports", title: "تقارير تفصيلية", description: "تقارير أداء دورية تدعم اتخاذ القرار وتحسين التشغيل.", icon: "file-bar-chart" },
      { id: "analytics", title: "تحليلات متقدمة", description: "بيانات لحظية عن الطلب والإيراد وسلوك العملاء.", icon: "bar-chart-3" },
      { id: "payments", title: "مدفوعات آمنة", description: "تحصيل إلكتروني موثوق مع تسويات مالية شفافة.", icon: "credit-card" },
    ],
  },

  technology: {
    eyebrow: "البنية التقنية",
    title: "هندسة تقنية بمعايير عالمية",
    description: "بنية تحتية سحابية آمنة وقابلة للتوسع، مصمّمة لتخدم آلاف الشركاء والعملاء في آنٍ واحد.",
    features: [
      { id: "cloud", title: "بنية سحابية", description: "استضافة سحابية موزّعة تضمن أداءً مستقراً وتوفراً دائماً.", icon: "cloud" },
      { id: "ai", title: "جاهزية الذكاء الاصطناعي", description: "بنية بيانات جاهزة لتشغيل التوصيات والتسعير الذكي مستقبلاً.", icon: "brain-circuit" },
      { id: "realtime", title: "تتبع لحظي", description: "تحديثات حيّة لحالة الطلب عبر بنية أحداث لحظية.", icon: "radar" },
      { id: "secure-payments", title: "مدفوعات آمنة", description: "تشفير من طرف إلى طرف يتوافق مع أعلى معايير الأمان المالي.", icon: "lock" },
      { id: "api", title: "تكامل عبر API", description: "واجهات برمجية مفتوحة لربط أنظمة الشركاء الحالية بسهولة.", icon: "plug-zap" },
      { id: "scalable", title: "بنية قابلة للتوسع", description: "معمارية مرنة تنمو مع نمو الشبكة دون أي تأثير على الأداء.", icon: "layers" },
    ],
  },

  industries: {
    eyebrow: "من يمكنه الانضمام",
    title: "منصة تخدم كل قطاعات خدمات السيارة",
    description: "مصمّمة لتشمل كل مزوّدي خدمات السيارات في المملكة — أياً كان تخصصهم.",
    items: [
      { id: "maintenance", title: "مراكز الصيانة", description: "صيانة دورية وإصلاحات ميكانيكية شاملة.", icon: "wrench" },
      { id: "carwash", title: "غسيل السيارات", description: "غسيل احترافي وتلميع متكامل.", icon: "droplets" },
      { id: "tires", title: "الإطارات", description: "تركيب وتبديل وفحص الإطارات.", icon: "circle-dot" },
      { id: "batteries", title: "البطاريات", description: "فحص وتركيب وتبديل البطاريات.", icon: "battery-charging" },
      { id: "inspection", title: "الفحص الدوري", description: "فحص شامل ودقيق لجميع أجزاء السيارة.", icon: "clipboard-check" },
      { id: "detailing", title: "العناية والتلميع", description: "عناية تفصيلية داخلية وخارجية بمعايير فاخرة.", icon: "sparkles" },
      { id: "body-repair", title: "إصلاح الهيكل", description: "إصلاح الخدوش والدهانات بدقة عالية.", icon: "hammer" },
      { id: "mobile", title: "الخدمات المتنقلة", description: "خدمات ميدانية تصل إلى العميل أينما كان.", icon: "car-front" },
    ],
  },

  mobileApp: {
    eyebrow: "جزء من المنظومة",
    title: "تطبيق الجوال — واجهة العميل في المنظومة",
    description: "تطبيق ماي كار كارد هو نافذة العميل على المنصة، مبني بنفس معايير التقنية والتصميم لكامل المنظومة.",
    features: [
      { id: "track", title: "تتبع لحظي للطلب", description: "معرفة دقيقة بمرحلة تنفيذ الخدمة في الوقت الفعلي.", icon: "radar" },
      { id: "notify", title: "إشعارات فورية", description: "تنبيه آني عند كل تحديث في حالة الطلب.", icon: "bell" },
      { id: "chat", title: "تواصل مباشر", description: "تواصل مباشر مع مزوّد الخدمة من داخل التطبيق.", icon: "message-circle" },
      { id: "history", title: "سجل كامل للطلبات", description: "أرشيف كامل لتاريخ خدمات السيارة في مكان واحد.", icon: "history" },
    ],
  },

  dashboard: {
    eyebrow: "لوحة الأعمال",
    title: "رؤية كاملة لأعمالك من لوحة واحدة",
    description: "لوحة تحكم للشركاء تعرض الحجوزات والإيرادات ورضا العملاء لحظياً.",
    metrics: [
      { id: "bookings", label: "الحجوزات الشهرية", value: 42500, trend: "+18%", icon: "calendar-check" },
      { id: "partners", label: "شركاء نشطون", value: 860, trend: "+24%", icon: "handshake" },
      { id: "revenue", label: "الإيرادات المُدارة", value: 31, suffix: " مليون ﷼", trend: "+32%", icon: "trending-up" },
      { id: "satisfaction", label: "رضا العملاء", value: 97, suffix: "%", trend: "+4%", icon: "star" },
    ],
  },

  partnerJourney: {
    eyebrow: "رحلة الشريك",
    title: "من التسجيل إلى النمو في ست خطوات",
    description: "مسار واضح وسريع لانضمام أي مزوّد خدمة إلى منظومة MY CAR CARD.",
    steps: [
      { id: "join", step: 1, title: "كن شريكاً", description: "سجّل بيانات نشاطك التجاري خلال دقائق.", icon: "user-plus" },
      { id: "activate", step: 2, title: "فعّل حسابك", description: "اعتماد الحساب وإعداد الخدمات والأسعار.", icon: "shield-check" },
      { id: "receive", step: 3, title: "استقبل الحجوزات", description: "ابدأ استقبال طلبات العملاء مباشرة عبر المنصة.", icon: "inbox" },
      { id: "manage", step: 4, title: "أدر خدماتك", description: "تابع الطلبات وفريقك من لوحة تحكم واحدة.", icon: "layout-dashboard" },
      { id: "track", step: 5, title: "تتبع الأداء", description: "قِس أداءك التشغيلي ببيانات وتقارير دقيقة.", icon: "radar" },
      { id: "grow", step: 6, title: "نمِّ إيراداتك", description: "وسّع قاعدة عملائك وزد إيراداتك باستمرار.", icon: "trending-up" },
    ],
  },

  testimonials: {
    eyebrow: "قصص نجاح",
    title: "شركاؤنا يتحدثون",
    description: "تجارب حقيقية من مزوّدي خدمات انضموا إلى منظومة MY CAR CARD ونمّوا أعمالهم رقمياً.",
    items: [
      {
        id: "t1",
        name: "م. عبدالله الحربي",
        role: "المدير التنفيذي",
        business: "مركز الحربي للصيانة",
        quote: "منذ انضمامنا للمنصة تضاعف عدد حجوزاتنا الشهرية، والأهم أننا أصبحنا نرى بياناتنا بوضوح لأول مرة.",
        avatarInitial: "ع",
      },
      {
        id: "t2",
        name: "سارة القحطاني",
        role: "مالكة",
        business: "لمسة العناية لتلميع السيارات",
        quote: "لوحة التحكم غيّرت طريقة إدارتنا اليومية بالكامل. كل شيء منظم، وكل عميل يعرف بالضبط أين وصلت سيارته.",
        avatarInitial: "س",
      },
      {
        id: "t3",
        name: "فيصل العتيبي",
        role: "الشريك المؤسس",
        business: "مجموعة العتيبي للإطارات",
        quote: "المنصة ساعدتنا نوصل لعملاء جدد بدون أي تكلفة تسويق إضافية، والمدفوعات تتحصّل تلقائياً بثقة تامة.",
        avatarInitial: "ف",
      },
    ],
  },

  faq: {
    eyebrow: "الأسئلة الشائعة",
    title: "كل ما تحتاج معرفته",
    description: "إجابات عن أكثر الأسئلة شيوعاً حول الشراكة مع MY CAR CARD.",
    items: [
      { id: "f1", question: "كيف يمكن لمركز خدمة الانضمام كشريك؟", answer: "عبر تعبئة نموذج طلب الشراكة من الموقع أو التطبيق، وسيتواصل فريقنا لاستكمال إجراءات الاعتماد خلال أيام قليلة." },
      { id: "f2", question: "هل توجد رسوم اشتراك للانضمام؟", answer: "نموذج الشراكة مرن ويعتمد على نوع النشاط وحجمه — تواصل مع فريق الشراكات للحصول على تفاصيل الباقات." },
      { id: "f3", question: "هل يمكن ربط أنظمتنا الحالية بالمنصة؟", answer: "نعم، توفر المنصة واجهات API مفتوحة تتيح التكامل مع أنظمة إدارة المراكز والمحاسبة الحالية." },
      { id: "f4", question: "في أي مدن تعمل المنصة حالياً؟", answer: "نعمل حالياً في المدن الرئيسية بالمملكة ونتوسع باستمرار — تواصل معنا لمعرفة التغطية في مدينتك." },
      { id: "f5", question: "كيف تُدار المدفوعات بين الشريك والمنصة؟", answer: "تُحصّل المدفوعات إلكترونياً بشكل آمن، وتُسوّى المستحقات للشركاء دورياً عبر تقارير مالية شفافة." },
      { id: "f6", question: "ما نوع الدعم المقدّم للشركاء؟", answer: "فريق دعم مخصص للشركاء، إلى جانب تدريب على استخدام لوحة التحكم ومتابعة تشغيلية مستمرة." },
    ],
  },

  finalCta: {
    title: "انضم إلى الشبكة الذكية لخدمات السيارات في السعودية",
    description: "كن جزءاً من منظومة MY CAR CARD وابدأ رحلة النمو الرقمي لعملك اليوم.",
    ctaLabel: "كن شريكاً الآن",
  },

  quickStats: [
    { id: "partners", label: "شريك موثّق", value: 860, suffix: "+" },
    { id: "cities", label: "مدينة سعودية", value: 12, suffix: "+" },
    { id: "bookings", label: "حجز شهرياً", value: 42, suffix: "K+" },
    { id: "satisfaction", label: "رضا العملاء", value: 97, suffix: "%" },
  ],

  socialLinks: [
    { id: "instagram", label: "إنستقرام", url: "#", icon: "instagram" },
    { id: "twitter", label: "إكس", url: "#", icon: "twitter" },
    { id: "linkedin", label: "لينكدإن", url: "#", icon: "linkedin" },
    { id: "tiktok", label: "تيك توك", url: "#", icon: "tiktok" },
  ],
};
