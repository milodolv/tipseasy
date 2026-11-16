import { LandingCard } from "@/components/landing/LandingCard";
import { landingSectionPad } from "@/components/landing/landing-styles";

const profiles = [
  {
    title: "Tu démarres",
    body: "Un lien, zéro prise de tête. Sans abonnement.",
  },
  {
    title: "Tu grandis",
    body: "Plus de dons, moins de friction. Alertes personnalisées.",
  },
  {
    title: "Tu streames partout",
    body: "TikTok bientôt.",
  },
] as const;

export function Profiles() {
  return (
    <section className="border-t border-white/10">
      <div className={`mx-auto max-w-6xl ${landingSectionPad}`}>
        <div className="grid gap-4 md:grid-cols-3">
          {profiles.map((profile) => (
            <LandingCard key={profile.title} innerClassName="p-6">
              <h2 className="text-lg font-medium tracking-tight text-foreground">
                {profile.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {profile.body}
              </p>
            </LandingCard>
          ))}
        </div>
      </div>
    </section>
  );
}