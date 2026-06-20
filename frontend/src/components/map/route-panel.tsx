"use client";

import { useMemo } from "react";
import { useRouteStore } from "@/store/route-store";

const PRIORITY_STYLES: Record<string, string> = {
  Critical: "font-bold text-red-500",
  High: "font-bold text-orange-400",
  Moderate: "font-bold text-yellow-400",
};
const DEFAULT_PRIORITY_STYLE = "font-bold text-green-400"; // covers "Stable"

const PRIORITY_ACTIONS: Record<string, string> = {
  Critical: "🚨 Activate Emergency Corridor",
  High: "🚓 Deploy Additional Patrol Unit",
  Moderate: "⚠ Increase Monitoring",
};
const DEFAULT_ACTION = "✅ Normal Surveillance";


function getPriorityStyle(priority: string) {
  return PRIORITY_STYLES[priority] ?? DEFAULT_PRIORITY_STYLE;
}

function getAction(priority: string) {
  return PRIORITY_ACTIONS[priority] ?? DEFAULT_ACTION;
}

function formatKm(value: number | undefined) {
  return typeof value === "number" && Number.isFinite(value) ? value.toFixed(2) : "—";
}

function formatMins(value: number | undefined) {
  return typeof value === "number" && Number.isFinite(value) ? `${value} mins` : "—";
}

function StatBlock({
  label,
  value,
  colorClass,
  size = "text-xl",
}: {
  label: string;
  value: number;
  colorClass: string;
  size?: string;
}) {
  return (
    <div>
      <div className="text-sm text-zinc-400">{label}</div>
      <div className={`${size} font-bold ${colorClass}`}>{value}</div>
    </div>
  );
}

export default function RoutePanel() {
  const deployments = useRouteStore((s) => s.deployments);
  const police = useRouteStore((s) => s.policeNeeded);
  const barricades = useRouteStore((s) => s.barricadesNeeded);
  const ambulances = useRouteStore((s) => s.ambulancesNeeded);

  const primaryDistance = useRouteStore((s) => s.primaryDistance);
  const diversionDistance = useRouteStore((s) => s.diversionDistance);
  const primaryETA = useRouteStore((s) => s.primaryETA);
  const diversionETA = useRouteStore((s) => s.diversionETA);
  const source = useRouteStore((s)=>s.source);

  const sortedDeployments = useMemo(
    () => [...deployments].sort((a, b) => b.riskScore - a.riskScore),
    [deployments]
  );
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 max-h-[850px] overflow-y-auto space-y-8">
      <h1 className="text-2xl font-bold text-white">Command Response Panel</h1>

      {/* SUMMARY */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl bg-zinc-800 p-4">
          <StatBlock label="🚓 Police" value={police} colorClass="text-blue-400" size="text-3xl" />
        </div>
        <div className="rounded-xl bg-zinc-800 p-4">
          <StatBlock label="🚧 Barricades" value={barricades} colorClass="text-orange-400" size="text-3xl" />
        </div>
        <div className="rounded-xl bg-zinc-800 p-4">
          <StatBlock label="🚑 Ambulances" value={ambulances} colorClass="text-red-400" size="text-3xl" />
        </div>
      </div>

      <div className="space-y-6">
        {sortedDeployments.length === 0 ? (
          <div className="rounded-xl bg-zinc-800 p-8 text-center text-zinc-400">
            No Active Incidents
          </div>
        ) : (
          sortedDeployments.map((area) => (
            <div
              key={`${area.area}-${area.station}`}
              className="rounded-2xl border border-zinc-700 bg-zinc-800 p-5 space-y-5"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">{area.area}</h2>
                <span className={getPriorityStyle(area.priority)}>{area.priority}</span>
              </div>

              {/* RESOURCES */}
              <div className="grid grid-cols-3 gap-4">
                <StatBlock label="🚓 Police" value={area.police} colorClass="text-blue-400" />
                <StatBlock label="🚧 Barricades" value={area.barricades} colorClass="text-orange-400" />
                <StatBlock label="🚑 Ambulances" value={area.ambulances} colorClass="text-red-400" />
              </div>

              {/* ANALYTICS */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Risk Score</span>
                  <span className="font-bold text-red-400">{area.riskScore}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Congestion</span>
                  <span className="font-bold text-yellow-400">{area.congestion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Clearance ETA</span>
                  <span className="font-bold text-cyan-400">
  {formatMins(primaryETA)}
</span>
                </div>
              </div>

             {/* ROUTE DETAILS */}

<div className="rounded-xl bg-zinc-900 p-4 space-y-4">

  <div className="text-zinc-300 font-semibold">
    Route Details
  </div>

  <div className="flex justify-between">

    <span className="text-zinc-400">
      📍 Source
    </span>

    <span className="font-semibold text-white">
      Bengaluru Command Center
    </span>

  </div>

  <div className="flex justify-between">

    <span className="text-zinc-400">
      🎯 Destination
    </span>

    <span className="font-semibold text-white">
      {area.area}
    </span>

  </div>

  <div className="border-t border-zinc-700 pt-3 flex justify-between">

    <span className="text-zinc-400">
      🟢 Primary Route
    </span>

    <span className="font-semibold text-green-400">

      {formatKm(primaryDistance)} km • {formatMins(primaryETA)}

    </span>

  </div>

  <div className="flex justify-between">

    <span className="text-zinc-400">
      🔵 Diversion Route
    </span>

    <span className="font-semibold text-blue-400">

      {formatKm(diversionDistance)} km • {formatMins(diversionETA)}

    </span>

  </div>

  <div className="flex justify-between">

    <span className="text-zinc-400">
      🚓 Assigned Station
    </span>

    <span className="font-semibold text-purple-400">

      {area.station}

    </span>

  </div>

</div>
              {/* ACTION */}
              <div className="rounded-xl bg-zinc-900 p-4">
                <div className="text-zinc-400">Recommended Action</div>
                <div className="mt-2 font-semibold text-orange-400">
                  {getAction(area.priority)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}