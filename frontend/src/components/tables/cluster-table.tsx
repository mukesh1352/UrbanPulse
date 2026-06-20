"use client";

import { useQuery } from "@tanstack/react-query";
import { getClusters } from "@/lib/dashboard-api";

export default function ClusterTable() {
  const { data } = useQuery({
    queryKey: ["clusters"],
    queryFn: getClusters,
  });

  if (!data) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900 text-zinc-300">
            <tr>
              <th className="px-5 py-4 text-left font-semibold">
                Cluster
              </th>
              <th className="px-5 py-4 text-left font-semibold">
                Incidents
              </th>
              <th className="px-5 py-4 text-left font-semibold">
                Severity
              </th>
              <th className="px-5 py-4 text-left font-semibold">
                High Ratio
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((row: any) => (
              <tr
                key={row.cluster}
                className="border-t border-zinc-800 transition-colors hover:bg-zinc-900/70"
              >
                <td className="px-5 py-4 font-medium text-zinc-100">
                  {row.cluster}
                </td>

                <td className="px-5 py-4 text-zinc-300">
                  {row.incidents}
                </td>

                <td className="px-5 py-4">
                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                    {row.avg_severity.toFixed(2)}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      row.high_priority_ratio >= 0.5
                        ? "bg-red-500/10 text-red-400"
                        : row.high_priority_ratio >= 0.25
                        ? "bg-yellow-500/10 text-yellow-400"
                        : "bg-green-500/10 text-green-400"
                    }`}
                  >
                    {(row.high_priority_ratio * 100).toFixed(1)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}