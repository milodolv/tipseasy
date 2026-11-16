type FunnelStep = {
  title: string;
  count: number;
  percentFromPrevious?: number;
};

type FunnelProps = {
  steps: FunnelStep[];
};

export function Funnel({ steps }: FunnelProps) {
  const max = steps[0]?.count ?? 1;
  return (
    <div className="space-y-6">
      {steps.map((step, index) => {
        const width = Math.max(8, Math.round((step.count / max) * 100));
        return (
          <div key={step.title}>
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <p className="text-sm font-medium text-foreground">{step.title}</p>
              <div className="text-right">
                <p className="font-mono text-sm text-foreground tabular-nums">
                  {step.count.toLocaleString("fr-FR")}
                </p>
                {index > 0 && step.percentFromPrevious !== undefined ? (
                  <p className="text-xs text-muted">
                    {step.percentFromPrevious.toLocaleString("fr-FR", {
                      maximumFractionDigits: 1,
                    })}
                    % de l'étape précédente
                  </p>
                ) : null}
              </div>
            </div>
            <div className="h-2 rounded-full bg-white/[0.04]">
              <div
                className="h-full rounded-full bg-white/[0.18] transition-[width] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                style={{ width: `${width}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}