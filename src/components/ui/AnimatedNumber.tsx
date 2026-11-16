"use client";

import { useAnimatedValue } from "@/hooks/use-animated-value";

type AnimatedNumberProps = {
  value: number;
  format: (value: number) => string;
  durationMs?: number;
  className?: string;
};

export function AnimatedNumber({
  value,
  format,
  durationMs = 600,
  className = "",
}: AnimatedNumberProps) {
  const animated = useAnimatedValue(value, durationMs);
  return <span className={className}>{format(animated)}</span>;
}