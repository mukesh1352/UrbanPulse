"use client";

import Link from "next/link";
import { BarChart3, Brain, Activity, Map } from "lucide-react";

const links = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: BarChart3,
  },
  {
    href: "/intel",
    label: "Intelligence Center",
    icon: Brain,
  },
  {
    href: "/live",
    label: "Live Operations",
    icon: Activity,
  },
  {
    href: "/map",
    label: "Map Center",
    icon: Map,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-zinc-950 min-h-screen">
      <div className="p-6 text-xl font-bold text-white">
        EventFlow AI
      </div>

      <div className="flex flex-col gap-2 p-3">
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-xl p-3 text-zinc-300 hover:bg-zinc-900 transition"
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}