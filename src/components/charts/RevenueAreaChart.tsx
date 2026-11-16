"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
type Point = { label: string; cents: number };

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { value: number; payload: Point }[];
}) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-[12px] border border-white/[0.1] bg-white/[0.06] px-3 py-2 text-sm backdrop-blur-md">
      <p className="text-muted">{item.payload.label}</p>
      <p className="font-mono text-foreground tabular-nums">
        {new Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: "EUR",
        }).format(item.value)}
      </p>
    </div>
  );
}

export function RevenueAreaChart({ data }: { data: Point[] }) {
  const series = data.map((d) => ({ ...d, euros: d.cents / 100 }));

  return (
    <div className="chart-enter h-[220px] w-full sm:h-[260px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={series} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity={0} />
            </linearGradient>
          </defs>
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
            dy={8}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke: "rgba(255,255,255,0.08)" }} />
          <Area
            type="monotone"
            dataKey="euros"
            stroke="#38bdf8"
            strokeWidth={1.5}
            fill="url(#revenueFill)"
            isAnimationActive
            animationDuration={600}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}