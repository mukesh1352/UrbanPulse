import { NextResponse } from "next/server";
import { getTrafficEvents } from "@/lib/csv-parser";

export async function GET() {
  try {
    const df = getTrafficEvents();
    const anomalies = df
      .filter((e: any) => Number(e.severity_score) >= 4)
      .map((e: any) => ({
        hour: e.hour || 0,
        cluster: e.cluster != null ? e.cluster : 0,
        severity_score: e.severity_score || 0
      }));
      
    return NextResponse.json(anomalies);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
