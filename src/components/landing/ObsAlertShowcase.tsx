import { NOM } from "@/config";
import { LandingCard } from "@/components/landing/LandingCard";

export function ObsAlertShowcase() {
  return (
    <LandingCard
      className="overflow-hidden"
      innerClassName="bg-transparent p-0"
    >
      <div className="obs-game-stage relative aspect-[16/10] w-full min-h-[280px] overflow-hidden sm:min-h-[360px]">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,#1a2e1a_0%,#0a0a0b_45%),linear-gradient(160deg,#12081a_0%,#0a0a0b_50%,#051018_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(circle_at_20%_80%,rgba(56,189,248,0.15),transparent_40%)]"
        />
        <div
          aria-hidden
          className="absolute inset-3 rounded-[8px] border border-white/[0.06] sm:inset-5"
        />
        <div className="obs-alert-pop absolute top-[14%] right-[8%] left-[8%] max-w-sm sm:left-auto sm:w-[min(100%,320px)]">
          <div className="obs-alert-float rounded-[16px] border border-white/10 bg-white/[0.06] p-4 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.45),0_0_40px_rgba(56,189,248,0.12)]">
            <p className="text-[10px] tracking-[0.18em] text-muted uppercase">
              {NOM}
            </p>
            <p className="mt-2 text-sm text-foreground">Alerte personnalisée</p>
            <p className="mt-1 text-xs text-muted">Nouveau don</p>
            <p className="mt-2 font-mono text-3xl tracking-tight text-accent tabular-nums">
              5 €
            </p>
          </div>
        </div>
      </div>
    </LandingCard>
  );
}