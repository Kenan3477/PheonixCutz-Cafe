"use client";

import { useEffect, useState } from "react";
import { getOpenState } from "@/lib/hours";

export function HoursPill({
  className = "",
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  const [state, setState] = useState<ReturnType<typeof getOpenState> | null>(
    null,
  );

  useEffect(() => {
    const tick = () => setState(getOpenState());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const base = dark
    ? "border-white/15 bg-white/5 text-cream"
    : "border-line bg-paper text-ink";

  if (!state) {
    return (
      <span
        className={`items-center gap-2 rounded-full border px-3 py-1.5 text-sm ${base} ${className || "inline-flex"}`}
      >
        Checking hours…
      </span>
    );
  }

  return (
    <span
      className={`max-w-full items-center gap-2 rounded-full border px-3 py-1.5 text-sm ${base} ${className || "inline-flex"}`}
    >
      <span
        className={`size-2 shrink-0 rounded-full ${
          state.open ? "bg-lime" : dark ? "bg-gold-soft" : "bg-gold"
        }`}
      />
      <strong className="font-semibold">{state.label}</strong>
      <span className={`truncate ${dark ? "text-cream/70" : "text-muted"}`}>
        {state.detail}
      </span>
    </span>
  );
}
