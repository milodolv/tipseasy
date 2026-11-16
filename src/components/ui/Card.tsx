import type { ReactNode } from "react";

type CardProps = {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  halo?: boolean;
  interactive?: boolean;
};

export function Card({
  title,
  description,
  children,
  className = "",
  halo = false,
  interactive = true,
}: CardProps) {
  return (
    <section
      className={`dashboard-card p-6 ${interactive ? "dashboard-card-interactive" : ""} ${halo ? "dashboard-card-halo" : ""} ${className}`}
    >
      {title ? (
        <header className="mb-5">
          <h2 className="text-base font-medium tracking-tight text-foreground">
            {title}
          </h2>
          {description ? (
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              {description}
            </p>
          ) : null}
        </header>
      ) : null}
      {children}
    </section>
  );
}