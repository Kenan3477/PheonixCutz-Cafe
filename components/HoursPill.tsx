"use client";

import { useEffect, useState } from "react";
import { getOpenState } from "@/lib/hours";

export function HoursPill({ className = "" }: { className?: string }) {
  const [state, setState] = useState<ReturnType<typeof getOpenState> | null>(
    null,
  );

  useEffect(() => {
    const tick = () => setState(getOpenState());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  if (!state) {
    return (
      <span
        className={`inline-flex items-center gap-2 rounded-full border border-gold/25 px-3 py-1 text-[0.7rem] tracking-[0.16em] uppercase text-gold-soft ${className}`}
      >
        Winton hours
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.7rem] tracking-[0.16em] uppercase ${
        state.open
          ? "border-lime/40 text-lime"
          : "border-gold/25 text-gold-soft"
      } ${className}`}
    >
      <span
        className={`size-1.5 rounded-full ${
          state.open ? "bg-lime shadow-[0_0_10px_#b6d84a]" : "bg-gold/70"
        }`}
      />
      {state.label}
      <span className="hidden text-muted normal-case tracking-normal sm:inline">
        · {state.detail}
      </span>
    </span>
  );
}
