import { NextResponse } from "next/server";
import { getTrafficEvents } from "@/lib/csv-parser";

export async function GET() {
  try {
    const df = getTrafficEvents();
    
    const summary = {
      total_incidents: df.length,
      high_priority: df.filter((e: any) => e.priority === "High").length,
      planned_events: df.filter((e: any) => e.event_type === "planned" || e.event_type === "planned_event").length,
      unplanned_events: df.filter((e: any) => e.event_type === "unplanned").length,
      clusters: new Set(
        df
          .filter((e: any) => e.cluster !== -1 && e.cluster != null)
          .map((e: any) => e.cluster)
      ).size
    };
    
    return NextResponse.json(summary);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
