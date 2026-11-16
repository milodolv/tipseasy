import { LandingCard } from "@/components/landing/LandingCard";
import { LandingSectionTitle } from "@/components/landing/LandingSectionTitle";
import { landingSectionPad } from "@/components/landing/landing-styles";

const plans = [
  {
    name: "Gratuit",
    fee: "5 % + frais Stripe",
    badge: null,
  },
  {
    name: "Pro",
    fee: "2 % + frais Stripe",
    badge: "Bientôt",
  },
] as const;

export function Pricing() {
  return (
    <section id="tarifs" className="border-t border-white/10 bg-background-alt">
      <div className={`mx-auto max-w-6xl ${landingSectionPad}`}>
        <LandingSectionTitle eyebrow="TARIFS">Tarifs</LandingSectionTitle>
        <p className="mt-2 text-sm text-muted">Sans abonnement</p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {plans.map((plan) => (
            <LandingCard key={plan.name} innerClassName="p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-medium text-foreground">
                  {plan.name}
                </h3>
                {plan.badge ? (
                  <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-accent">
                    {plan.badge}
                  </span>
                ) : null}
              </div>
              <p className="mt-6 font-mono text-2xl tracking-tight text-foreground">
                {plan.fee}
              </p>
            </LandingCard>
          ))}
        </div>
      </div>
    </section>
  );
}