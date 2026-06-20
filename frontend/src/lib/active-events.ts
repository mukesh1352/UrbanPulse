import { getTrafficEvents } from "./csv-parser";

let activeCache: any[] | null = null;

export function getActiveEvents() {
  if (activeCache) return activeCache;
  
  const df = getTrafficEvents();
  // Get 15 events from the dataset to represent the initial active live state
  const sample = df.slice(45, 60);
  
  activeCache = sample.map((e: any, idx: number) => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - idx * 12);
    
    // Clean up area name to make it look short and professional
    let area = `Cluster ${e.cluster}`;
    if (e.address) {
      const parts = e.address.split(",");
      if (parts.length > 2) {
        area = parts[2].trim() + " " + (parts[3] ? parts[3].trim() : "");
      } else {
        area = parts[0].trim();
      }
    }
    
    return {
      id: e.id || `FKIDLive_${idx}`,
      area,
      event_type: e.event_type || "unplanned",
      event_cause: e.event_cause || "traffic_jam",
      cluster: e.cluster != null ? Number(e.cluster) : 0,
      severity_score: Number(e.severity_score) || 3,
      priority: e.priority || "Medium",
      latitude: Number(e.latitude),
      longitude: Number(e.longitude),
      timestamp: date.toISOString()
    };
  });
  
  return activeCache;
}
