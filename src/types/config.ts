export interface NavLink {
  href: string;
  label: string;
}

export interface DistanceItem {
  id: string;
  name: string;
  distance: string;
}

export interface StreetWidth {
  id: string;
  value: string;
  label: string;
}

export interface FacilityItem {
  id: string;
  label: string;
  icon: string;
}

export interface WarrantyItem {
  id: string;
  years: number;
  label: string;
}

export interface FloorPlanEntry {
  id: string;
  label: string;
  image: string;
  features: string[];
}

export interface UnitTypeInfo {
  label: string;
  startingPrice: number;
  area: number | null;
  features: string[];
  highlight: string;
  floorPlans: FloorPlanEntry[];
}

export interface ProjectStat {
  id: string;
  value: number;
  suffix?: string;
  label: string;
}

export interface SiteConfig {
  projectName: string;
  projectStatus: string;
  projectType: string;
  projectDescription: string;
  unitsCount: number;
  language: "ar" | "en";
  direction: "rtl" | "ltr";

  colors: {
    navy: string;
    deepNavy: string;
    luxuryNavy: string;
    gold: string;
    darkGold: string;
    lightGold: string;
    background: string;
    white: string;
    text: string;
    muted: string;
    border: string;
  };

  contact: {
    whatsapp: string;
    phone: string;
  };

  location: {
    googleMapsUrl: string;
    googleMapsEmbedUrl: string;
    coordinates: { lat: number | null; lng: number | null };
    landmarks: DistanceItem[];
    districts: DistanceItem[];
  };

  streetWidths: StreetWidth[];

  facilities: FacilityItem[];
  infrastructure: FacilityItem[];

  warranties: WarrantyItem[];

  constructionProgress: number | null;

  nav: NavLink[];

  hero: {
    eyebrow: string;
    title: string;
    supportingStatement: string[];
    unitsLine: string;
    pricingHighlight: string;
    ctaPrimary: string;
    ctaSecondary: string;
    image: string;
  };

  editorialIntro: {
    number: string;
    title: string[];
    description: string;
  };

  projectNumbers: ProjectStat[];

  unitTypes: {
    apartment: UnitTypeInfo;
    duplex: UnitTypeInfo;
  };

  privacy: {
    title: string[];
    highlights: string[];
    image: string;
  };

  marketing: {
    mainMessage: string;
    supportingMessage: string;
    pricingMessage: string;
  };

  seo: {
    title: string;
    description: string;
    keywords: string[];
    siteUrl: string;
    ogImage: string;
  };

  googleSheetId: string;
  googleSheetRange: string;
}
