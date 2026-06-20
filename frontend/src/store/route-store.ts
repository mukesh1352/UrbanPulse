// route-store.ts

import { create } from "zustand";

export interface Deployment {
  id: string;

  area: string;

  police: number;
  barricades: number;
  ambulances: number;

  priority: "Critical" | "High" | "Moderate" | "Stable";

  station: string;

  riskScore: number;

  congestion: string;

  latitude?: number;
  longitude?: number;
}

export interface RouteResult {
  primaryRoute: [number, number][];
  diversionRoute: [number, number][];
  emergencyRoute: [number, number][];

  primaryDistance: number;
  diversionDistance: number;
  emergencyDistance: number;

  primaryETA: number;
  diversionETA: number;
  emergencyETA: number;
}

// Used to reset the "current route" slice — kept here so the store's own
// defaults never hand out `undefined` to a consumer.
const EMPTY_ROUTE_RESULT: RouteResult = {
  primaryRoute: [],
  diversionRoute: [],
  emergencyRoute: [],
  primaryDistance: 0,
  diversionDistance: 0,
  emergencyDistance: 0,
  primaryETA: 0,
  diversionETA: 0,
  emergencyETA: 0,
};

interface RouteState {
  policeNeeded: number;
  barricadesNeeded: number;
  ambulancesNeeded: number;

  deployments: Deployment[];

  source: [number, number] | null;
  destination: [number, number] | null;

  // The single "current navigation" route between source/destination —
  // this is what useRouteEngine fetches and both LiveMap and RoutePanel
  // read from directly.
  primaryRoute: [number, number][];
  diversionRoute: [number, number][];
  emergencyRoute: [number, number][];

  primaryDistance: number;
  diversionDistance: number;
  emergencyDistance: number;

  primaryETA: number;
  diversionETA: number;
  emergencyETA: number;

  setSource: (source: [number, number]) => void;
  setDestination: (destination: [number, number]) => void;

  setDeployments: (deployments: Deployment[]) => void;

  setResources: (
    police: number,
    barricades: number,
    ambulances: number
  ) => void;

  // Single typed param instead of 9 positional args — argument-order
  // mistakes here were exactly what broke the store/engine wiring before.
  setRoutes: (route: RouteResult) => void;
  clearCurrentRoute: () => void;
}

export const useRouteStore = create<RouteState>((set) => ({
  policeNeeded: 0,
  barricadesNeeded: 0,
  ambulancesNeeded: 0,

  deployments: [],

  source: [12.9716, 77.5946],
  destination: [12.9352, 77.6245],

  ...EMPTY_ROUTE_RESULT,

  setSource: (source) => set({ source }),
  setDestination: (destination) => set({ destination }),

  setDeployments: (deployments) => set({ deployments }),

  setResources: (police, barricades, ambulances) =>
    set({
      policeNeeded: police,
      barricadesNeeded: barricades,
      ambulancesNeeded: ambulances,
    }),

  setRoutes: (route) =>
    set({
      primaryRoute: route.primaryRoute ?? [],
      diversionRoute: route.diversionRoute ?? [],
      emergencyRoute: route.emergencyRoute ?? [],
      primaryDistance: route.primaryDistance ?? 0,
      diversionDistance: route.diversionDistance ?? 0,
      emergencyDistance: route.emergencyDistance ?? 0,
      primaryETA: route.primaryETA ?? 0,
      diversionETA: route.diversionETA ?? 0,
      emergencyETA: route.emergencyETA ?? 0,
    }),

  clearCurrentRoute: () => set({ ...EMPTY_ROUTE_RESULT }),
}));