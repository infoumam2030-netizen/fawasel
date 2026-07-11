import { NextResponse } from "next/server";
import { computeAvailabilityStats, getUnits } from "@/services/units";

export async function GET() {
  try {
    const units = await getUnits();
    const stats = computeAvailabilityStats(units);
    return NextResponse.json(stats, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json({ error: "تعذر تحميل إحصائيات التوفر" }, { status: 500 });
  }
}
