import { NextResponse } from "next/server";
import { getEventHistorySeeded } from "@/lib/event-history";

export async function GET() {
  try {
    const events = getEventHistorySeeded();
    if (events.length === 0) {
      return NextResponse.json({ message: "No events" });
    }
    
    const typeCounts: Record<string, number> = {};
    events.forEach(e => {
      typeCounts[e.event_type] = (typeCounts[e.event_type] || 0) + 1;
    });
    const most_common = Object.entries(typeCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    
    const clusterCounts: Record<number, number> = {};
    events.forEach(e => {
      clusterCounts[e.cluster] = (clusterCounts[e.cluster] || 0) + 1;
    });
    const highest_cluster = Number(Object.entries(clusterCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0]);
    
    const avg_eta = Number((events.reduce((sum, e) => sum + e.eta, 0) / events.length).toFixed(2));
    
    return NextResponse.json({
      most_common_event: most_common,
      highest_risk_cluster: highest_cluster,
      average_eta: avg_eta,
      total_events: events.length
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
