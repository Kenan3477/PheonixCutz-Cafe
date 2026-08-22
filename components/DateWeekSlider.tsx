"use client";

import { formatLondonDay } from "@/lib/london";

export function DateWeekSlider({
  dates,
  selected,
  onSelect,
  meta,
  dark = false,
  closed,
}: {
  dates: string[];
  selected: string;
  onSelect: (date: string) => void;
  meta: (date: string) => string;
  dark?: boolean;
  closed?: (date: string) => boolean;
}) {
  const week = Math.max(0, Math.floor(Math.max(dates.indexOf(selected), 0) / 7));
  const weekCount = Math.max(1, Math.ceil(dates.length / 7));
  const slice = dates.slice(week * 7, week * 7 + 7);
  const label =
    slice[0] && slice[slice.length - 1]
      ? `${formatLondonDay(slice[0])} – ${formatLondonDay(slice[slice.length - 1])}`
      : "Dates";

  const chip = dark
    ? {
        selected: "border-gold bg-gold text-paper",
        open: "border-white/10 bg-white/5 text-cream",
        shut: "cursor-not-allowed border-white/5 bg-white/5 text-cream/30",
        arrow: "border-white/15 text-cream",
      }
    : {
        selected: "border-gold bg-gold text-paper",
        open: "border-line bg-paper text-ink",
        shut: "cursor-not-allowed border-line bg-cream text-muted",
        arrow: "border-line text-ink",
      };

  function go(delta: number) {
    const nextWeek = week + delta;
    if (nextWeek < 0 || nextWeek >= weekCount) return;
    const nextSlice = dates.slice(nextWeek * 7, nextWeek * 7 + 7);
    const pick = nextSlice.find((value) => !closed?.(value)) ?? nextSlice[0];
    if (pick) onSelect(pick);
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          className={`inline-flex size-10 items-center justify-center rounded-full border text-lg ${chip.arrow}`}
          disabled={week === 0}
          aria-label="Earlier week"
          onClick={() => go(-1)}
        >
          ‹
        </button>
        <p className={`text-sm font-semibold ${dark ? "text-cream/70" : "text-muted"}`}>
          {label}
        </p>
        <button
          type="button"
          className={`inline-flex size-10 items-center justify-center rounded-full border text-lg ${chip.arrow}`}
          disabled={week >= weekCount - 1}
          aria-label="Later week"
          onClick={() => go(1)}
        >
          ›
        </button>
      </div>
      <div className="mt-3 grid grid-cols-7 gap-1.5 sm:gap-2">
        {slice.map((value) => {
          const isClosed = closed?.(value) ?? false;
          const isSelected = value === selected;
          return (
            <button
              key={value}
              type="button"
              disabled={isClosed}
              onClick={() => onSelect(value)}
              className={`min-w-0 rounded-2xl border px-1 py-2.5 text-center text-[0.7rem] leading-tight sm:px-2 sm:text-sm ${
                isSelected ? chip.selected : isClosed ? chip.shut : chip.open
              }`}
            >
              <span className="block font-semibold">{formatLondonDay(value)}</span>
              <span className="mt-1 block text-[0.65rem] opacity-75 sm:text-xs">
                {isClosed ? "Closed" : meta(value)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
