"use client";

import { useLiveStore } from "@/store/live-store";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

export default function SeverityChart() {
  const events = useLiveStore(
    (s) => s.events
  );

  const data = events
    .slice(0, 20)
    .reverse()
    .map((e) => ({
      time: e.timestamp,
      severity: e.severity_score,
    }));

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 h-[350px] min-w-0">

      <h1 className="mb-8 text-xl font-bold text-white">
        Severity Trend
      </h1>

      <div className="h-[220px] w-full min-w-0">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={data}>

            <XAxis dataKey="time" />

            <Tooltip />

            <Area
              dataKey="severity"
              stroke="#3b82f6"
              fill="#3b82f6"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}