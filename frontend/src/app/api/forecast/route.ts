import { NextResponse } from "next/server";
import { getTrafficEvents } from "@/lib/csv-parser";

export async function GET() {
  try {
    const df = getTrafficEvents();
    const hourCounts: Record<number, number> = {};
    
    for (let h = 0; h < 24; h++) {
      hourCounts[h] = 0;
    }
    
    df.forEach((e: any) => {
      const hour = e.hour != null ? Number(e.hour) : NaN;
      if (!isNaN(hour) && hour >= 0 && hour < 24) {
        hourCounts[hour]++;
      }
    });
    
    const records = Object.entries(hourCounts).map(([hour, count]) => ({
      hour: Number(hour),
      forecast: count
    })).sort((a, b) => a.hour - b.hour);
    
    return NextResponse.json(records);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
