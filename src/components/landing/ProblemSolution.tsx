import { landingSectionPad } from "@/components/landing/landing-styles";

export function ProblemSolution() {
  return (
    <section className="border-t border-white/10 bg-background-alt">
      <div className={`mx-auto max-w-3xl text-center ${landingSectionPad}`}>
        <p className="text-2xl leading-snug font-medium tracking-tight text-foreground sm:text-3xl">
          Chaque champ à remplir est une raison de renoncer au don.
        </p>
        <p className="mt-5 text-base text-muted">
          Apple Pay, Google Pay et alertes personnalisées. Un lien, zéro prise
          de tête.
        </p>
      </div>
    </section>
  );
}