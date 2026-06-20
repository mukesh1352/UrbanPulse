"use client";

import { useQuery } from "@tanstack/react-query";
import { getPriority } from "@/lib/dashboard-api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#ef4444", "#f59e0b", "#22c55e"];

export default function PriorityChart() {
  const { data } = useQuery({
    queryKey: ["priority"],
    queryFn: getPriority,
  });

  if (!data) return null;

  return (
    <div className="h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="count" label>
            {data.map((_: any, index: number) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}