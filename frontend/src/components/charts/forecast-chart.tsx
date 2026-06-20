"use client";

import { useQuery } from "@tanstack/react-query";
import { getForecast } from "@/lib/intel-api";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function ForecastChart() {
  const { data } = useQuery({
    queryKey: ["forecast"],
    queryFn: getForecast,
  });

  if (!data) return null;

  return (
    <div className="h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="forecast"
            stroke="#3b82f6"
            fill="#3b82f6"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}