import { NextResponse } from "next/server";
import { getEventHistorySeeded } from "@/lib/event-history";

export async function GET() {
  try {
    const events = getEventHistorySeeded();
    if (events.length === 0) return NextResponse.json([]);
    
    const groups: Record<number, any[]> = {};
    events.forEach(e => {
      const cluster = e.cluster != null ? Number(e.cluster) : 0;
      if (!groups[cluster]) groups[cluster] = [];
      groups[cluster].push(e);
    });
    
    const records = Object.entries(groups).map(([cStr, list]) => {
      const cluster = Number(cStr);
      const incidents = list.length;
      const avg_severity = list.reduce((sum, e) => sum + e.severity, 0) / incidents;
      const avg_eta = list.reduce((sum, e) => sum + e.eta, 0) / incidents;
      
      return {
        cluster,
        incidents,
        avg_severity,
        avg_eta
      };
    }).sort((a, b) => b.avg_severity - a.avg_severity);
    
    return NextResponse.json(records);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
