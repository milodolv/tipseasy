"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { formatEurosFromCents } from "@/lib/format-money";
import {
  mockAvailableBalanceCents,
  mockFeesSummary,
  mockPayouts,
} from "@/mock-data";

type AccountState = "pending" | "verified" | "withdrawals";

const stateLabels: Record<AccountState, string> = {
  pending: "En attente",
  verified: "Vérifié",
  withdrawals: "Retraits possibles",
};

function formatPayoutDate(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium" }).format(
    new Date(iso),
  );
}

export default function PaiementsPage() {
  const [state, setState] = useState<AccountState>("pending");
  const [connected, setConnected] = useState(false);

  const connect = () => {
    setConnected(true);
    setState((prev) => {
      if (prev === "pending") return "verified";
      if (prev === "verified") return "withdrawals";
      return prev;
    });
  };

  return (
    <div className="space-y-8">
      <PageHeader
        label="Stripe"
        title="Paiements"
        description="Compte factice, solde et versements."
      />

      <div className="dashboard-stagger space-y-8">
        <Card title="État du compte" halo interactive={false}>
          <p className="inline-flex rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-sm font-medium">
            {stateLabels[state]}
          </p>
          <div className="mt-6">
            <Button onClick={connect} disabled={state === "withdrawals"}>
              {state === "withdrawals"
                ? "Paiements connectés (factice)"
                : "Connecter mes paiements"}
            </Button>
            {connected ? (
              <p className="mt-3 text-sm text-muted" role="status">
                Connexion simulée — aucun appel réseau.
              </p>
            ) : null}
          </div>
        </Card>

        <Card title="Solde disponible">
          <p className="font-mono text-4xl tracking-tight text-foreground tabular-nums sm:text-5xl">
            {formatEurosFromCents(mockAvailableBalanceCents)}
          </p>
          <p className="mt-2 text-sm text-muted">{mockFeesSummary}</p>
        </Card>

        <Card title="Historique des versements">
          <ul className="divide-y divide-white/[0.06]">
            {mockPayouts.map((payout) => (
              <li
                key={payout.id}
                className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="font-mono text-sm tabular-nums text-foreground">
                    {formatEurosFromCents(payout.amountCents)}
                  </p>
                  <p className="text-sm text-muted">
                    {formatPayoutDate(payout.dateIso)}
                  </p>
                </div>
                <span className="rounded-full border border-white/[0.08] px-2.5 py-1 text-xs text-muted">
                  {payout.status === "paid" ? "Versé" : "En cours"}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}