"use client";

import { Pie, PieChart, ResponsiveContainer, Cell } from "recharts";

type Slice = { method: string; percent: number };

const COLORS = ["#52525b", "#71717a", "#a1a1aa"];

export function PaymentMethodsRing({ data }: { data: Slice[] }) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
      <div className="chart-enter mx-auto h-[180px] w-[180px] sm:mx-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="percent"
              nameKey="method"
              innerRadius={52}
              outerRadius={72}
              strokeWidth={0}
              animationDuration={600}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="flex-1 space-y-3">
        {data.map((item, index) => (
          <li
            key={item.method}
            className="flex items-center justify-between gap-4 text-sm"
          >
            <span className="flex items-center gap-2 text-foreground">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              {item.method}
            </span>
            <span className="font-mono text-muted tabular-nums">
              {item.percent}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}