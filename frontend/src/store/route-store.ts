import { create } from "zustand";

export interface Deployment {
  area: string;
  police: number;
  barricades: number;
  ambulances: number;
  priority: "Critical" | "High" | "Moderate" | "Stable";

  station: string;
  riskScore: number;
  congestion: string;
}
interface RouteState {
  policeNeeded: number;
  barricadesNeeded: number;
  ambulancesNeeded: number;

  deployments: Deployment[];

  source: [number, number] | null;
  destination: [number, number] | null;

  primaryRoute: [number, number][];
  diversionRoute: [number, number][];
  emergencyRoute: [number, number][];

  primaryDistance: number;
  diversionDistance: number;
  emergencyDistance: number;

  primaryETA: number;
  diversionETA: number;
  emergencyETA: number;

  setSource: (
    source: [number, number]
  ) => void;

  setDestination: (
    destination: [number, number]
  ) => void;

  setDeployments: (
    deployments: Deployment[]
  ) => void;

  setResources: (
    police: number,
    barricades: number,
    ambulances: number
  ) => void;

  setRoutes: (
    primaryRoute: [number, number][],
    diversionRoute: [number, number][],
    emergencyRoute: [number, number][],
    primaryDistance: number,
    diversionDistance: number,
    emergencyDistance: number,
    primaryETA: number,
    diversionETA: number,
    emergencyETA: number
  ) => void;
}

export const useRouteStore =
create<RouteState>((set) => ({

  policeNeeded: 0,
  barricadesNeeded: 0,
  ambulancesNeeded: 0,

  deployments: [],

  source: [12.9716,77.5946],

  destination: [12.9352,77.6245],

  primaryRoute: [],
  diversionRoute: [],
  emergencyRoute: [],

  primaryDistance: 0,
  diversionDistance: 0,
  emergencyDistance: 0,

  primaryETA: 0,
  diversionETA: 0,
  emergencyETA: 0,

  setSource: (source)=>
    set({source}),

  setDestination: (destination)=>
    set({destination}),

  setDeployments: (deployments)=>
    set({deployments}),

  setResources: (
    police,
    barricades,
    ambulances
  )=>
    set({
      policeNeeded: police,
      barricadesNeeded: barricades,
      ambulancesNeeded: ambulances
    }),

  setRoutes: (
    primaryRoute,
    diversionRoute,
    emergencyRoute,
    primaryDistance,
    diversionDistance,
    emergencyDistance,
    primaryETA,
    diversionETA,
    emergencyETA
  )=>
    set({

      primaryRoute,
      diversionRoute,
      emergencyRoute,

      primaryDistance,
      diversionDistance,
      emergencyDistance,

      primaryETA,
      diversionETA,
      emergencyETA

    })

}));