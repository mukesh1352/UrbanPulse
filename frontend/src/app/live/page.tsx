"use client";

import dynamic from "next/dynamic";

import LiveStats from "@/components/live/live-stats";
import LiveFeed from "@/components/live/live-feed";
import Timeline from "@/components/live/timeline";
import Insights from "@/components/live/insights";
import Hotspot from "@/components/live/hotspot";
import SeverityChart from "@/components/live/severity-chart";

const LiveMap = dynamic(
  () => import("@/components/live/live-map"),
  {
    ssr: false,
  }
);

export default function LivePage() {
  return (
    <>
      <div className="space-y-8">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold text-white">
              Live Operations Center
            </h1>

            <p className="mt-2 text-zinc-400">
              Real-time Bengaluru Traffic Intelligence
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-3">
            <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />

            <span className="font-semibold text-green-400">
              LIVE
            </span>
          </div>

        </div>

        <LiveStats />

        <div className="grid gap-8 lg:grid-cols-3">

          <div className="lg:col-span-2">
            <LiveFeed />
          </div>

          <Insights />

        </div>

        <div className="grid gap-8 lg:grid-cols-2">

          <Timeline />

          <Hotspot />

        </div>

        <div className="grid gap-8 lg:grid-cols-2">

          <SeverityChart />

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 h-[350px]">

            <h1 className="mb-8 text-xl font-bold text-white">
              Event Distribution
            </h1>

            <div className="flex h-full items-center justify-center text-zinc-500">
              Pie Chart Coming Soon
            </div>

          </div>

        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

          <h1 className="mb-8 text-2xl font-bold text-white">
            Bengaluru Traffic Map
          </h1>

          <div className="h-[650px] overflow-hidden rounded-xl border border-zinc-800">
  <LiveMap />
</div>

        </div>

      </div>
    </>
  );
}