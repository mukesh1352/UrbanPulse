import { NextResponse } from "next/server";
import { getTrafficEvents } from "@/lib/csv-parser";

export async function GET() {
  try {
    const df = getTrafficEvents();
    const counts: Record<string, number> = {};
    
    df.forEach((e: any) => {
      const priority = e.priority || "Low";
      counts[priority] = (counts[priority] || 0) + 1;
    });
    
    const records = Object.entries(counts).map(([priority, count]) => ({
      priority,
      count
    }));
    
    return NextResponse.json(records);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
