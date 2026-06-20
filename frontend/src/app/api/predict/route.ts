import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const severity = Number(data.severity_score) || 3;
    const cause = data.event_cause || "";
    const type = data.event_type || "";
    
    let priority = "Low";
    let confidence = 0.82;
    
    if (severity >= 4 || cause === "accident" || type === "planned_event") {
      priority = "High";
      confidence = 0.88 + (severity - 4) * 0.03;
    } else if (severity >= 2.5 || cause === "water_logging" || cause === "vehicle_breakdown" || cause === "construction") {
      priority = "Medium";
      confidence = 0.79 + (severity - 2) * 0.04;
    } else {
      priority = "Low";
      confidence = 0.85 - severity * 0.02;
    }
    
    // Ensure bounds
    confidence = Math.max(0.5, Math.min(0.99, confidence));
    
    return NextResponse.json({
      priority,
      confidence
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
