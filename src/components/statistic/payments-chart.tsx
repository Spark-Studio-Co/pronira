"use client";

import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "1 Май", revenue: 15000, payments: 12 },
  { name: "2 Май", revenue: 12000, payments: 10 },
  { name: "3 Май", revenue: 18000, payments: 15 },
  { name: "4 Май", revenue: 14000, payments: 11 },
  { name: "5 Май", revenue: 22000, payments: 18 },
  { name: "6 Май", revenue: 19000, payments: 16 },
  { name: "7 Май", revenue: 23000, payments: 19 },
  { name: "8 Май", revenue: 25000, payments: 20 },
  { name: "9 Май", revenue: 21000, payments: 17 },
  { name: "10 Май", revenue: 28000, payments: 22 },
];

export function PaymentsChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
          <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="revenue"
            name="Доход (₽)"
            stroke="#3b82f6"
            strokeWidth={2}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="payments"
            name="Количество платежей"
            stroke="#10b981"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
