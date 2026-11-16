"use client";

type TabOption<T extends string> = {
  value: T;
  label: string;
};

type TabsProps<T extends string> = {
  options: readonly TabOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

export function Tabs<T extends string>({
  options,
  value,
  onChange,
  className = "",
}: TabsProps<T>) {
  return (
    <div
      className={`inline-flex flex-wrap gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] p-1 ${className}`}
      role="tablist"
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option.value)}
            className={`rounded-full px-3 py-1.5 text-sm transition-[background-color,color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              active
                ? "bg-white/[0.08] text-foreground"
                : "text-muted hover:text-foreground"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}