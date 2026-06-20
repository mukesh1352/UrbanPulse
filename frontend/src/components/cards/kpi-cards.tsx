"use client";

import { useQuery } from "@tanstack/react-query";
import { getSummary } from "@/lib/dashboard-api";
import { Card } from "@/components/ui/card";

export default function KpiCards() {
  const { data } = useQuery({
    queryKey: ["summary"],
    queryFn: getSummary,
  });

  if (!data) return null;

  const cards = [
    ["Total Incidents", data.total_incidents],
    ["High Priority", data.high_priority],
    ["Planned Events", data.planned_events],
    ["Hotspot Zones", data.clusters],
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {cards.map(([title, value]) => (
        <Card key={title} className="bg-zinc-900 border-zinc-800 p-6">
          <p className="text-zinc-400">{title}</p>

          <h1 className="text-3xl font-bold text-white mt-3">
            {value}
          </h1>
        </Card>
      ))}
    </div>
  );
}