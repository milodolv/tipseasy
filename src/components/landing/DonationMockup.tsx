import { NOM } from "@/config";

const amounts = ["3 €", "5 €", "10 €"] as const;

export function DonationMockup({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`flex flex-col bg-[#0a0a0b] ${compact ? "px-5 pb-6 pt-10" : "px-6 pb-8 pt-12"}`}
    >
      <p className="text-center text-[11px] tracking-[0.18em] text-muted uppercase">
        {NOM}
      </p>
      <h3 className="mt-4 text-center text-lg font-medium tracking-tight text-foreground">
        Page de don
      </h3>
      <p className="mt-1 text-center text-sm text-muted">
        Apple Pay, Google Pay.
      </p>
      <div className="mt-6 grid grid-cols-3 gap-2">
        {amounts.map((amount, index) => (
          <div
            key={amount}
            className={`rounded-[16px] border px-2 py-3 text-center font-mono text-sm tabular-nums ${
              index === 1
                ? "border-accent/40 bg-white/[0.06] text-foreground"
                : "border-white/10 bg-white/[0.04] text-muted"
            }`}
          >
            {amount}
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-[16px] bg-white py-3 text-center text-sm font-medium text-black">
        Apple Pay
      </div>
      <p className="mt-4 text-center text-xs text-muted">
        Apple Pay • Google Pay
      </p>
    </div>
  );
}
