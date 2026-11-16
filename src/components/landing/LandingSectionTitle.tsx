import type { ReactNode } from "react";

type LandingSectionTitleProps = {
  eyebrow: string;
  children: ReactNode;
  className?: string;
  centered?: boolean;
};

export function LandingSectionTitle({
  eyebrow,
  children,
  className = "",
  centered = false,
}: LandingSectionTitleProps) {
  return (
    <div
      className={`${centered ? "text-center" : ""} ${className}`}
    >
      <p className="text-[11px] font-medium tracking-[0.2em] text-accent uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
        {children}
      </h2>
    </div>
  );
}