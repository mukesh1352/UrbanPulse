"use client";

import { useLiveStore } from "@/store/live-store";

export default function Insights() {

  const events = useLiveStore((s)=>s.events);

  const dangerous = events.filter(
    (e)=>e.severity_score===4
  );

  const cluster =
    dangerous[0]?.cluster ?? "-";

  return (

    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <h1 className="text-xl font-bold text-white mb-8">
        AI Insights
      </h1>

      <div className="space-y-6">

        <div>

          <h2 className="text-red-400 font-semibold">
            🔥 Cluster {cluster}
          </h2>

          <p className="text-zinc-400 mt-2">
            Risk Score {dangerous.length * 4}
          </p>

        </div>

        <div>

          <h2 className="text-orange-400">
            Recommendation
          </h2>

          <p className="text-zinc-400 mt-2">
            Traffic diversion advised.
          </p>

        </div>

        <div>

          <h2 className="text-green-400">
            Severity Trend
          </h2>

          <p className="text-zinc-400 mt-2">
            Increasing
          </p>

        </div>

      </div>

    </div>

  );

}