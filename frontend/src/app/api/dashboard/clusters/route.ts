import { NextResponse } from "next/server";
import { getTrafficEvents } from "@/lib/csv-parser";

export async function GET() {
  try {
    const df = getTrafficEvents();
    const clusterGroups: Record<number, any[]> = {};
    
    df.forEach((e: any) => {
      const c = e.cluster !== null && e.cluster !== undefined ? Number(e.cluster) : -1;
      if (!clusterGroups[c]) {
        clusterGroups[c] = [];
      }
      clusterGroups[c].push(e);
    });

    const records = Object.entries(clusterGroups).map(([cStr, list]) => {
      const cluster = Number(cStr);
      const incidents = list.length;
      const high_priority = list.filter((e: any) => e.priority === "High").length;
      const sumSeverity = list.reduce((sum: number, e: any) => sum + (Number(e.severity_score) || 0), 0);
      const avg_severity = incidents > 0 ? sumSeverity / incidents : 0;
      const high_priority_ratio = incidents > 0 ? high_priority / incidents : 0;
      
      return {
        cluster,
        incidents,
        high_priority,
        avg_severity,
        high_priority_ratio
      };
    });

    return NextResponse.json(records);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
