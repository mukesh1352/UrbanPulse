import { NextResponse } from "next/server";
import { getTrafficEvents } from "@/lib/csv-parser";

export async function GET() {
  try {
    const df = getTrafficEvents();
    const clusterGroups: Record<number, any[]> = {};
    
    df.forEach((e: any) => {
      const c = e.cluster !== null && e.cluster !== undefined ? Number(e.cluster) : -1;
      if (c === -1) return;
      if (!clusterGroups[c]) {
        clusterGroups[c] = [];
      }
      clusterGroups[c].push(e);
    });

    const hotspots = Object.entries(clusterGroups).map(([cStr, list]) => {
      const cluster = Number(cStr);
      const incidents = list.length;
      const avg_severity = list.reduce((sum: number, e: any) => sum + (Number(e.severity_score) || 0), 0) / incidents;
      const latitude = list.reduce((sum: number, e: any) => sum + (Number(e.latitude) || 0), 0) / incidents;
      const longitude = list.reduce((sum: number, e: any) => sum + (Number(e.longitude) || 0), 0) / incidents;
      const risk_score = incidents * avg_severity;
      
      return {
        cluster,
        incidents,
        avg_severity,
        latitude,
        longitude,
        risk_score
      };
    }).sort((a, b) => b.risk_score - a.risk_score).slice(0, 10);

    return NextResponse.json(hotspots);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
