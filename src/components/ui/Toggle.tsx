"use client";

type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  id?: string;
};

export function Toggle({ checked, onChange, label, id }: ToggleProps) {
  const inputId = id ?? label?.replace(/\s/g, "-").toLowerCase();
  return (
    <label
      htmlFor={inputId}
      className="inline-flex cursor-pointer items-center gap-3 text-sm text-foreground"
    >
      {label ? <span className="text-muted">{label}</span> : null}
      <button
        id={inputId}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full border transition-colors duration-200 ${
          checked
            ? "border-white/[0.16] bg-white/[0.14]"
            : "border-white/[0.08] bg-white/[0.04]"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-foreground transition-transform duration-200 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </label>
  );
}