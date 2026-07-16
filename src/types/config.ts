export interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon: "instagram" | "twitter" | "tiktok" | "linkedin";
}

export interface NavLink {
  href: string;
  label: string;
}

export interface QuickStat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface CoreValue {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ChallengeItem {
  id: string;
  problem: string;
  problemDescription: string;
  solution: string;
  solutionDescription: string;
  icon: string;
}

export interface EcosystemNode {
  id: string;
  label: string;
  icon: string;
  angle: number;
}

export interface SolutionItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  metric?: string;
  metricLabel?: string;
}

export interface TechFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface IndustryItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface AppFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface DashboardMetric {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  trend: string;
  icon: string;
}

export interface JourneyStep {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  business: string;
  quote: string;
  avatarInitial: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface SiteConfig {
  companyName: string;
  companyNameEn: string;
  tagline: string;
  language: "ar" | "en";
  direction: "rtl" | "ltr";

  phoneNumber: string;
  email: string;
  address: string;

  colors: {
    navy: string;
    navyDeep: string;
    gold: string;
    white: string;
    softGray: string;
  };

  seo: {
    title: string;
    description: string;
    keywords: string[];
    siteUrl: string;
    ogImage: string;
  };

  nav: NavLink[];

  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scrollLabel: string;
  };

  story: {
    eyebrow: string;
    title: string;
    description: string;
    mission: string;
    vision: string;
    timeline: TimelineItem[];
    values: CoreValue[];
  };

  challenges: {
    eyebrow: string;
    title: string;
    description: string;
    items: ChallengeItem[];
  };

  ecosystem: {
    eyebrow: string;
    title: string;
    description: string;
    center: string;
    nodes: EcosystemNode[];
  };

  solutions: {
    eyebrow: string;
    title: string;
    description: string;
    items: SolutionItem[];
  };

  technology: {
    eyebrow: string;
    title: string;
    description: string;
    features: TechFeature[];
  };

  industries: {
    eyebrow: string;
    title: string;
    description: string;
    items: IndustryItem[];
  };

  mobileApp: {
    eyebrow: string;
    title: string;
    description: string;
    features: AppFeature[];
  };

  dashboard: {
    eyebrow: string;
    title: string;
    description: string;
    metrics: DashboardMetric[];
  };

  partnerJourney: {
    eyebrow: string;
    title: string;
    description: string;
    steps: JourneyStep[];
  };

  testimonials: {
    eyebrow: string;
    title: string;
    description: string;
    items: Testimonial[];
  };

  faq: {
    eyebrow: string;
    title: string;
    description: string;
    items: FaqItem[];
  };

  finalCta: {
    title: string;
    description: string;
    ctaLabel: string;
  };

  quickStats: QuickStat[];
  socialLinks: SocialLink[];
}
