"use client";

import { useState } from "react";
import { LandingSectionTitle } from "@/components/landing/LandingSectionTitle";
import { landingSectionPad } from "@/components/landing/landing-styles";

const items = [
  {
    question: "Compte Stripe nécessaire ?",
    answer:
      "Un compte Stripe est nécessaire. Les frais Stripe s’appliquent.",
  },
  {
    question: "Frais ?",
    answer:
      "Gratuit : 5 % + frais Stripe. Pro : 2 % + frais Stripe. Sans abonnement.",
  },
  {
    question: "Quand retirer ?",
    answer: "Reçois tes dons. Les retraits se font via Stripe.",
  },
  {
    question: "Faut-il être majeur ?",
    answer: "Un compte Stripe est nécessaire pour recevoir tes dons.",
  },
  {
    question: "Comment l’afficher dans OBS ?",
    answer: "Colle le lien dans OBS.",
  },
  {
    question: "Et TikTok ?",
    answer: "TikTok bientôt. Tu streames partout.",
  },
] as const;

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-white/10">
      <div className={`mx-auto max-w-3xl ${landingSectionPad}`}>
        <LandingSectionTitle eyebrow="FAQ">FAQ</LandingSectionTitle>
        <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
          {items.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-4 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : index)}
                >
                  <span className="text-sm font-medium text-foreground sm:text-base">
                    {item.question}
                  </span>
                  <span className="font-mono text-muted" aria-hidden="true">
                    {isOpen ? "–" : "+"}
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-4 text-sm leading-relaxed text-muted">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}