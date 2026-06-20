"use client";

import { useQuery } from "@tanstack/react-query";
import { getEventCauses } from "@/lib/dashboard-api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function EventCausesChart() {
  const { data } = useQuery({
    queryKey: ["causes"],
    queryFn: getEventCauses,
  });

  if (!data) return null;

  return (
    <div className="h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="cause" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}