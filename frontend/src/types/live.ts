export interface LiveEvent {

  id: string;

  event_type: string;

  event_cause: string;

  cluster: number;

  severity_score: number;

  priority: "Low" | "Medium" | "High";

  latitude: number;

  longitude: number;

  timestamp: string;

}