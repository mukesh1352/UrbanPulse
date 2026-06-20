import { NextResponse } from "next/server";
import { getActiveEvents } from "@/lib/active-events";

export async function GET() {
  try {
    const events = getActiveEvents();
    const high_priority = events.filter(e => e.priority === "High").length;
    const clusters = new Set(events.map(e => e.cluster)).size;
    const anomalies = events.filter(e => e.severity_score >= 4).length;
    
    return NextResponse.json({
      total_events: events.length,
      high_priority,
      hotspots: clusters,
      anomalies
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
