"use client";

import { useEffect } from "react";
import { useRouteStore } from "@/store/route-store";
import type { RouteResult } from "@/store/route-store";

const ROUTE_ENDPOINT = "http://127.0.0.1:8000/route/";

export default function useRouteEngine() {
  const source = useRouteStore((s) => s.source);
  const destination = useRouteStore((s) => s.destination);
  const setRoutes = useRouteStore((s) => s.setRoutes);

  useEffect(() => {
    if (!source || !destination) return;

    // Guards against a slower, older request resolving after a newer
    // source/destination change and clobbering fresher route data.
    let ignore = false;

    async function fetchRoutes() {
      try {
        const response = await fetch(ROUTE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ start: source, goal: destination }),
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        if (ignore) return;

        // Normalize the backend's snake_case payload into the store's
        // shape, defaulting any missing field instead of letting
        // `undefined` reach the map/length calls downstream.
        const route: RouteResult = {
          primaryRoute: data.primary_route ?? [],
          diversionRoute: data.diversion_route ?? [],
          emergencyRoute: data.emergency_route ?? [],
          primaryDistance: data.primary_distance ?? 0,
          diversionDistance: data.diversion_distance ?? 0,
          emergencyDistance: data.emergency_distance ?? 0,
          primaryETA: data.primary_eta ?? 0,
          diversionETA: data.diversion_eta ?? 0,
          emergencyETA: data.emergency_eta ?? 0,
        };

        setRoutes(route);
      } catch (err) {
        if (!ignore) {
          console.error("ROUTE FETCH ERROR:", err);
        }
      }
    }

    fetchRoutes();

    return () => {
      ignore = true;
    };
  }, [source, destination, setRoutes]);
}