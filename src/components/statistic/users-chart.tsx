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

const data = [
  { name: "1 Апр", newUsers: 25, activeUsers: 320 },
  { name: "8 Апр", newUsers: 30, activeUsers: 345 },
  { name: "15 Апр", newUsers: 22, activeUsers: 360 },
  { name: "22 Апр", newUsers: 28, activeUsers: 380 },
  { name: "29 Апр", newUsers: 35, activeUsers: 410 },
  { name: "6 Май", newUsers: 40, activeUsers: 445 },
  { name: "13 Май", newUsers: 32, activeUsers: 470 },
  { name: "20 Май", newUsers: 38, activeUsers: 500 },
  { name: "27 Май", newUsers: 45, activeUsers: 540 },
];

export function UsersChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
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
