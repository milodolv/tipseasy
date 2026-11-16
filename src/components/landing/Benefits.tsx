import { LandingCard } from "@/components/landing/LandingCard";
import { landingSectionPad } from "@/components/landing/landing-styles";

const benefits = [
  {
    title: "Paie en un tap",
    body: "Apple Pay, Google Pay. Un lien, zéro prise de tête.",
  },
  {
    title: "Des alertes à ton image",
    body: "Alertes personnalisées.",
  },
  {
    title: "Tu vois ce que tu reçois",
    body: "Reçois tes dons.",
  },
] as const;

export function Benefits() {
  return (
    <section id="fonctionnalites" className="border-t border-white/10">
      <div
        className={`mx-auto grid max-w-6xl gap-4 md:grid-cols-3 ${landingSectionPad}`}
      >
        {benefits.map((benefit) => (
          <LandingCard key={benefit.title} innerClassName="p-6">
            <h2 className="text-lg font-medium tracking-tight text-foreground">
              {benefit.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {benefit.body}
            </p>
          </LandingCard>
        ))}
      </div>
    </section>
  );
}