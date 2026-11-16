import type { ReactNode } from "react";

type PageHeaderProps = {
  label: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function PageHeader({
  label,
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-medium tracking-[0.14em] text-muted uppercase">
          {label}
        </p>
        <h1 className="mt-2 text-[28px] leading-tight font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}