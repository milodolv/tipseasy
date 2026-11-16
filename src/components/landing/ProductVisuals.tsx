import { ObsAlertShowcase } from "@/components/landing/ObsAlertShowcase";
import { landingSectionPad } from "@/components/landing/landing-styles";

export function ProductVisuals() {
  return (
    <section className="border-t border-white/10 bg-background-alt">
      <div className={`mx-auto max-w-6xl ${landingSectionPad}`}>
        <ObsAlertShowcase />
      </div>
    </section>
  );
}