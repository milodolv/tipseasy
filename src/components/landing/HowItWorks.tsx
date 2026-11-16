import { LandingCard } from "@/components/landing/LandingCard";
import { LandingSectionTitle } from "@/components/landing/LandingSectionTitle";
import { landingSectionPad } from "@/components/landing/landing-styles";

const steps = [
  "Connecte ta chaîne Twitch",
  "Colle le lien dans OBS",
  "Reçois tes dons",
] as const;

export function HowItWorks() {
  return (
    <section className="border-t border-white/10 bg-background-alt">
      <div className={`mx-auto max-w-6xl ${landingSectionPad}`}>
        <LandingSectionTitle eyebrow="COMMENT ÇA MARCHE">
          Comment ça marche
        </LandingSectionTitle>
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step}>
              <LandingCard innerClassName="p-6">
                <p className="font-mono text-sm text-accent tabular-nums">
                  {index + 1}.
                </p>
                <p className="mt-3 text-base font-medium text-foreground">
                  {step}
                </p>
              </LandingCard>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}