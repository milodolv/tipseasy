type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-[12px] bg-white/[0.05] ${className}`}
      aria-hidden
    />
  );
}