"use client";

import { useRouteStore } from "@/store/route-store";

export default function RoutePanel() {

  const deployments =
    useRouteStore(
      s => s.deployments
    );

  const police =
    useRouteStore(
      s => s.policeNeeded
    );

  const barricades =
    useRouteStore(
      s => s.barricadesNeeded
    );

  const ambulances =
    useRouteStore(
      s => s.ambulancesNeeded
    );

  const primaryDistance =
    useRouteStore(
      s => s.primaryDistance
    );

  const diversionDistance =
    useRouteStore(
      s => s.diversionDistance
    );

  const primaryETA =
    useRouteStore(
      s => s.primaryETA
    );

  const diversionETA =
    useRouteStore(
      s => s.diversionETA
    );
    console.log("ROUTE PANEL", {
  primaryDistance,
  diversionDistance,
  primaryETA,
  diversionETA
});

  function getAction(priority: string) {

    switch (priority) {

      case "Critical":
        return "🚨 Activate Emergency Corridor";

      case "High":
        return "🚓 Deploy Additional Patrol Unit";

      case "Moderate":
        return "⚠ Increase Monitoring";

      default:
        return "✅ Normal Surveillance";

    }

  }

  const sortedDeployments =
    [...deployments].sort(
      (a, b) =>
        b.riskScore - a.riskScore
    );

  return (

    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 max-h-[850px] overflow-y-auto space-y-8">

      <h1 className="text-2xl font-bold text-white">
        Command Response Panel
      </h1>

      {/* SUMMARY */}

      <div className="grid grid-cols-3 gap-4">

        <div className="rounded-xl bg-zinc-800 p-4">

          <div className="text-sm text-zinc-400">
            🚓 Police
          </div>

          <div className="text-3xl font-bold text-blue-400">
            {police}
          </div>

        </div>

        <div className="rounded-xl bg-zinc-800 p-4">

          <div className="text-sm text-zinc-400">
            🚧 Barricades
          </div>

          <div className="text-3xl font-bold text-orange-400">
            {barricades}
          </div>

        </div>

        <div className="rounded-xl bg-zinc-800 p-4">

          <div className="text-sm text-zinc-400">
            🚑 Ambulances
          </div>

          <div className="text-3xl font-bold text-red-400">
            {ambulances}
          </div>

        </div>

      </div>

      <div className="space-y-6">

        {

          sortedDeployments.length === 0 ?

          (

            <div className="rounded-xl bg-zinc-800 p-8 text-center text-zinc-400">

              No Active Incidents

            </div>

          )

          :

          sortedDeployments.map(

            area => (

              <div

                key={area.area}

                className="rounded-2xl border border-zinc-700 bg-zinc-800 p-5 space-y-5"

              >

                <div className="flex items-center justify-between">

                  <h2 className="text-xl font-bold text-white">

                    {area.area}

                  </h2>

                  <span
                    className={

                      area.priority === "Critical"

                        ? "font-bold text-red-500"

                        : area.priority === "High"

                        ? "font-bold text-orange-400"

                        : area.priority === "Moderate"

                        ? "font-bold text-yellow-400"

                        : "font-bold text-green-400"

                    }
                  >

                    {area.priority}

                  </span>

                </div>

                {/* RESOURCES */}

                <div className="grid grid-cols-3 gap-4">

                  <div>

                    <div className="text-sm text-zinc-400">

                      🚓 Police

                    </div>

                    <div className="text-xl font-bold text-blue-400">

                      {area.police}

                    </div>

                  </div>

                  <div>

                    <div className="text-sm text-zinc-400">

                      🚧 Barricades

                    </div>

                    <div className="text-xl font-bold text-orange-400">

                      {area.barricades}

                    </div>

                  </div>

                  <div>

                    <div className="text-sm text-zinc-400">

                      🚑 Ambulances

                    </div>

                    <div className="text-xl font-bold text-red-400">

                      {area.ambulances}

                    </div>

                  </div>

                </div>

                {/* ANALYTICS */}

                <div className="space-y-2">

                  <div className="flex justify-between">

                    <span className="text-zinc-400">

                      Risk Score

                    </span>

                    <span className="font-bold text-red-400">

                      {area.riskScore}

                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-zinc-400">

                      Congestion

                    </span>

                    <span className="font-bold text-yellow-400">

                      {area.congestion}

                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-zinc-400">

                      Clearance ETA

                    </span>

                    <span className="font-bold text-green-400">

                      {primaryETA} mins

                    </span>

                  </div>

                </div>

                {/* ROUTES */}

                <div className="rounded-xl bg-zinc-900 p-4 space-y-3">

                  <div>

                    <span className="text-zinc-400">

                      Shortest Route :

                    </span>

                    <span className="ml-2 font-semibold text-green-400">

                      {primaryDistance.toFixed(2)} km ({primaryETA} mins)

                    </span>

                  </div>

                  <div>

                    <span className="text-zinc-400">

                      Diversion Route :

                    </span>

                    <span className="ml-2 font-semibold text-blue-400">

                      {diversionDistance.toFixed(2)} km ({diversionETA} mins)

                    </span>

                  </div>

                  <div>

                    <span className="text-zinc-400">

                      Police Station :

                    </span>

                    <span className="ml-2 font-semibold text-purple-400">

                      {area.station}

                    </span>

                  </div>

                </div>

                {/* ACTION */}

                <div className="rounded-xl bg-zinc-900 p-4">

                  <div className="text-zinc-400">

                    Recommended Action

                  </div>

                  <div className="mt-2 font-semibold text-orange-400">

                    {getAction(area.priority)}

                  </div>

                </div>

              </div>

            )

          )

        }

      </div>

    </div>

  );

}