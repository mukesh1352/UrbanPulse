"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BarChart3, Brain, Activity, Map, History } from "lucide-react";

const links = [
  {
    href: "/",
    label: "Home",
    icon: Home,
  },
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
  {
    href: "/post_event",
    label: "Post-Event Review",
    icon: History,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen border-r border-zinc-800/60 bg-zinc-950 flex flex-col">
      <div className="px-6 py-6 border-b border-zinc-800/60">
        <span className="text-xl font-bold bg-linear-to-r from-white to-zinc-400 bg-clip-text text-transparent">
          EventFlow AI
        </span>
      </div>

      <nav className="flex flex-col gap-1 p-3">
        {links.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-zinc-900 text-white shadow-sm shadow-black/40"
                  : "text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-100"
              }`}
            >
              <Icon
                size={18}
                className={`shrink-0 transition-colors ${
                  isActive
                    ? "text-emerald-400"
                    : "text-zinc-500 group-hover:text-zinc-300"
                }`}
              />
              <span className="truncate">{item.label}</span>
              {isActive && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400" />
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}