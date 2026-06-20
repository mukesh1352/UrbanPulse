"use client";

import { useLiveStore } from "@/store/live-store";
import {
  Activity,
  AlertTriangle,
  Flame,
  Radar,
} from "lucide-react";

export default function LiveStats() {
  const events = useLiveStore((s) => s.events);

  const cards = [
    {
      title: "Active Events",
      value: events.length,
      icon: Activity,
      color: "text-blue-400",
    },
    {
      title: "High Priority",
      value: events.filter(
        (e) => e.priority === "High"
      ).length,
      icon: AlertTriangle,
      color: "text-red-400",
    },
    {
      title: "Hotspots",
      value: new Set(events.map((e) => e.cluster)).size,
      icon: Flame,
      color: "text-orange-400",
    },
    {
      title: "Anomalies",
      value: events.filter(
        (e) => e.severity_score >= 4
      ).length,
      icon: Radar,
      color: "text-purple-400",
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
        >
          <div className="flex justify-between">
            <p className="text-zinc-400">
              {card.title}
            </p>

            <card.icon className={card.color} />
          </div>

          <h1 className="mt-4 text-4xl font-bold text-white">
            {card.value}
          </h1>
        </div>
      ))}
    </div>
  );
}