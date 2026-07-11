import { google } from "googleapis";
import { siteConfig } from "@/config/site.config";

export type SheetRow = string[];

/**
 * Fetches raw rows from the configured Google Sheet.
 * Requires GOOGLE_SHEET_ID, GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY
 * (service-account credentials with viewer access to the sheet).
 * Returns null when credentials are not configured so callers can fall
 * back to sample data during local development.
 */
export async function fetchSheetRows(): Promise<SheetRow[] | null> {
  const { GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY } = process.env;
  const sheetId = siteConfig.googleSheetId;

  if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY || !sheetId) {
    return null;
  }

  const auth = new google.auth.JWT({
    email: GOOGLE_CLIENT_EMAIL,
    key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: siteConfig.googleSheetRange,
  });

  return (response.data.values as SheetRow[]) ?? [];
}
