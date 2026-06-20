"use client";

import { useQuery } from "@tanstack/react-query";
import { getHourly } from "@/lib/dashboard-api";

import {
  LineChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

export default function HourlyChart() {
  const { data } = useQuery({
    queryKey: ["hourly"],
    queryFn: getHourly,
  });

  if (!data) return null;

  return (
    <div className="h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#22c55e"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}