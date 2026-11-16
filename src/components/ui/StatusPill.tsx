type StatusPillProps = {
  online: boolean;
  onlineLabel?: string;
  offlineLabel?: string;
};

export function StatusPill({
  online,
  onlineLabel = "En ligne",
  offlineLabel = "Hors ligne",
}: StatusPillProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium tracking-[0.08em] uppercase ${
        online
          ? "border-white/[0.12] text-muted"
          : "border-white/[0.08] text-muted"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full shadow-[0_0_8px_currentColor] ${
          online ? "bg-emerald-400 text-emerald-400" : "bg-muted text-muted"
        }`}
        aria-hidden
      />
      {online ? onlineLabel : offlineLabel}
    </span>
  );
}