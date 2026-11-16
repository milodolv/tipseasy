"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { formatOverlayUrlForDisplay } from "@/lib/overlay-url";
import { mockDonationPageUrl, mockOverlayUrl, mockStreamer } from "@/mock-data";

export default function ParametresPage() {
  const [pseudo, setPseudo] = useState<string>(mockStreamer.pseudo);
  const [loggedOut, setLoggedOut] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const overlayDisplay = formatOverlayUrlForDisplay(mockOverlayUrl, false).replace(
    mockStreamer.pseudo,
    pseudo.trim() || mockStreamer.pseudo,
  );
  const donationPage = mockDonationPageUrl.replace(
    mockStreamer.pseudo,
    pseudo.trim() || mockStreamer.pseudo,
  );

  const fieldClass =
    "mt-1 w-full max-w-md rounded-[12px] border border-white/[0.08] bg-[#0a0a0b] px-3 py-2 text-sm outline-none focus-visible:border-[#38bdf8]/50";

  return (
    <div className="space-y-8">
      <PageHeader label="Compte" title="Paramètres" />

      <div className="dashboard-stagger space-y-8">
        <Card title="Profil">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium tracking-[0.12em] text-muted uppercase">
                Pseudo
              </label>
              <input
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
                className={fieldClass}
              />
            </div>
            <div>
              <label className="text-xs font-medium tracking-[0.12em] text-muted uppercase">
                Adresse de la page de don
              </label>
              <p className={`${fieldClass} font-mono text-muted break-all`}>
                {donationPage}
              </p>
            </div>
            <div>
              <label className="text-xs font-medium tracking-[0.12em] text-muted uppercase">
                Email
              </label>
              <p className={`${fieldClass} text-muted`}>{mockStreamer.email}</p>
            </div>
            <div>
              <label className="text-xs font-medium tracking-[0.12em] text-muted uppercase">
                Chaîne Twitch connectée
              </label>
              <p className={`${fieldClass} text-foreground`}>
                {mockStreamer.twitchChannel}
              </p>
            </div>
          </div>
        </Card>

        <Card title="Lien overlay">
          <p className="rounded-[12px] border border-white/[0.08] bg-[#0a0a0b] px-3 py-2.5 font-mono text-xs break-all text-muted sm:text-sm">
            {overlayDisplay}
          </p>
        </Card>

        <Card>
          <Button variant="secondary" onClick={() => setLoggedOut(true)}>
            Se déconnecter
          </Button>
          {loggedOut ? (
            <p className="mt-3 text-sm text-muted" role="status">
              Déconnexion simulée.
            </p>
          ) : null}
        </Card>

        <Card title="Zone danger">
          <p className="text-sm text-muted">
            Cette action est factice et ne supprime aucune donnée.
          </p>
          {!confirmDelete ? (
            <Button
              variant="danger"
              className="mt-4"
              onClick={() => setConfirmDelete(true)}
            >
              Supprimer mon compte
            </Button>
          ) : (
            <div className="mt-4 space-y-3">
              <p className="text-sm text-foreground">
                Confirmer la suppression du compte ?
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="danger"
                  onClick={() => {
                    setDeleted(true);
                    setConfirmDelete(false);
                  }}
                >
                  Confirmer
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setConfirmDelete(false)}
                >
                  Annuler
                </Button>
              </div>
            </div>
          )}
          {deleted ? (
            <p className="mt-3 text-sm text-muted" role="status">
              Suppression simulée.
            </p>
          ) : null}
        </Card>
      </div>
    </div>
  );
}