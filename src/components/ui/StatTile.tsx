import { formatEurosFromCents } from "@/lib/format-money";

type StatTileProps = {
  label: string;
  valueCents?: number;
  valueNumber?: number;
  formatAsMoney?: boolean;
  emphasis?: boolean;
  accent?: boolean;
  suffix?: string;
};

export function StatTile({
  label,
  valueCents,
  valueNumber,
  formatAsMoney = true,
  emphasis = false,
  accent = false,
  suffix = "",
}: StatTileProps) {
  const display =
    valueNumber !== undefined
      ? valueNumber.toLocaleString("fr-FR")
      : valueCents !== undefined && formatAsMoney
        ? formatEurosFromCents(valueCents)
        : "—";

  return (
    <article className="dashboard-card p-6">
      <p className="text-xs font-medium tracking-[0.12em] text-muted uppercase">
        {label}
      </p>
      <p
        className={`mt-3 font-mono tracking-tight tabular-nums ${
          emphasis
            ? "text-4xl sm:text-5xl"
            : accent
              ? "text-3xl text-accent sm:text-4xl"
              : "text-2xl text-foreground sm:text-3xl"
        }`}
      >
        {display}
        {suffix}
      </p>
    </article>
  );
}