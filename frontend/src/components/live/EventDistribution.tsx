"use client";

import { PieChart,Pie,Cell,Tooltip,ResponsiveContainer } from "recharts";
import { useLiveStore } from "@/store/live-store";

export default function EventDistribution(){

    const events = useLiveStore(
        s=>s.events
    );

    const trafficJam = events.filter(
        e=>e.event_cause==="traffic_jam"
    ).length;

    const laneClosed = events.filter(
        e=>e.event_cause==="lane_closed"
    ).length;

    const data = [
        {
            name:"Traffic Jam",
            value:trafficJam
        },
        {
            name:"Lane Closed",
            value:laneClosed
        }
    ];

    return(

<div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 h-[350px]">

<h1 className="text-xl font-bold text-white mb-8">
Event Distribution
</h1>

<ResponsiveContainer width="100%" height="80%">

<PieChart>

<Pie
data={data}
dataKey="value"
outerRadius={100}
>

<Cell fill="#ef4444"/>
<Cell fill="#f59e0b"/>

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

</div>

    );
}