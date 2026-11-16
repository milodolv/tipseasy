"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { NOM } from "@/config";
import { formatEurosFromCents } from "@/lib/format-money";
import { mockStreamer, type DashboardPeriodData } from "@/mock-data";
import { Button } from "@/components/ui/Button";

type ShareStatsModalProps = {
  open: boolean;
  onClose: () => void;
  data: DashboardPeriodData;
  periodLabel: string;
};

export function ShareStatsModal({
  open,
  onClose,
  data,
  periodLabel,
}: ShareStatsModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const delta =
    data.previousRevenueCents > 0
      ? ((data.revenueCents - data.previousRevenueCents) /
          data.previousRevenueCents) *
        100
      : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center">
      <div
        role="dialog"
        aria-modal
        className="w-full max-w-md rounded-[16px] border border-white/[0.1] bg-[#0f1012] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.14em] text-muted uppercase">{NOM}</p>
            <p className="mt-1 text-sm text-foreground">{mockStreamer.displayName}</p>
            <p className="text-xs text-muted">{periodLabel}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/[0.08] p-2 text-muted transition-colors hover:text-foreground"
            aria-label="Fermer"
          >
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>
        <p className="font-mono text-5xl tracking-tight text-accent tabular-nums">
          {formatEurosFromCents(data.revenueCents)}
        </p>
        <p className="mt-2 text-sm text-muted">Revenus</p>
        <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-white/[0.08] pt-6 text-sm">
          <div>
            <dt className="text-muted">Dons</dt>
            <dd className="mt-1 font-mono tabular-nums">{data.donationsCount}</dd>
          </div>
          <div>
            <dt className="text-muted">Don moyen</dt>
            <dd className="mt-1 font-mono tabular-nums">
              {formatEurosFromCents(data.averageDonationCents)}
            </dd>
          </div>
          <div>
            <dt className="text-muted">Variation</dt>
            <dd className="mt-1 font-mono tabular-nums">
              {delta >= 0 ? "+" : ""}
              {delta.toFixed(1)}%
            </dd>
          </div>
          <div>
            <dt className="text-muted">Nouveaux donateurs</dt>
            <dd className="mt-1 font-mono tabular-nums">{data.newDonors}</dd>
          </div>
        </dl>
        <Button variant="secondary" className="mt-6 w-full" onClick={onClose}>
          Fermer (capture factice)
        </Button>
      </div>
    </div>
  );
}