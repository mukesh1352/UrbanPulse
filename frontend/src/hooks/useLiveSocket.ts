"use client";

import { useEffect, useRef } from "react";
import { useLiveStore } from "@/store/live-store";
import { useRouteStore, Deployment } from "@/store/route-store";

export default function useLiveSocket() {

  const wsRef = useRef<WebSocket | null>(null);

  const addEvent = useLiveStore(
    s => s.addEvent
  );

  const setConnected = useLiveStore(
    s => s.setConnected
  );

  useEffect(() => {

    if (wsRef.current) return;

    const ws = new WebSocket(
      "ws://127.0.0.1:8000/ws/events"
    );

    wsRef.current = ws;

    ws.onopen = () => {

      console.log("CONNECTED");

      setConnected(true);

    };

    ws.onclose = (event) => {

      console.log(
        "DISCONNECTED",
        event.code
      );

      setConnected(false);

      wsRef.current = null;

    };

    ws.onerror = () => {

      console.error(
        "WebSocket connection failed"
      );

    };

    ws.onmessage = ({ data }) => {

      const event = JSON.parse(data);

      addEvent(event);

      const routeStore =
        useRouteStore.getState();

      const updatedDeployments = [
        ...routeStore.deployments
      ];

      const area =
        event.area?.trim()
        ||
        `Cluster ${event.cluster}`;

      const areaKey =
        area.toLowerCase();

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

        Koramangala:
          "Koramangala Traffic PS",

        Whitefield:
          "Whitefield Traffic PS",

        "Electronic City":
          "Electronic City PS",

        Hebbal:
          "Hebbal Traffic PS",

        Marathahalli:
          "Marathahalli PS",

        Indiranagar:
          "Indiranagar PS",

        Majestic:
          "Upparpet PS"

      };

      const priority: Deployment["priority"] =

        event.severity_score >= 5
          ? "Critical"
          : event.severity_score >= 4
          ? "High"
          : event.severity_score >= 3
          ? "Moderate"
          : "Stable";

      const idx =
        updatedDeployments.findIndex(

          d =>
            d.area.toLowerCase() === areaKey

        );

      if (idx >= 0) {

        const updatedPolice =
          updatedDeployments[idx].police +
          police;

        const updatedBarricades =
          updatedDeployments[idx].barricades +
          barricades;

        const updatedAmbulances =
          updatedDeployments[idx].ambulances +
          ambulances;

        const updatedRisk =

          updatedPolice * 2
          +
          updatedBarricades
          +
          updatedAmbulances * 3;

        updatedDeployments[idx] = {

          ...updatedDeployments[idx],

          police:
            updatedPolice,

          barricades:
            updatedBarricades,

          ambulances:
            updatedAmbulances,

          priority,

          riskScore:
            updatedRisk,

          congestion:

            updatedRisk >= 50
              ? "Heavy"
              : updatedRisk >= 25
              ? "Moderate"
              : "Low"

        };

      }

      else {

        const riskScore =

          police * 2
          +
          barricades
          +
          ambulances * 3;

        updatedDeployments.push({

          area,

          police,

          barricades,

          ambulances,

          priority,

          station:

            stationMap[area]
            ??
            "Nearest Traffic PS",

          riskScore,

          congestion:

            riskScore >= 50
              ? "Heavy"
              : riskScore >= 25
              ? "Moderate"
              : "Low"

        });

      }

      routeStore.setDeployments(
        updatedDeployments
      );

      const totals =
        updatedDeployments.reduce(

          (acc, item) => ({

            police:
              acc.police + item.police,

            barricades:
              acc.barricades + item.barricades,

            ambulances:
              acc.ambulances + item.ambulances

          }),

          {

            police: 0,

            barricades: 0,

            ambulances: 0

          }

        );

      routeStore.setResources(

        totals.police,

        totals.barricades,

        totals.ambulances

      );

    };

    return () => {

      ws.close();

      wsRef.current = null;

    };

  }, [

    addEvent,
    setConnected

  ]);

}