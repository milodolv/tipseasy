import { SHOW_TESTIMONIALS } from "@/config";

export function Testimonials() {
  if (!SHOW_TESTIMONIALS) {
    return null;
  }

  return (
    <section className="border-t border-white/10 bg-background-alt">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="text-2xl font-medium tracking-tight text-foreground">
          Témoignages
        </h2>
      </div>
    </section>
  );
}
