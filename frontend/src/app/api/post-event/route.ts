import { NextResponse } from "next/server";
import { getEventHistorySeeded } from "@/lib/event-history";

export async function GET() {
  try {
    const events = getEventHistorySeeded();
    if (events.length === 0) {
      return NextResponse.json({ message: "No historical events" });
    }
    
    const groups: Record<string, any[]> = {};
    events.forEach(e => {
      if (!groups[e.event_type]) groups[e.event_type] = [];
      groups[e.event_type].push(e);
    });
    
    const records = Object.entries(groups).map(([type, list]) => {
      const total_events = list.length;
      const avg_severity = list.reduce((sum, e) => sum + e.severity, 0) / total_events;
      const avg_police = list.reduce((sum, e) => sum + e.police, 0) / total_events;
      const avg_barricades = list.reduce((sum, e) => sum + e.barricades, 0) / total_events;
      const avg_eta = list.reduce((sum, e) => sum + e.eta, 0) / total_events;
      
      return {
        event_type: type,
        total_events,
        avg_severity,
        avg_police,
        avg_barricades,
        avg_eta
      };
    });
    
    return NextResponse.json(records);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
