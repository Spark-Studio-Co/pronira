"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface UserActivityChartProps {
  data?: {
    active: number;
    inactive: number;
    trial: number;
  };
}

export function UserActivityChart({ data }: UserActivityChartProps) {
  const pieData = data
    ? [
        { name: "Активные", value: data.active, color: "#10b981" },
        { name: "Неактивные", value: data.inactive, color: "#6b7280" },
        { name: "Пробный период", value: data.trial, color: "#3b82f6" },
      ]
    : [];

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${value} пользователей`, "Количество"]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
