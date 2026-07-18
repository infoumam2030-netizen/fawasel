import { NextResponse } from "next/server";
import { computeAvailabilityStats, getUnits } from "@/services/units";

export async function GET() {
  try {
    const units = await getUnits();
    const stats = computeAvailabilityStats(units);
    return NextResponse.json(stats, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    // getUnits() already handles Google Sheets failures internally — this
    // catch is a last-resort safety net so the route can never 500/crash.
    console.error("[api/availability] unexpected error:", error);
    return NextResponse.json(computeAvailabilityStats([]), {
      headers: { "Cache-Control": "no-store" },
    });
  }
}
