"use client";

import dynamic from "next/dynamic";
import RoutePanel from "@/components/map/route-panel";
import useRouteEngine from "@/hooks/useRouteEngine";

const LiveMap = dynamic(
  () => import("@/components/live/live-map"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center text-zinc-400">
        Loading map...
      </div>
    ),
  }
);

export default function MapPageClient() {

  // fetch routes whenever source/destination changes
  useRouteEngine();

  return (

    <>
      <div className="space-y-8">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold text-white">
              Bengaluru Traffic Command Center
            </h1>

            <p className="mt-2 text-zinc-400">
              Real-time routing, incidents, police deployment and diversions
            </p>

          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-3">

            <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />

            <span className="font-semibold text-green-400">
              LIVE
            </span>

          </div>

        </div>

        <div className="grid gap-8 xl:grid-cols-4">

          <div className="xl:col-span-3">

            <div className="h-[850px] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">

              <LiveMap />

            </div>

          </div>

          <RoutePanel />

        </div>

      </div>

    </>

  );

}