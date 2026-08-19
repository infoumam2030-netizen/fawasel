import { google } from "googleapis";
import { siteConfig } from "@/config/site.config";

export type SheetRow = string[];

function getSheetTabName(): string {
  return siteConfig.googleSheetRange.split("!")[0] || "Units";
}

/**
 * Minimal RFC4180 CSV parser (handles quoted fields, escaped "" quotes,
 * embedded commas/newlines inside quotes). Google's CSV export always
 * quotes fields, so a naive comma-split is not safe here.
 */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  let i = 0;

  while (i < text.length) {
    const char = text[i];

    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i += 1;
        continue;
      }
      field += char;
      i += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = true;
      i += 1;
      continue;
    }
    if (char === ",") {
      row.push(field);
      field = "";
      i += 1;
      continue;
    }
    if (char === "\r") {
      i += 1;
      continue;
    }
    if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      i += 1;
      continue;
    }

    field += char;
    i += 1;
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

/**
 * Reads a sheet published as "Anyone with the link can view" via Google's
 * CSV export endpoint — no Service Account or API credentials needed.
 * This is the zero-setup path: share the sheet with link access and set
 * GOOGLE_SHEET_ID.
 */
async function fetchRowsFromPublicSheet(sheetId: string): Promise<SheetRow[]> {
  const sheetName = getSheetTabName();
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;

  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Public sheet export failed with status ${response.status}`);
  }

  const text = await response.text();
  if (text.trim().startsWith("<")) {
    // Google returns an HTML (login/error) page instead of CSV when the
    // sheet isn't actually shared as link-viewable.
    throw new Error("Sheet is not publicly readable (expected CSV, got HTML)");
  }

  const rows = parseCsv(text).filter((r) => r.some((cell) => cell.trim() !== ""));
  // First row is the header row — drop it.
  return rows.slice(1);
}

/**
 * Reads the sheet via a Service Account (JWT), for private sheets that are
 * NOT shared publicly. Requires GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY.
 */
async function fetchRowsWithServiceAccount(sheetId: string): Promise<SheetRow[]> {
  const { GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY } = process.env;

  const auth = new google.auth.JWT({
    email: GOOGLE_CLIENT_EMAIL,
    key: GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: siteConfig.googleSheetRange,
  });

  return (response.data.values as SheetRow[]) ?? [];
}

/**
 * Fetches raw rows from the configured Google Sheet.
 *
 * Resolution order:
 * 1. GOOGLE_CLIENT_EMAIL + GOOGLE_PRIVATE_KEY configured -> Service Account
 *    (works for private sheets).
 * 2. Otherwise, if a sheet ID is configured -> public CSV export (the sheet
 *    must be shared as "Anyone with the link can view").
 * 3. Otherwise -> null, so callers fall back to built-in sample units.
 *
 * Throws if a sheet ID/credentials ARE configured but the live request
 * fails — callers (see services/units.ts) catch this and degrade to an
 * empty result instead of crashing.
 */
export async function fetchSheetRows(): Promise<SheetRow[] | null> {
  const { GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY } = process.env;
  const sheetId = siteConfig.googleSheetId;

  if (!sheetId) {
    return null;
  }

  if (GOOGLE_CLIENT_EMAIL && GOOGLE_PRIVATE_KEY) {
    return fetchRowsWithServiceAccount(sheetId);
  }

  return fetchRowsFromPublicSheet(sheetId);
}
