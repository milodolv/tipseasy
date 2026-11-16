import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
};

const variantClass: Record<Variant, string> = {
  primary:
    "border border-[#38bdf8]/40 bg-[#38bdf8] text-[#04131c] hover:shadow-[0_0_24px_-4px_rgba(56,189,248,0.5)]",
  secondary:
    "border border-white/[0.08] bg-white/[0.03] text-foreground hover:border-white/[0.16]",
  ghost: "border border-transparent text-muted hover:text-foreground",
  danger:
    "border border-red-400/25 bg-red-500/10 text-red-300 hover:border-red-400/40",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium transition-[transform,box-shadow,border-color,background-color,color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${variantClass[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}