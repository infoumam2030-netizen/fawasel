import { fetchSheetRows, type SheetRow } from "@/services/google-sheets";
import { siteConfig } from "@/config/site.config";
import type { Unit, UnitStatus, UnitType } from "@/types/unit";

const STATUS_MAP: Record<string, UnitStatus> = {
  available: "available",
  متاح: "available",
  متوفر: "available",
  reserved: "reserved",
  محجوز: "reserved",
  sold: "sold",
  مباع: "sold",
  "تم البيع": "sold",
};

const TYPE_MAP: Record<string, UnitType> = {
  apartment: "apartment",
  شقة: "apartment",
  شقق: "apartment",
  duplex: "duplex",
  دوبلكس: "duplex",
};

function normalizeStatus(raw: string | undefined): UnitStatus {
  if (!raw) return "available";
  return STATUS_MAP[raw.trim().toLowerCase()] ?? STATUS_MAP[raw.trim()] ?? "available";
}

function normalizeType(raw: string | undefined): UnitType {
  if (!raw) return "apartment";
  return TYPE_MAP[raw.trim().toLowerCase()] ?? TYPE_MAP[raw.trim()] ?? "apartment";
}

/**
 * Extracts a number from a raw cell value that may carry formatting —
 * thousands separators ("300,000") and/or a trailing currency label
 * ("300,000 ريال"). Only the leading digit/comma run (with an optional
 * decimal part directly attached) is treated as the number; any trailing
 * text after a space is ignored rather than corrupting the parse.
 */
function toNumber(raw: string | undefined, fallback = 0): number {
  if (!raw) return fallback;
  const match = raw.match(/[\d,]+(?:\.\d+)?/);
  if (!match) return fallback;
  const parsed = Number(match[0].replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : fallback;
}

function splitList(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Sheet columns, in order:
 * Unit ID | Name | Type (شقة/دوبلكس) | Area | Price | Status | Floor |
 * Features (";"-separated) | Images (";"-separated URLs) | Floor plan image URL
 */
function parseRow(row: SheetRow): Unit | null {
  const [id, name, type, area, price, status, floor, features, images, floorPlan] = row;
  if (!id) return null;

  const unitType = normalizeType(type);

  return {
    id: id.trim(),
    name: name?.trim() || id.trim(),
    type: unitType,
    area: toNumber(area, siteConfig.unitTypes[unitType].area ?? 0),
    price: toNumber(price, siteConfig.unitTypes[unitType].startingPrice),
    status: normalizeStatus(status),
    floor: floor?.trim() || null,
    features: splitList(features),
    images: splitList(images),
    floorPlan: floorPlan?.trim() || null,
  };
}

/**
 * Deterministic sample data (14 units: 10 apartments, 4 duplexes) used
 * whenever Google Sheets credentials are not configured, so the site
 * stays fully functional and demonstrable in local/demo environments.
 */
function generateFallbackUnits(): Unit[] {
  const apartmentStatuses: UnitStatus[] = [
    "sold", "sold",
    "reserved", "reserved",
    "available", "available", "available", "available", "available", "available",
  ];
  const duplexStatuses: UnitStatus[] = ["reserved", "available", "available", "available"];

  const apartments: Unit[] = apartmentStatuses.map((status, index) => {
    const unitNumber = index + 1;
    const areaStep = index % 3;
    return {
      id: `A${String(unitNumber).padStart(2, "0")}`,
      name: `شقة A${String(unitNumber).padStart(2, "0")}`,
      type: "apartment",
      area: 130 + areaStep * 12,
      price: 300_000 + areaStep * 35_000,
      status,
      floor: null,
      features: siteConfig.unitTypes.apartment.features,
      images: [],
      floorPlan: siteConfig.unitTypes.apartment.floorPlans[0]?.image ?? null,
    };
  });

  const duplexes: Unit[] = duplexStatuses.map((status, index) => {
    const unitNumber = index + 1;
    return {
      id: `D${String(unitNumber).padStart(2, "0")}`,
      name: `دوبلكس D${String(unitNumber).padStart(2, "0")}`,
      type: "duplex",
      area: siteConfig.unitTypes.duplex.area ?? 250,
      price: siteConfig.unitTypes.duplex.startingPrice,
      status,
      floor: null,
      features: siteConfig.unitTypes.duplex.features,
      images: [],
      floorPlan: siteConfig.unitTypes.duplex.floorPlans[0]?.image ?? null,
    };
  });

  return [...apartments, ...duplexes];
}

export async function getUnits(): Promise<Unit[]> {
  let rows: SheetRow[] | null;

  try {
    rows = await fetchSheetRows();
  } catch (error) {
    // Credentials were configured but the live Google Sheets call failed
    // (bad auth, revoked share, invalid sheet ID, network error, etc).
    // Never let this crash the app or the page — degrade to an empty list
    // so the UI shows its existing empty state instead.
    console.error("[services/units] Google Sheets request failed:", error);
    return [];
  }

  if (!rows) {
    // Credentials are not configured at all (local/demo environment) —
    // fall back to built-in sample data so the site stays fully usable.
    return generateFallbackUnits();
  }

  return rows.map(parseRow).filter((unit): unit is Unit => unit !== null);
}
