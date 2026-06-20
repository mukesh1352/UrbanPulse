import { NextResponse } from "next/server";
import { getEventHistorySeeded } from "@/lib/event-history";

export async function GET() {
  try {
    const events = getEventHistorySeeded();
    if (events.length === 0) return NextResponse.json([]);
    
    const groups: Record<string, any[]> = {};
    events.forEach(e => {
      if (!groups[e.event_type]) groups[e.event_type] = [];
      groups[e.event_type].push(e);
    });
    
    const records = Object.entries(groups).map(([type, list]) => {
      const total = list.length;
      const police = list.reduce((sum, e) => sum + e.police, 0) / total;
      const barricades = list.reduce((sum, e) => sum + e.barricades, 0) / total;
      const eta = list.reduce((sum, e) => sum + e.eta, 0) / total;
      
      return {
        event_type: type,
        police,
        barricades,
        eta
      };
    });
    
    return NextResponse.json(records);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
