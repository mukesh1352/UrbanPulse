import { getTrafficEvents } from "./csv-parser";

let seededHistory: any[] | null = null;

export function getEventHistorySeeded() {
  if (seededHistory) return seededHistory;
  
  const df = getTrafficEvents();
  // Seed with 500 events from the dataset to provide realistic charts
  const sample = df.slice(0, 500);
  
  seededHistory = sample.map((e: any) => {
    const severity = Number(e.severity_score) || 3;
    let police = 2;
    let barricades = 2;
    let ambulances = 0;
    
    if (e.event_cause === "accident") {
      police = severity + 1;
      barricades = severity;
      ambulances = 1;
    } else if (e.event_cause === "traffic_jam") {
      police = 2;
      barricades = 2;
    } else if (e.event_cause === "lane_closed") {
      police = 2;
      barricades = 3;
    } else if (["festival", "concert", "cricket_match"].includes(e.event_cause)) {
      police = 5;
      barricades = 4;
    }
    
    return {
      timestamp: e.start_datetime || new Date().toISOString(),
      event_type: e.event_cause || "traffic",
      cluster: e.cluster != null ? Number(e.cluster) : 0,
      severity,
      priority: e.priority || "Low",
      police,
      barricades,
      ambulances,
      route_distance: Number((3 + Math.random() * 7).toFixed(2)),
      eta: Math.round(10 + Math.random() * 25)
    };
  });
  
  return seededHistory;
}
