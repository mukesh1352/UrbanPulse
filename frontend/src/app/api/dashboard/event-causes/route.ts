import { NextResponse } from "next/server";
import { getTrafficEvents } from "@/lib/csv-parser";

export async function GET() {
  try {
    const df = getTrafficEvents();
    const counts: Record<string, number> = {};
    
    df.forEach((e: any) => {
      const cause = e.event_cause || "unknown";
      counts[cause] = (counts[cause] || 0) + 1;
    });
    
    const records = Object.entries(counts).map(([cause, count]) => ({
      cause,
      count
    }));
    
    return NextResponse.json(records);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
