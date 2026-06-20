import { NextResponse } from "next/server";
import { getActiveEvents } from "@/lib/active-events";

export async function GET() {
  try {
    const events = getActiveEvents();
    if (events.length === 0) {
      return NextResponse.json({
        hot_cluster: null,
        risk_score: 0,
        message: "No live incidents"
      });
    }
    
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
      return { cluster, risk_score };
    }).sort((a, b) => b.risk_score - a.risk_score);
    
    if (stats.length === 0) {
      return NextResponse.json({
        hot_cluster: null,
        risk_score: 0,
        message: "No live incidents"
      });
    }
    
    const top = stats[0];
    const cluster = top.cluster;
    const risk = Number(top.risk_score.toFixed(2));
    
    let message = `Cluster ${cluster} is stable.`;
    if (risk >= 10) {
      message = `🔥 Cluster ${cluster} is highly congested (Risk Score: ${risk}). Divert route suggested.`;
    } else if (risk >= 5) {
      message = `⚠ Cluster ${cluster} is showing moderate traffic build-up.`;
    }
    
    return NextResponse.json({
      hot_cluster: cluster,
      risk_score: risk,
      message
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
