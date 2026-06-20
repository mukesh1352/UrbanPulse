"use client";

import { useLiveStore } from "@/store/live-store";

export default function Timeline() {
  const events = useLiveStore((s) => s.events);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 h-[500px] overflow-y-auto">

      <h1 className="text-xl font-bold text-white mb-8">
        Timeline
      </h1>

      <div className="relative border-l border-blue-500 pl-8 space-y-8">

        {events.slice(0,15).map((event,index)=>(

          <div key={`${event.timestamp}-${index}`} className="relative">

            <div className="absolute -left-[37px] h-4 w-4 rounded-full bg-blue-500" />

            <p className="text-sm text-blue-400">
              {event.timestamp}
            </p>

            <h2 className="font-semibold text-white">
              {event.event_cause}
            </h2>

            <p className="text-zinc-500">
              Cluster {event.cluster}
            </p>

            <p className="text-red-400">
              Severity {event.severity_score}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}