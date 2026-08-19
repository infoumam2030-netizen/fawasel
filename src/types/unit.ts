export type UnitType = "apartment" | "duplex";
export type UnitStatus = "available" | "reserved" | "sold";

export interface Unit {
  id: string;
  name: string;
  type: UnitType;
  area: number;
  price: number;
  status: UnitStatus;
  floor: string | null;
  features: string[];
  images: string[];
  floorPlan: string | null;
}

export interface UnitTypeSummary {
  type: UnitType;
  label: string;
  count: number;
  startingPrice: number;
  area: number | null;
}
