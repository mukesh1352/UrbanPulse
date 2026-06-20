"use client";

import { useQuery } from "@tanstack/react-query";
import { getHourlyTrend } from "@/lib/intel-api";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function TrendChart() {

  const { data } = useQuery({
    queryKey:["trend"],
    queryFn:getHourlyTrend,
  });

  if(!data) return null;

  return (

    <div className="h-[300px]">

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="hour"/>
          <YAxis/>
          <Tooltip/>

          <Line
            dataKey="count"
            stroke="#22c55e"
            strokeWidth={3}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>

  );
}