"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

type Point = { label: string; visits: number; payments: number };

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { dataKey: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-[12px] border border-white/[0.1] bg-white/[0.06] px-3 py-2 text-sm backdrop-blur-md">
      <p className="mb-1 text-muted">{label}</p>
      {payload.map((item) => (
        <p key={item.dataKey} className="font-mono tabular-nums text-foreground">
          {item.dataKey === "visits" ? "Visites" : "Paiements"} : {item.value}
        </p>
      ))}
    </div>
  );
}

export function VisitsPaymentsChart({ data }: { data: Point[] }) {
  return (
    <div className="chart-enter h-[240px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid
            stroke="rgba(255,255,255,0.04)"
            vertical={false}
            strokeDasharray="4 8"
          />
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#a1a1aa", fontSize: 11 }}
          />
          <Tooltip content={<ChartTooltip />} />
          <Line
            type="monotone"
            dataKey="visits"
            stroke="#a1a1aa"
            strokeWidth={1.5}
            dot={false}
            animationDuration={600}
          />
          <Line
            type="monotone"
            dataKey="payments"
            stroke="#f4f4f5"
            strokeWidth={1.5}
            dot={false}
            animationDuration={600}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}