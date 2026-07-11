import { NextResponse } from "next/server";
import { getUnits } from "@/services/units";

export async function GET() {
  try {
    const units = await getUnits();
    return NextResponse.json(units, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json({ error: "تعذر تحميل بيانات الوحدات" }, { status: 500 });
  }
}
