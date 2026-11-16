"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusPill } from "@/components/ui/StatusPill";
import { Toggle } from "@/components/ui/Toggle";
import { mockBotDefaults } from "@/mock-data";
import { formatEurosFromCents } from "@/lib/format-money";

export default function BotPage() {
  const [botActive, setBotActive] = useState<boolean>(mockBotDefaults.active);
  const [connected] = useState<boolean>(mockBotDefaults.connected);
  const [commandName, setCommandName] = useState<string>(
    mockBotDefaults.commandName,
  );
  const [commandReply, setCommandReply] = useState<string>(
    mockBotDefaults.commandReply,
  );
  const [spamDelay, setSpamDelay] = useState<string>(
    String(mockBotDefaults.spamDelaySeconds),
  );
  const [autoEnabled, setAutoEnabled] = useState<boolean>(
    mockBotDefaults.autoMessageEnabled,
  );
  const [autoText, setAutoText] = useState<string>(
    mockBotDefaults.autoMessageText,
  );
  const [autoInterval, setAutoInterval] = useState<string>(
    String(mockBotDefaults.autoMessageIntervalMinutes),
  );
  const [thankYouEnabled, setThankYouEnabled] = useState<boolean>(
    mockBotDefaults.thankYouEnabled,
  );
  const [thankYouText, setThankYouText] = useState<string>(
    mockBotDefaults.thankYouTemplate,
  );

  const previewLines = [
    { user: "viewer_12", text: commandName },
    {
      user: "tipseasybot",
      text: commandReply.replace("{lien}", "tipseasy.com/pseudo"),
    },
    ...(thankYouEnabled
      ? [
          {
            user: "tipseasybot",
            text: thankYouText
              .replace("{pseudo}", "LunaStream")
              .replace("{montant}", formatEurosFromCents(500)),
          },
        ]
      : []),
    ...(autoEnabled ? [{ user: "tipseasybot", text: autoText }] : []),
  ];

  const fieldClass =
    "mt-1 w-full rounded-[12px] border border-white/[0.08] bg-[#0a0a0b] px-3 py-2 text-sm text-foreground outline-none focus-visible:border-[#38bdf8]/50";

  return (
    <div className="space-y-8">
      <PageHeader
        label="Twitch"
        title="Bot"
        description="Commandes et messages automatiques dans le chat."
      />

      <div className="dashboard-stagger space-y-8">
        <Card title="État du bot">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Toggle
              checked={botActive}
              onChange={setBotActive}
              label="Bot actif"
            />
            <StatusPill
              online={connected}
              onlineLabel="Connecté"
              offlineLabel="Déconnecté"
            />
          </div>
        </Card>

        <Card title="Commande principale">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium tracking-[0.12em] text-muted uppercase">
                Nom
              </label>
              <input
                value={commandName}
                onChange={(e) => setCommandName(e.target.value)}
                className={fieldClass}
              />
            </div>
            <div>
              <label className="text-xs font-medium tracking-[0.12em] text-muted uppercase">
                Réponse
              </label>
              <input
                value={commandReply}
                onChange={(e) => setCommandReply(e.target.value)}
                className={fieldClass}
              />
            </div>
            <div>
              <label className="text-xs font-medium tracking-[0.12em] text-muted uppercase">
                Délai anti-spam (s)
              </label>
              <input
                value={spamDelay}
                onChange={(e) => setSpamDelay(e.target.value)}
                className={`${fieldClass} font-mono`}
              />
            </div>
          </div>
        </Card>

        <Card title="Message automatique">
          <Toggle
            checked={autoEnabled}
            onChange={setAutoEnabled}
            label="Activé"
          />
          <div className="mt-4 space-y-4">
            <div>
              <label className="text-xs font-medium tracking-[0.12em] text-muted uppercase">
                Texte
              </label>
              <textarea
                value={autoText}
                onChange={(e) => setAutoText(e.target.value)}
                rows={2}
                className={fieldClass}
                disabled={!autoEnabled}
              />
            </div>
            <div>
              <label className="text-xs font-medium tracking-[0.12em] text-muted uppercase">
                Intervalle (min)
              </label>
              <input
                value={autoInterval}
                onChange={(e) => setAutoInterval(e.target.value)}
                disabled={!autoEnabled}
                className={`${fieldClass} max-w-xs font-mono`}
              />
            </div>
          </div>
        </Card>

        <Card title="Remerciement dans le chat">
          <Toggle
            checked={thankYouEnabled}
            onChange={setThankYouEnabled}
            label="Activé"
          />
          <div className="mt-4">
            <label className="text-xs font-medium tracking-[0.12em] text-muted uppercase">
              Texte
            </label>
            <input
              value={thankYouText}
              onChange={(e) => setThankYouText(e.target.value)}
              disabled={!thankYouEnabled}
              className={fieldClass}
            />
          </div>
        </Card>

        <Card title="Aperçu du chat">
          <ul className="space-y-3 rounded-[12px] border border-white/[0.08] bg-[#0a0a0b] p-4 font-mono text-xs sm:text-sm">
            {previewLines.map((line, index) => (
              <li key={index}>
                <span className="text-muted">{line.user}</span>
                <span className="text-muted">: </span>
                <span className="text-foreground">{line.text}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}