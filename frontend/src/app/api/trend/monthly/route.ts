import { NextResponse } from "next/server";
import { getTrafficEvents } from "@/lib/csv-parser";

export async function GET() {
  try {
    const df = getTrafficEvents();
    const counts: Record<number, number> = {};
    
    df.forEach((e: any) => {
      const month = e.month != null ? Number(e.month) : NaN;
      if (!isNaN(month) && month >= 1 && month <= 12) {
        counts[month] = (counts[month] || 0) + 1;
      }
    });
    
    const records = Object.entries(counts).map(([month, count]) => ({
      month: Number(month),
      count
    })).sort((a, b) => a.month - b.month);
    
    return NextResponse.json(records);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
