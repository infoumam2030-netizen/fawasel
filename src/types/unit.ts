export type UnitStatus = "available" | "reserved" | "sold";

export interface Unit {
  id: string;
  status: UnitStatus;
  area: number;
  price: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  roofArea: number;
  image: string;
  pdfUrl: string | null;
}

export interface UnitFilters {
  search: string;
  status: UnitStatus | "all";
  minPrice: number | null;
  maxPrice: number | null;
  minArea: number | null;
  maxArea: number | null;
  sortBy: "price-asc" | "price-desc" | "area-asc" | "area-desc" | "id-asc";
  availableOnly: boolean;
}

export interface AvailabilityStats {
  totalUnits: number;
  available: number;
  reserved: number;
  sold: number;
  startingPrice: number;
  averageArea: number;
  salesProgressPercent: number;
}
