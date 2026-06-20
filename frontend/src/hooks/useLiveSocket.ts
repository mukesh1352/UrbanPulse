"use client";

import { useEffect, useRef } from "react";
import { useLiveStore } from "@/store/live-store";
import { useRouteStore, Deployment } from "@/store/route-store";

export default function useLiveSocket() {
  const wsRef = useRef<WebSocket | null>(null);

  const addEvent = useLiveStore(s => s.addEvent);
  const setConnected = useLiveStore(s => s.setConnected);

  useEffect(() => {
    if (wsRef.current) return;

    let simulationInterval: NodeJS.Timeout | null = null;
    let isConnectedToWs = false;

    const ws = new WebSocket("ws://127.0.0.1:8000/ws/events");
    wsRef.current = ws;

    const processEvent = (event: any) => {
      addEvent(event);

      const routeStore = useRouteStore.getState();
      const updatedDeployments = [...routeStore.deployments];

      const area = event.area?.trim() || `Cluster ${event.cluster}`;
      const areaKey = area.toLowerCase();

      let police = 1;
      let barricades = 1;
      let ambulances = 0;

      switch (event.event_cause) {
        case "accident":
          police = 8;
          barricades = 6;
          ambulances = 2;
          break;

        case "traffic_jam":
          police = 4;
          barricades = 3;
          break;

        case "lane_closed":
          police = 2;
          barricades = 5;
          break;

        case "festival":
        case "concert":
        case "cricket_match":
          police = 15;
          barricades = 20;
          ambulances = 3;
          break;
      }

      const stationMap: Record<string, string> = {
        Koramangala: "Koramangala Traffic PS",
        Whitefield: "Whitefield Traffic PS",
        "Electronic City": "Electronic City PS",
        Hebbal: "Hebbal Traffic PS",
        Marathahalli: "Marathahalli PS",
        Indiranagar: "Indiranagar PS",
        Majestic: "Upparpet PS"
      };

      const priority: Deployment["priority"] =
        event.severity_score >= 5
          ? "Critical"
          : event.severity_score >= 4
          ? "High"
          : event.severity_score >= 3
          ? "Moderate"
          : "Stable";

      const idx = updatedDeployments.findIndex(
        d => d.area.toLowerCase() === areaKey
      );

      if (idx >= 0) {
        const updatedPolice = updatedDeployments[idx].police + police;
        const updatedBarricades = updatedDeployments[idx].barricades + barricades;
        const updatedAmbulances = updatedDeployments[idx].ambulances + ambulances;
        const updatedRisk = updatedPolice * 2 + updatedBarricades + updatedAmbulances * 3;

        updatedDeployments[idx] = {
          ...updatedDeployments[idx],
          police: updatedPolice,
          barricades: updatedBarricades,
          ambulances: updatedAmbulances,
          priority,
          riskScore: updatedRisk,
          congestion: updatedRisk >= 50 ? "Heavy" : updatedRisk >= 25 ? "Moderate" : "Low"
        };
      } else {
        const riskScore = police * 2 + barricades + ambulances * 3;

        updatedDeployments.push({
          area,
          police,
          barricades,
          ambulances,
          priority,
          station: stationMap[area] ?? "Nearest Traffic PS",
          riskScore,
          congestion: riskScore >= 50 ? "Heavy" : riskScore >= 25 ? "Moderate" : "Low"
        });
      }

      routeStore.setDeployments(updatedDeployments);

      const totals = updatedDeployments.reduce(
        (acc, item) => ({
          police: acc.police + item.police,
          barricades: acc.barricades + item.barricades,
          ambulances: acc.ambulances + item.ambulances
        }),
        { police: 0, barricades: 0, ambulances: 0 }
      );

      routeStore.setResources(totals.police, totals.barricades, totals.ambulances);
    };

    function startLocalSimulation() {
      console.log("Starting client-side traffic simulation fallback...");
      setConnected(true);

      const areas = [
        { name: "Majestic", cluster: 0, lat: 12.9833, lon: 77.6033 },
        { name: "Koramangala", cluster: 1, lat: 12.9352, lon: 77.6245 },
        { name: "Whitefield", cluster: 2, lat: 12.9784, lon: 77.7524 },
        { name: "Electronic City", cluster: 3, lat: 12.8391, lon: 77.6774 },
        { name: "Hebbal", cluster: 4, lat: 13.0383, lon: 77.5929 },
        { name: "Indiranagar", cluster: 5, lat: 12.9784, lon: 77.6408 },
        { name: "Marathahalli", cluster: 6, lat: 12.9525, lon: 77.6970 },
        { name: "Yelahanka", cluster: 7, lat: 13.0976, lon: 77.5990 },
        { name: "BTM Layout", cluster: 8, lat: 12.9152, lon: 77.6010 }
      ];

      const causes = [
        { cause: "accident", severityRange: [3, 5], type: "unplanned" },
        { cause: "traffic_jam", severityRange: [2, 4], type: "unplanned" },
        { cause: "lane_closed", severityRange: [2, 4], type: "unplanned" },
        { cause: "construction", severityRange: [1, 3], type: "planned" },
        { cause: "festival", severityRange: [2, 5], type: "planned" },
        { cause: "concert", severityRange: [3, 4], type: "planned" },
        { cause: "cricket_match", severityRange: [4, 5], type: "planned" }
      ];

      // Add two initial events to make map active on load
      const initialEvents = [
        {
          id: "init_1",
          area: "Koramangala",
          event_type: "unplanned",
          event_cause: "traffic_jam",
          cluster: 1,
          severity_score: 3,
          priority: "Moderate",
          latitude: 12.9352,
          longitude: 77.6245,
          timestamp: new Date().toISOString()
        },
        {
          id: "init_2",
          area: "Majestic",
          event_type: "unplanned",
          event_cause: "accident",
          cluster: 0,
          severity_score: 4,
          priority: "High",
          latitude: 12.9833,
          longitude: 77.6033,
          timestamp: new Date().toISOString()
        }
      ];
      initialEvents.forEach(processEvent);

      simulationInterval = setInterval(() => {
        const randomArea = areas[Math.floor(Math.random() * areas.length)];
        const randomCause = causes[Math.floor(Math.random() * causes.length)];

        const minSev = randomCause.severityRange[0];
        const maxSev = randomCause.severityRange[1];
        const severity_score = Math.floor(Math.random() * (maxSev - minSev + 1)) + minSev;

        const priority = severity_score >= 4 ? "High" : severity_score >= 3 ? "Medium" : "Low";

        // Add slight jitter
        const latitude = randomArea.lat + (Math.random() - 0.5) * 0.012;
        const longitude = randomArea.lon + (Math.random() - 0.5) * 0.012;

        const mockEvent = {
          id: `FKIDMock_${Math.random().toString(36).substr(2, 9)}`,
          area: randomArea.name,
          event_type: randomCause.type,
          event_cause: randomCause.cause,
          cluster: randomArea.cluster,
          severity_score,
          priority,
          latitude,
          longitude,
          timestamp: new Date().toISOString()
        };

        processEvent(mockEvent);
      }, 7000);
    }

    ws.onopen = () => {
      console.log("WebSocket connected to live backend server.");
      setConnected(true);
      isConnectedToWs = true;
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected.");
      setConnected(false);
      wsRef.current = null;
      if (!isConnectedToWs) {
        startLocalSimulation();
      }
    };

    ws.onerror = () => {
      console.error("WebSocket connection error. Triggering fallback.");
      ws.close();
    };

    ws.onmessage = ({ data }) => {
      try {
        const event = JSON.parse(data);
        processEvent(event);
      } catch (err) {
        console.error("Error parsing websocket message:", err);
      }
    };

    return () => {
      ws.close();
      wsRef.current = null;
      if (simulationInterval) {
        clearInterval(simulationInterval);
      }
    };
  }, [addEvent, setConnected]);
}