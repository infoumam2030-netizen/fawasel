import { NextResponse } from "next/server";
import { getUnits } from "@/services/units";

export async function GET() {
  try {
    const units = await getUnits();
    return NextResponse.json(units, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    // getUnits() already handles Google Sheets failures internally and
    // resolves to [] — this catch is a last-resort safety net so the
    // route itself can never crash or return a 500 to the client.
    console.error("[api/units] unexpected error:", error);
    return NextResponse.json([], {
      headers: { "Cache-Control": "no-store" },
    });
  }
}
