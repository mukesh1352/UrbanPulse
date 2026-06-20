import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const severity = Number(data.severity);
    const isAnomaly = severity >= 4;
    
    return NextResponse.json({ anomaly: isAnomaly });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
