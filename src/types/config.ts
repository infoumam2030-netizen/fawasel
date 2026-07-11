export interface LandmarkItem {
  id: string;
  name: string;
  duration: string;
  category: "mall" | "road" | "hospital" | "school" | "park" | "landmark" | "government" | "transit";
}

export interface WarrantyItem {
  id: string;
  years: number;
  label: string;
  description: string;
  icon: string;
}

export interface FloorPlan {
  id: string;
  name: string;
  image: string;
  features: string[];
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon: "instagram" | "twitter" | "snapchat" | "tiktok" | "linkedin";
}

export interface QuickStat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

export interface SiteConfig {
  projectName: string;
  projectTagline: string;
  developerName: string;
  exclusiveMarketerName: string;
  language: "ar" | "en";
  direction: "rtl" | "ltr";
  whatsappNumber: string;
  phoneNumber: string;
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
  coordinates: { lat: number; lng: number };
  address: string;
  colors: {
    primary: string;
    accent: string;
    hover: string;
    background: string;
    dark: string;
    gold: string;
    text: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    siteUrl: string;
    ogImage: string;
  };
  hero: {
    videoSrc: string;
    posterImage: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  about: {
    title: string;
    description: string;
    highlights: string[];
  };
  quickStats: QuickStat[];
  gallery: GalleryImage[];
  floorPlans: FloorPlan[];
  warrantyItems: WarrantyItem[];
  landmarks: LandmarkItem[];
  socialLinks: SocialLink[];
  googleSheetId: string;
  googleSheetRange: string;
}
