"use client";

import { useLiveStore } from "@/store/live-store";

import {

  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip

} from "recharts";

export default function ActivityChart() {

  const events = useLiveStore(
    s=>s.events
  );

  const counts: Record<string, number> = {};

  events.forEach(

    (event)=>{

      counts[event.cluster] =
        (counts[event.cluster] || 0)+1;

    }

  );

  const data = Object.entries(
    counts
  ).map(

    ([cluster,count])=>({

      cluster,
      count

    })

  );

  return (

    <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">

      <h1 className="text-white text-xl font-bold mb-6">

        Cluster Activity

      </h1>

      <div className="h-[300px]">

        <ResponsiveContainer>

          <BarChart data={data}>

            <XAxis dataKey="cluster"/>

            <Tooltip/>

            <Bar dataKey="count"/>

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}