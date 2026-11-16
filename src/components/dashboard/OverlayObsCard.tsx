"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  buildOverlayUrl,
  formatOverlayUrlForDisplay,
  generateDemoOverlayToken,
  parseOverlayUrl,
} from "@/lib/overlay-url";
import { mockOverlayUrl } from "@/mock-data";

const OBS_STEPS = [
  "Dans OBS, ajoute une source « Navigateur ».",
  "Colle l'URL de l'overlay dans le champ dédié.",
  "Ajuste la taille de la source sur ta scène.",
  "Coche Contrôler l'audio via OBS",
] as const;

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function OverlayObsCard() {
  const [overlayUrl, setOverlayUrl] = useState(mockOverlayUrl);
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [confirmRegen, setConfirmRegen] = useState(false);
  const [testSent, setTestSent] = useState(false);

  const displayUrl = formatOverlayUrlForDisplay(overlayUrl, visible);

  const handleCopy = async () => {
    const ok = await copyText(overlayUrl);
    if (!ok) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const regenerate = useCallback(() => {
    const { origin, pathname } = parseOverlayUrl(overlayUrl);
    const next = buildOverlayUrl(origin, pathname, generateDemoOverlayToken());
    setOverlayUrl(next);
    setConfirmRegen(false);
    setVisible(false);
  }, [overlayUrl]);

  return (
    <Card title="Overlay OBS" halo interactive={false}>
      <div className="space-y-4">
        <p className="rounded-[12px] border border-white/10 bg-[#0a0a0b] px-3 py-2.5 font-mono text-xs break-all text-muted sm:text-sm">
          {displayUrl}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => setVisible((v) => !v)}>
            {visible ? "Masquer" : "Afficher"}
          </Button>
          <Button
            variant={copied ? "secondary" : "primary"}
            onClick={handleCopy}
          >
            {copied ? "Copié" : "Copier"}
          </Button>
          <Button
            variant="ghost"
            onClick={() => setConfirmRegen(true)}
            className="border border-white/10"
          >
            Régénérer le lien
          </Button>
        </div>

        {confirmRegen ? (
          <div className="rounded-[12px] border border-white/10 bg-white/[0.04] p-4">
            <p className="text-sm text-foreground">
              Régénérer le lien invalide l'ancienne URL dans OBS. Continuer ?
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button onClick={regenerate}>Confirmer</Button>
              <Button variant="secondary" onClick={() => setConfirmRegen(false)}>
                Annuler
              </Button>
            </div>
          </div>
        ) : null}

        <ol className="list-decimal space-y-2 pl-5 text-sm text-muted">
          {OBS_STEPS.map((step) => (
            <li key={step} className="text-foreground/90">
              {step}
            </li>
          ))}
        </ol>
        <div className="border-t border-white/[0.06] pt-4">
          <Button
            onClick={() => {
              setTestSent(true);
              window.setTimeout(() => setTestSent(false), 4000);
            }}
          >
            Envoyer une alerte test
          </Button>
          {testSent ? (
            <p
              className="mt-3 rounded-[12px] border border-white/[0.1] bg-white/[0.03] px-3 py-2 text-sm text-foreground"
              role="status"
            >
              Alerte test envoyée — elle devrait apparaître sur l'overlay.
            </p>
          ) : null}
        </div>
      </div>
    </Card>
  );
}