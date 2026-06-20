import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const start = data.start;
    const goal = data.goal;
    
    if (!start || !goal) {
      return NextResponse.json({ error: "Missing start or goal" }, { status: 400 });
    }

    const startLat = start[0];
    const startLon = start[1];
    const goalLat = goal[0];
    const goalLon = goal[1];

    async function fetchOSRMRoute(sLon: number, sLat: number, gLon: number, gLat: number) {
      const url = `http://router.project-osrm.org/route/v1/driving/${sLon},${sLat};${gLon},${gLat}?geometries=geojson&overview=full`;
      const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
      if (!res.ok) throw new Error("OSRM failed");
      const json = await res.json();
      if (!json.routes || json.routes.length === 0) throw new Error("No route found");
      
      const coords = json.routes[0].geometry.coordinates.map(([lon, lat]: [number, number]) => [lat, lon]);
      const distance = json.routes[0].distance / 1000;
      return { coords, distance };
    }

    let primary: { coords: [number, number][], distance: number };
    let diversion: { coords: [number, number][], distance: number };
    let emergency: { coords: [number, number][], distance: number };

    try {
      primary = await fetchOSRMRoute(startLon, startLat, goalLon, goalLat);
      
      const midLat = (startLat + goalLat) / 2 + 0.005;
      const midLon = (startLon + goalLon) / 2 - 0.005;
      try {
        const firstHalf = await fetchOSRMRoute(startLon, startLat, midLon, midLat);
        const secondHalf = await fetchOSRMRoute(midLon, midLat, goalLon, goalLat);
        diversion = {
          coords: [...firstHalf.coords, ...secondHalf.coords],
          distance: firstHalf.distance + secondHalf.distance
        };
      } catch {
        diversion = {
          coords: primary.coords.map(([lat, lon]) => [lat + 0.003, lon - 0.003]),
          distance: primary.distance * 1.2
        };
      }

      emergency = {
        coords: primary.coords.map(([lat, lon]) => [lat - 0.0015, lon + 0.0015]),
        distance: primary.distance * 1.05
      };
    } catch (err) {
      console.warn("OSRM routing failed, using fallback generator:", err);
      const steps = 15;
      const primaryCoords: [number, number][] = [];
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const lat = startLat + (goalLat - startLat) * t + (Math.sin(t * Math.PI) * 0.0015 * (i % 2 === 0 ? 1 : -1));
        const lon = startLon + (goalLon - startLon) * t + (Math.cos(t * Math.PI) * 0.0015 * (i % 2 === 0 ? -1 : 1));
        primaryCoords.push([lat, lon]);
      }
      const dist = Math.sqrt(Math.pow(goalLat - startLat, 2) + Math.pow(goalLon - startLon, 2)) * 111;
      primary = { coords: primaryCoords, distance: dist };
      
      diversion = {
        coords: primaryCoords.map(([lat, lon]) => [lat + 0.004, lon - 0.004]),
        distance: dist * 1.25
      };
      
      emergency = {
        coords: primaryCoords.map(([lat, lon]) => [lat - 0.001, lon + 0.001]),
        distance: dist * 1.05
      };
    }

    const AVERAGE_SPEED = 30;
    
    return NextResponse.json({
      primary_route: primary.coords,
      diversion_route: diversion.coords,
      emergency_route: emergency.coords,
      primary_distance: Number(primary.distance.toFixed(2)),
      diversion_distance: Number(diversion.distance.toFixed(2)),
      emergency_distance: Number(emergency.distance.toFixed(2)),
      primary_eta: Math.round((primary.distance / AVERAGE_SPEED) * 60),
      diversion_eta: Math.round((diversion.distance / AVERAGE_SPEED) * 60),
      emergency_eta: Math.round((emergency.distance / AVERAGE_SPEED) * 60)
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
