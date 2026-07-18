import { fetchSheetRows, type SheetRow } from "@/services/googleSheets";
import type { AvailabilityStats, Unit, UnitStatus } from "@/types/unit";

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

function normalizeStatus(raw: string | undefined): UnitStatus {
  if (!raw) return "available";
  return STATUS_MAP[raw.trim().toLowerCase()] ?? STATUS_MAP[raw.trim()] ?? "available";
}

/**
 * Extracts a number from a raw cell value that may carry formatting —
 * thousands separators ("1,330,000") and/or a trailing currency label
 * ("1,330,000 ر.س.") as produced by Google Sheets' formatted CSV/API
 * export. Only the leading digit/comma run (with an optional decimal
 * part directly attached, e.g. "215.5") is treated as the number; any
 * trailing text after a space (like the currency label) is ignored
 * rather than corrupting the parse.
 */
function toNumber(raw: string | undefined, fallback = 0): number {
  if (!raw) return fallback;
  const match = raw.match(/[\d,]+(?:\.\d+)?/);
  if (!match) return fallback;
  const parsed = Number(match[0].replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : fallback;
}

function parseRow(row: SheetRow): Unit | null {
  const [id, status, area, price, bedrooms, bathrooms, parking, roof, image, pdf] = row;
  if (!id) return null;

  return {
    id: id.trim(),
    status: normalizeStatus(status),
    area: toNumber(area),
    price: toNumber(price),
    bedrooms: toNumber(bedrooms, 4),
    bathrooms: toNumber(bathrooms, 5),
    parking: toNumber(parking, 2),
    roofArea: toNumber(roof, 52),
    image: image?.trim() || "/images/gallery/exterior-1.svg",
    pdfUrl: pdf?.trim() || null,
  };
}

/**
 * Deterministic sample data mirroring the real Fawaseel project (18 units,
 * area starting at 210m, price starting at 1,330,000 SAR). Used whenever
 * Google Sheets credentials are not configured, so the site is fully
 * functional in local/demo environments.
 */
function generateFallbackUnits(): Unit[] {
  const statuses: UnitStatus[] = [
    "sold", "sold", "sold", "sold", "sold",
    "reserved", "reserved", "reserved",
    "available", "available", "available", "available",
    "available", "available", "available", "available", "available", "available",
  ];

  return statuses.map((status, index) => {
    const unitNumber = index + 1;
    const areaStep = index % 4;
    const area = 210 + areaStep * 8;
    const price = 1_330_000 + areaStep * 45_000;

    return {
      id: `A${String(unitNumber).padStart(2, "0")}`,
      status,
      area,
      price,
      bedrooms: 4,
      bathrooms: 5,
      parking: 2,
      roofArea: 52,
      image: "/images/gallery/exterior-1.svg",
      pdfUrl: null,
    };
  });
}

export async function getUnits(): Promise<Unit[]> {
  let rows: SheetRow[] | null;

  try {
    rows = await fetchSheetRows();
  } catch (error) {
    // Credentials were configured but the live Google Sheets call failed
    // (bad auth, revoked share, invalid sheet ID, network error, etc).
    // Never let this crash the app or the page — degrade to an empty list
    // so the UI shows its existing "no units" empty state instead.
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

export function computeAvailabilityStats(units: Unit[]): AvailabilityStats {
  const totalUnits = units.length;
  const available = units.filter((u) => u.status === "available").length;
  const reserved = units.filter((u) => u.status === "reserved").length;
  const sold = units.filter((u) => u.status === "sold").length;
  const startingPrice = units.length ? Math.min(...units.map((u) => u.price)) : 0;
  const averageArea = units.length
    ? Math.round(units.reduce((sum, u) => sum + u.area, 0) / units.length)
    : 0;
  const salesProgressPercent = totalUnits ? Math.round(((reserved + sold) / totalUnits) * 100) : 0;

  return { totalUnits, available, reserved, sold, startingPrice, averageArea, salesProgressPercent };
}
