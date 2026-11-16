import type { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-[240px] rounded-[36px] border border-white/10 bg-[#111214] p-[6px] sm:w-[260px]">
      <div className="relative overflow-hidden rounded-[30px] bg-[#0a0a0b]">
        <div className="absolute top-2 left-1/2 z-10 h-[18px] w-[88px] -translate-x-1/2 rounded-full bg-black/90" />
        {children}
      </div>
    </div>
  );
}
