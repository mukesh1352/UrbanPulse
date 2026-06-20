"use client";

import { useQuery } from "@tanstack/react-query";
import { getHotspots } from "@/lib/intel-api";

interface HotspotRow {
  cluster: string;
  incidents: number;
  risk_score: number;
}

export default function HotspotTable() {

  const { data } = useQuery({
    queryKey: ["hotspots"],
    queryFn: getHotspots,
  });

  if (!data) return null;

  return (
    <table className="w-full">

      <thead>
        <tr>
          <th>Cluster</th>
          <th>Incidents</th>
          <th>Risk Score</th>
        </tr>
      </thead>

      <tbody>
        {data.map((row: HotspotRow)=>(
          <tr
            key={row.cluster}
            className="border-b border-zinc-800"
          >
            <td>{row.cluster}</td>
            <td>{row.incidents}</td>
            <td>{row.risk_score.toFixed(0)}</td>
          </tr>
        ))}
      </tbody>

    </table>
  );
}

