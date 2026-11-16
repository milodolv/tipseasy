export function AlertMockup() {
  return (
    <div className="relative overflow-hidden rounded-[16px] border border-white/10 bg-[#0f1012] p-6">
      <div className="mb-8 flex items-center justify-between text-[11px] text-muted">
        <span>Écran</span>
        <span>Alerte</span>
      </div>
      <div className="relative mx-auto aspect-video max-w-md overflow-hidden rounded-[16px] border border-white/10 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.12),transparent_55%)]" />
        <div className="absolute inset-x-6 top-6 rounded-[16px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
          <p className="text-xs tracking-[0.16em] text-muted uppercase">
            Alerte personnalisée
          </p>
          <p className="mt-2 text-sm text-foreground">Nouveau don</p>
          <p className="mt-1 font-mono text-2xl tracking-tight text-accent tabular-nums">
            5 €
          </p>
        </div>
      </div>
    </div>
  );
}
