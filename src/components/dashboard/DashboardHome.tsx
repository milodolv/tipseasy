"use client";

import { useMemo, useState } from "react";
import { Share2 } from "lucide-react";
import { RevenueAreaChart } from "@/components/charts/RevenueAreaChart";
import { ShareStatsModal } from "@/components/dashboard/ShareStatsModal";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatTile } from "@/components/ui/StatTile";
import { Tabs } from "@/components/ui/Tabs";
import { formatEurosFromCents } from "@/lib/format-money";
import { formatMinutesAgo } from "@/lib/time-ago";
import {
  PERIOD_OPTIONS,
  mockDashboardByPeriod,
  type PeriodKey,
} from "@/mock-data";

export function DashboardHome() {
  const [period, setPeriod] = useState<PeriodKey>("30d");
  const [shareOpen, setShareOpen] = useState(false);
  const data = mockDashboardByPeriod[period];
  const periodLabel =
    PERIOD_OPTIONS.find((p) => p.value === period)?.label ?? "";

  const deltaPct = useMemo(() => {
    if (data.previousRevenueCents <= 0) return 0;
    return (
      ((data.revenueCents - data.previousRevenueCents) /
        data.previousRevenueCents) *
      100
    );
  }, [data]);

  const goalPct = Math.min(
    100,
    Math.round((data.goalCurrentCents / data.goalTargetCents) * 100),
  );

  return (
    <div className="space-y-8">
      <PageHeader
        label="Vue d'ensemble"
        title="Dashboard"
        action={
          <Tabs
            options={PERIOD_OPTIONS}
            value={period}
            onChange={setPeriod}
          />
        }
      />

      <div className="dashboard-stagger space-y-8">
        <Card title="Revenus" halo interactive={false}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="font-mono text-4xl tracking-tight text-accent tabular-nums sm:text-5xl">
                <AnimatedNumber
                  value={data.revenueCents}
                  format={formatEurosFromCents}
                />
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span
                  className={`rounded-full border px-2 py-0.5 text-xs font-medium tabular-nums ${
                    deltaPct >= 0
                      ? "border-emerald-500/25 text-emerald-400"
                      : "border-red-400/25 text-red-300"
                  }`}
                >
                  {deltaPct >= 0 ? "+" : ""}
                  {deltaPct.toFixed(1)}%
                </span>
                <span className="text-sm text-muted">
                  vs période précédente
                </span>
              </div>
            </div>
            <Button
              variant="secondary"
              onClick={() => setShareOpen(true)}
              className="inline-flex shrink-0 gap-2"
            >
              <Share2 size={16} strokeWidth={1.5} aria-hidden />
              Partager mes stats
            </Button>
          </div>
          <div className="mt-8">
            <RevenueAreaChart data={data.series} />
          </div>
        </Card>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <StatTile
            label="Nombre de dons"
            valueNumber={data.donationsCount}
            formatAsMoney={false}
          />
          <StatTile
            label="Don moyen"
            valueCents={data.averageDonationCents}
          />
          <StatTile
            label="Plus gros don"
            valueCents={data.maxDonationCents}
          />
          <StatTile
            label="Nouveaux donateurs"
            valueNumber={data.newDonors}
            formatAsMoney={false}
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Card title="Top donateurs">
            <ol className="space-y-4">
              {data.topDonors.map((donor, index) => (
                <li
                  key={donor.pseudo}
                  className="flex items-center justify-between gap-4 text-sm"
                >
                  <span className="flex items-center gap-3 text-foreground">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] font-mono text-xs text-muted tabular-nums">
                      {index + 1}
                    </span>
                    {donor.pseudo}
                  </span>
                  <span className="font-mono tabular-nums text-foreground">
                    {formatEurosFromCents(donor.totalCents)}
                  </span>
                </li>
              ))}
            </ol>
          </Card>

          <Card title="Derniers dons">
            <ul className="divide-y divide-white/[0.06]">
              {data.recentDonations.map((donation) => (
                <li key={donation.id} className="flex gap-4 py-4 first:pt-0">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-sm font-medium text-foreground">
                        {donation.pseudo}
                      </p>
                      <p className="font-mono text-sm tabular-nums text-foreground">
                        {formatEurosFromCents(donation.amountCents)}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-muted">
                      {donation.message || "—"}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-muted">
                    {formatMinutesAgo(donation.dateIso)}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <Card title="Objectif du mois">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-2xl tabular-nums text-foreground">
                {formatEurosFromCents(data.goalCurrentCents)}
              </p>
              <p className="mt-1 text-sm text-muted">
                sur {formatEurosFromCents(data.goalTargetCents)} —{" "}
                {formatEurosFromCents(
                  Math.max(0, data.goalTargetCents - data.goalCurrentCents),
                )}{" "}
                restants
              </p>
            </div>
            <p className="font-mono text-sm text-muted tabular-nums">
              {goalPct}%
            </p>
          </div>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/[0.04]">
            <div
              className="h-full rounded-full bg-white/[0.22] transition-[width] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{ width: `${goalPct}%` }}
            />
          </div>
        </Card>
      </div>

      <ShareStatsModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        data={data}
        periodLabel={periodLabel}
      />
    </div>
  );
}