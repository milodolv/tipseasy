"use client";

import { useState } from "react";
import { OverlayObsCard } from "@/components/dashboard/OverlayObsCard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { Toggle } from "@/components/ui/Toggle";
import {
  eurosInputToCents,
  formatEurosFromCents,
} from "@/lib/format-money";
import {
  mockAlerts,
  mockDonationGoalCents,
  mockDonationGoalCurrentCents,
  mockMinimumDonationCents,
  mockSuggestedAmountsCents,
  mockThankYouMessage,
  mockWidgetDonorsUrl,
  mockWidgetGoalUrl,
  type StreamerAlert,
} from "@/mock-data";

function centsToEuroInput(cents: number) {
  return String(cents / 100).replace(".", ",");
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function WidgetCopyRow({ label, url }: { label: string; url: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium tracking-[0.12em] text-muted uppercase">
        {label}
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <p className="min-w-0 flex-1 rounded-[12px] border border-white/[0.08] bg-[#0a0a0b] px-3 py-2 font-mono text-xs break-all text-muted">
          {url}
        </p>
        <Button
          variant="secondary"
          onClick={async () => {
            const ok = await copyText(url);
            if (!ok) return;
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
          }}
        >
          {copied ? "Copié" : "Copier"}
        </Button>
      </div>
    </div>
  );
}

export default function StreamingPage() {
  const [alerts, setAlerts] = useState<StreamerAlert[]>(mockAlerts);
  const [amountsCents, setAmountsCents] = useState<number[]>([
    ...mockSuggestedAmountsCents,
  ]);
  const [minimumCents, setMinimumCents] = useState(mockMinimumDonationCents);
  const [thankYou, setThankYou] = useState(mockThankYouMessage);
  const [goalCurrent, setGoalCurrent] = useState(mockDonationGoalCurrentCents);
  const [goalTarget, setGoalTarget] = useState(mockDonationGoalCents);
  const [showForm, setShowForm] = useState(false);
  const [formImage, setFormImage] = useState("");
  const [formSound, setFormSound] = useState("");
  const [formPrice, setFormPrice] = useState("5");
  const [previewText, setPreviewText] = useState("Nouveau don — merci !");
  const [previewDuration, setPreviewDuration] = useState("6");
  const [previewVolume, setPreviewVolume] = useState("80");

  const toggleAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a)),
    );
  };

  const addAlert = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const priceCents = eurosInputToCents(formPrice) ?? 500;
    setAlerts((prev) => [
      ...prev,
      {
        id: `a_${Date.now()}`,
        imageLabel: formImage.trim() || "Nouvelle image",
        soundLabel: formSound.trim() || "Nouveau son",
        priceCents,
        active: true,
      },
    ]);
    setFormImage("");
    setFormSound("");
    setFormPrice("5");
    setShowForm(false);
  };

  const goalPct = Math.min(100, Math.round((goalCurrent / goalTarget) * 100));

  return (
    <div className="space-y-8">
      <PageHeader
        label="Diffusion"
        title="Streaming"
        description="Overlay, alertes, page de don et widgets pour OBS."
      />

      <div className="dashboard-stagger space-y-8">
        <OverlayObsCard />

        <Card title="Alertes">
          <ul className="divide-y divide-white/[0.06]">
            {alerts.map((alert) => (
              <li
                key={alert.id}
                className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {alert.imageLabel}
                  </p>
                  <p className="text-sm text-muted">Son : {alert.soundLabel}</p>
                  <p className="mt-1 font-mono text-sm tabular-nums text-foreground">
                    {formatEurosFromCents(alert.priceCents)}
                  </p>
                </div>
                <Toggle
                  checked={alert.active}
                  onChange={() => toggleAlert(alert.id)}
                  label={alert.active ? "Actif" : "Inactif"}
                />
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-white/[0.06] pt-6">
            <Button variant="secondary" onClick={() => setShowForm((v) => !v)}>
              {showForm ? "Fermer" : "Ajouter une alerte"}
            </Button>
            {showForm ? (
              <form
                onSubmit={addAlert}
                className="mt-4 space-y-3 rounded-[12px] border border-white/[0.08] bg-white/[0.02] p-4"
              >
                <input
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  placeholder="Image"
                  className="w-full rounded-[12px] border border-white/[0.08] bg-[#0a0a0b] px-3 py-2 text-sm outline-none focus-visible:border-[#38bdf8]/50"
                />
                <input
                  value={formSound}
                  onChange={(e) => setFormSound(e.target.value)}
                  placeholder="Son"
                  className="w-full rounded-[12px] border border-white/[0.08] bg-[#0a0a0b] px-3 py-2 text-sm outline-none"
                />
                <input
                  value={formPrice}
                  onChange={(e) => setFormPrice(e.target.value)}
                  placeholder="Prix (€)"
                  className="w-full rounded-[12px] border border-white/[0.08] bg-[#0a0a0b] px-3 py-2 font-mono text-sm outline-none"
                />
                <Button type="submit">Enregistrer (factice)</Button>
              </form>
            ) : null}
          </div>

          <div className="mt-8 border-t border-white/[0.06] pt-8">
            <p className="text-xs font-medium tracking-[0.12em] text-muted uppercase">
              Aperçu en direct
            </p>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <div>
                <label className="text-sm text-muted">Texte</label>
                <input
                  value={previewText}
                  onChange={(e) => setPreviewText(e.target.value)}
                  className="mt-1 w-full rounded-[12px] border border-white/[0.08] bg-[#0a0a0b] px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm text-muted">Durée (s)</label>
                <input
                  value={previewDuration}
                  onChange={(e) => setPreviewDuration(e.target.value)}
                  className="mt-1 w-full rounded-[12px] border border-white/[0.08] bg-[#0a0a0b] px-3 py-2 font-mono text-sm"
                />
              </div>
              <div>
                <label className="text-sm text-muted">Volume</label>
                <input
                  value={previewVolume}
                  onChange={(e) => setPreviewVolume(e.target.value)}
                  className="mt-1 w-full rounded-[12px] border border-white/[0.08] bg-[#0a0a0b] px-3 py-2 font-mono text-sm"
                />
              </div>
              <div className="rounded-[12px] border border-white/[0.08] bg-[#0a0a0b] p-4">
                <p className="text-xs text-muted">Couleur</p>
                <div
                  className="mt-3 h-10 rounded-[8px] border border-white/[0.08]"
                  style={{ backgroundColor: "rgb(255 255 255 / 0.12)" }}
                />
              </div>
            </div>
            <div className="mt-4 rounded-[12px] border border-white/[0.08] bg-white/[0.03] p-4">
              <p className="text-sm text-foreground">{previewText}</p>
            </div>
          </div>
        </Card>

        <Card title="Page de don">
          <div className="grid gap-4 sm:grid-cols-3">
            {amountsCents.map((cents, index) => (
              <div key={index}>
                <label className="text-xs font-medium tracking-[0.12em] text-muted uppercase">
                  Montant {index + 1}
                </label>
                <input
                  defaultValue={centsToEuroInput(cents)}
                  onBlur={(e) => {
                    const v = eurosInputToCents(e.target.value);
                    if (v === null) return;
                    setAmountsCents((prev) => {
                      const next = [...prev];
                      next[index] = v;
                      return next;
                    });
                  }}
                  className="mt-1 w-full rounded-[12px] border border-white/[0.08] bg-[#0a0a0b] px-3 py-2 font-mono text-sm"
                />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <label className="text-xs font-medium tracking-[0.12em] text-muted uppercase">
              Minimum
            </label>
            <input
              defaultValue={centsToEuroInput(minimumCents)}
              onBlur={(e) => {
                const v = eurosInputToCents(e.target.value);
                if (v !== null) setMinimumCents(v);
              }}
              className="mt-1 w-full max-w-xs rounded-[12px] border border-white/[0.08] bg-[#0a0a0b] px-3 py-2 font-mono text-sm"
            />
          </div>
          <div className="mt-4">
            <label className="text-xs font-medium tracking-[0.12em] text-muted uppercase">
              Message de remerciement
            </label>
            <textarea
              value={thankYou}
              onChange={(e) => setThankYou(e.target.value)}
              rows={3}
              className="mt-1 w-full rounded-[12px] border border-white/[0.08] bg-[#0a0a0b] px-3 py-2 text-sm"
            />
          </div>
          <div className="mt-6">
            <label className="text-xs font-medium tracking-[0.12em] text-muted uppercase">
              Objectif
            </label>
            <p className="mt-2 font-mono text-lg tabular-nums">
              {formatEurosFromCents(goalCurrent)} /{" "}
              {formatEurosFromCents(goalTarget)}
            </p>
            <input
              type="range"
              min={0}
              max={goalTarget}
              value={goalCurrent}
              onChange={(e) => setGoalCurrent(Number(e.target.value))}
              className="mt-3 w-full"
            />
            <div
              className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.04]"
            >
              <div
                className="h-full rounded-full bg-white/[0.22] transition-[width] duration-300"
                style={{ width: `${goalPct}%` }}
              />
            </div>
          </div>
        </Card>

        <Card title="Widgets">
          <div className="space-y-6">
            <WidgetCopyRow
              label="Derniers donateurs"
              url={mockWidgetDonorsUrl}
            />
            <WidgetCopyRow label="Barre d'objectif" url={mockWidgetGoalUrl} />
          </div>
        </Card>
      </div>
    </div>
  );
}
