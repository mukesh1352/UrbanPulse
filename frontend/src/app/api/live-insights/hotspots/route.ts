import { NextResponse } from "next/server";
import { getActiveEvents } from "@/lib/active-events";

export async function GET() {
  try {
    const events = getActiveEvents();
    if (events.length === 0) return NextResponse.json([]);
    
    const groups: Record<number, any[]> = {};
    events.forEach(e => {
      if (!groups[e.cluster]) groups[e.cluster] = [];
      groups[e.cluster].push(e);
    });
    
    const stats = Object.entries(groups).map(([cStr, list]) => {
      const cluster = Number(cStr);
      const incidents = list.length;
      const avg_severity = list.reduce((sum, e) => sum + e.severity_score, 0) / incidents;
      const high_priority = list.filter(e => e.priority === "High").length;
      const high_priority_ratio = high_priority / incidents;
      const risk_score = incidents * avg_severity * (high_priority_ratio || 0.5);
      
      return {
        cluster,
        incidents,
        avg_severity,
        high_priority,
        high_priority_ratio,
        risk_score
      };
    }).sort((a, b) => b.risk_score - a.risk_score);
    
    return NextResponse.json(stats);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
