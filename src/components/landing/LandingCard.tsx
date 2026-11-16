import type { ReactNode } from "react";

type LandingCardProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
};

export function LandingCard({
  children,
  className = "",
  innerClassName = "",
}: LandingCardProps) {
  return (
    <article
      className={`rounded-[16px] bg-gradient-to-b from-white/[0.12] to-white/[0.02] p-px ${className}`}
    >
      <div
        className={`relative overflow-hidden rounded-[15px] border border-white/[0.06] bg-white/[0.04] backdrop-blur-sm ${innerClassName}`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
        />
        {children}
      </div>
    </article>
  );
}