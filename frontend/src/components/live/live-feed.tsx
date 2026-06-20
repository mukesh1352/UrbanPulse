"use client";

import { useLiveStore } from "@/store/live-store";

export default function LiveFeed() {

  const events = useLiveStore(
    (s) => s.events
  );

  return (

    <div className="h-[550px] overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <h1 className="mb-6 text-xl font-bold text-white">

        Incoming Events

      </h1>

      <div className="space-y-4">

        {

          events.map((event, index) => (

            <div
              key={`${event.timestamp}-${index}`}
              className="
              rounded-xl
              border border-zinc-800
              bg-zinc-950
              p-4
              transition
              hover:border-blue-500
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="font-semibold text-white">

                    {event.event_cause}

                  </h2>

                  <p className="text-zinc-500 text-sm mt-1">

                    Cluster {event.cluster}

                  </p>

                </div>

                <div
                  className={
                    event.priority === "High"

                      ? "rounded-full bg-red-500/20 px-3 py-1 text-red-400"

                      : event.priority === "Medium"

                      ? "rounded-full bg-yellow-500/20 px-3 py-1 text-yellow-400"

                      : "rounded-full bg-green-500/20 px-3 py-1 text-green-400"
                  }
                >

                  {event.priority}

                </div>

              </div>

              <div className="mt-4 flex justify-between text-sm">

                <span className="text-zinc-400">

                  Severity {event.severity_score}

                </span>

                <span className="text-blue-400">

                  {event.timestamp}

                </span>

              </div>

            </div>

          ))

        }

      </div>

    </div>

  );

}