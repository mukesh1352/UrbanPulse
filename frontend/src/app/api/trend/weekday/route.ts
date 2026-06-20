import { NextResponse } from "next/server";
import { getTrafficEvents } from "@/lib/csv-parser";

export async function GET() {
  try {
    const df = getTrafficEvents();
    const counts: Record<number, number> = {};
    
    df.forEach((e: any) => {
      const day = e.day_of_week != null ? Number(e.day_of_week) : NaN;
      if (!isNaN(day) && day >= 0 && day <= 6) {
        counts[day] = (counts[day] || 0) + 1;
      }
    });
    
    const records = Object.entries(counts).map(([day_of_week, count]) => ({
      day_of_week: Number(day_of_week),
      count
    })).sort((a, b) => a.day_of_week - b.day_of_week);
    
    return NextResponse.json(records);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
