
"use client";

import { useLiveStore } from "@/store/live-store";

export default function Hotspot() {

  const events = useLiveStore((s)=>s.events);

  const clusterCount: Record<number,number> = {};

  events.forEach((e)=>{

    clusterCount[e.cluster] =
      (clusterCount[e.cluster] || 0)
      + e.severity_score;

  });

  const top = Object.entries(clusterCount)
    .sort((a,b)=>Number(b[1])-Number(a[1]))
    .slice(0,5);

  return (

    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <h1 className="text-xl font-bold text-white mb-8">
        Dangerous Clusters
      </h1>

      <div className="space-y-6">

        {top.map(([cluster,score])=>(

          <div key={cluster}>

            <div className="flex justify-between">

              <h2 className="text-white">
                Cluster {cluster}
              </h2>

              <span className="text-red-400">
                {score}
              </span>

            </div>

            <div className="bg-zinc-800 h-2 rounded-full mt-2">

              <div
                style={{
                  width: `${Math.min(Number(score),50)*2}%`
                }}
                className="
                bg-red-500
                h-2
                rounded-full
                "
              />

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}