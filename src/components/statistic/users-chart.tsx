"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface UsersChartProps {
  data?: Array<{
    date: string;
    newUsers: number;
    activeUsers: number;
  }>;
}

export function UsersChart({ data }: UsersChartProps) {
  if (!Array.isArray(data)) return null;

  const formattedData = data.map((item) => ({
    name: new Date(item.date).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "short",
    }),
    newUsers: item.newUsers,
    activeUsers: item.activeUsers,
  }));

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="newUsers"
            name="Новые пользователи"
            stroke="#3b82f6"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="activeUsers"
            name="Активные пользователи"
            stroke="#10b981"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
