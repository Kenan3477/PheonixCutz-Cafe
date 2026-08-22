"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { DateWeekSlider } from "@/components/DateWeekSlider";
import {
  BOOKING_HORIZON_DAYS,
  bookingPence,
  buildDayBoard,
  displayPhone,
  formatPounds,
  isIsoDate,
  moneyFor,
  quickChairActions,
  type Booking,
  type ChairService,
  type QuickChairAction,
} from "@/lib/booking";
import { addDaysToIsoDate, formatLondonLongDay } from "@/lib/london";
import { site } from "@/lib/site";

type DeskPayload = {
  bookings: Booking[];
  closedDates: string[];
  services: ChairService[];
  store: string;
  storeLabel: string;
  today: string;
  error?: string;
};

export function ChairDesk() {
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [data, setData] = useState<DeskPayload | null>(null);
  const [date, setDate] = useState("");
  const [start, setStart] = useState("");
  const [walkInName, setWalkInName] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function loadDesk() {
    const response = await fetch("/api/chair/bookings", { cache: "no-store" });
    if (response.status === 401) {
      setSignedIn(false);
      return;
    }
    const payload = (await response.json()) as DeskPayload;
    if (!response.ok) throw new Error(payload.error || "Could not open the diary.");
    setData(payload);
    setSignedIn(true);
    setDate((current) => current || payload.today);
  }

  useEffect(() => {
    fetch("/api/chair/bookings", { cache: "no-store" })
      .then(async (response) => {
        if (response.status === 401) {
          setSignedIn(false);
          return;
        }
        const payload = (await response.json()) as DeskPayload;
        if (!response.ok) throw new Error(payload.error || "Could not open the diary.");
        setData(payload);
        setSignedIn(true);
        setDate((current) => current || payload.today);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Could not open the diary.");
        setSignedIn(false);
      });
  }, []);

  const dayOptions = data
    ? Array.from({ length: BOOKING_HORIZON_DAYS }, (_, index) =>
        addDaysToIsoDate(data.today, index),
      )
    : [];
  const weekDates = dayOptions.slice(0, 7);
  const dayClosed = Boolean(data?.closedDates.includes(date));
  const dayBookings = useMemo(
    () =>
      (data?.bookings ?? [])
        .filter((booking) => booking.date === date && booking.status !== "cancelled")
        .sort((a, b) => a.start.localeCompare(b.start)),
    [data, date],
  );
  const board = useMemo(
    () => (isIsoDate(date) ? buildDayBoard(date, data?.bookings ?? []) : []),
    [data, date],
  );
  const todayMoney = moneyFor(data?.bookings ?? [], data?.today);
  const weekMoney = (data?.bookings ?? [])
    .filter((booking) => weekDates.includes(booking.date))
    .reduce((sum, booking) => sum + bookingPence(booking), 0);
  const dayMoney = moneyFor(data?.bookings ?? [], date);
  const todayCuts = (data?.bookings ?? []).filter(
    (booking) =>
      booking.date === data?.today &&
      (booking.status === "booked" || booking.status === "done"),
  ).length;
  const nextUp = dayBookings.find((booking) => booking.status === "booked");

  async function onLogin(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/chair/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(payload.error || "Could not sign in.");
      setPassword("");
      await loadDesk();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not sign in.");
    } finally {
      setBusy(false);
    }
  }

  async function postChange(body: Record<string, unknown>) {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/chair/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(payload.error || "Could not save.");
      setWalkInName("");
      await loadDesk();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  }

  async function runQuick(action: QuickChairAction) {
    if (action.kind === "block") {
      await postChange({
        type: "block",
        date,
        start,
        minutes: action.minutes,
        notes: "Busy",
      });
      return;
    }
    await postChange({
      type: "quick",
      date,
      start,
      serviceId: action.serviceId,
      name: walkInName || "Walk-in",
    });
  }

  async function setStatus(id: string, status: "cancelled" | "done" | "deleted") {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/chair/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(payload.error || "Could not update.");
      await loadDesk();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not update.");
    } finally {
      setBusy(false);
    }
  }

  if (signedIn === null) {
    return (
      <div className="dark-section min-h-[60vh] px-5 py-16">
        <p className="text-cream/60">Opening the chair diary…</p>
      </div>
    );
  }

  if (!signedIn) {
    return (
      <section className="dark-section px-5 py-16">
        <form onSubmit={onLogin} className="mx-auto max-w-lg rounded-[1.6rem] border border-white/10 bg-white/5 p-7">
          <p className="text-sm font-semibold tracking-[0.18em] uppercase text-gold-soft">
            Chair diary
          </p>
          <h1 className="mt-3 font-display text-5xl text-cream">Yusuf’s book</h1>
          <p className="mt-3 text-cream/65">
            The public site only shows free or busy. Names, numbers and takings stay here.
          </p>
          <label className="mt-6 block text-sm text-cream/70">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-3 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-cream outline-none"
              autoComplete="current-password"
            />
          </label>
          {error ? <p className="mt-3 text-sm font-semibold text-gold-soft">{error}</p> : null}
          <button type="submit" className="btn btn-gold mt-6" disabled={busy}>
            {busy ? "Checking…" : "Open the book"}
          </button>
        </form>
      </section>
    );
  }

  return (
    <div className="dark-section min-h-screen px-5 pb-36 pt-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] uppercase text-gold-soft">
              Chair diary
            </p>
            <h1 className="mt-2 font-display text-5xl text-cream">The book</h1>
            <p className="mt-2 text-cream/65">
              {formatLondonLongDay(date)}
              {dayClosed ? " · closed online" : ""}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="btn btn-ghost-dark"
              disabled={busy}
              onClick={() => postChange({ type: dayClosed ? "open" : "close", date })}
            >
              {dayClosed ? "Open this day" : "Close this day"}
            </button>
            <button
              type="button"
              className="btn btn-ghost-dark"
              onClick={async () => {
                await fetch("/api/chair/logout", { method: "POST" });
                setSignedIn(false);
                setData(null);
              }}
            >
              Sign out
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Today" value={formatPounds(todayMoney)} detail={`${todayCuts} on the book`} />
          <Stat label="Next 7 days" value={formatPounds(weekMoney)} detail="Booked and done" />
          <Stat label="This day" value={formatPounds(dayMoney)} detail={`${dayBookings.length} written in`} />
          <Stat
            label="Next up"
            value={nextUp ? nextUp.start : "Clear"}
            detail={nextUp ? nextUp.customerName : "No one waiting"}
          />
        </div>

        <div className="mt-8">
          <DateWeekSlider
            dark
            dates={dayOptions}
            selected={date}
            onSelect={(value) => {
              setDate(value);
              setStart("");
            }}
            closed={(value) => Boolean(data?.closedDates.includes(value))}
            meta={(value) => {
              const count = (data?.bookings ?? []).filter(
                (booking) => booking.date === value && booking.status !== "cancelled",
              ).length;
              return `${count} · ${formatPounds(moneyFor(data?.bookings ?? [], value))}`;
            }}
          />
        </div>

        <section className="mt-8 overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/5">
          <div className="border-b border-white/10 px-5 py-4">
            <h2 className="font-display text-3xl text-cream">Day board</h2>
            <p className="mt-1 text-sm text-cream/55">
              Tap a free time, then tap Cut, Fade, Wash, Shave or Busy. Name is optional.
            </p>
          </div>
          {board.length === 0 ? (
            <p className="px-5 py-8 text-cream/55">The chair is closed this day.</p>
          ) : (
            <ul>
              {board.map((cell) => {
                const selected = start === cell.start && !cell.booking;
                return (
                  <li key={cell.start} className="border-t border-white/8">
                    {cell.booking ? (
                      <div className="flex w-full items-stretch text-left">
                        <span className="w-20 shrink-0 px-4 py-3 text-sm text-cream/50">
                          {cell.continuation ? "" : cell.start}
                        </span>
                        <span className="flex min-w-0 flex-1 items-center justify-between gap-3 px-4 py-3">
                          <span>
                            <span className="block font-semibold text-cream">
                              {cell.continuation
                                ? ""
                                : cell.booking.status === "blocked"
                                  ? cell.booking.notes || "Busy"
                                  : cell.booking.customerName}
                            </span>
                            {cell.continuation ? null : (
                              <span className="block text-sm text-cream/55">
                                {cell.booking.start}–{cell.booking.end} · {cell.booking.serviceName}
                                {cell.booking.status === "booked" || cell.booking.status === "done"
                                  ? ` · ${formatPounds(bookingPence(cell.booking))}`
                                  : ""}
                                {cell.booking.customerPhone
                                  ? ` · ${displayPhone(cell.booking.customerPhone)}`
                                  : ""}
                              </span>
                            )}
                          </span>
                          {cell.continuation ? null : (
                            <span className="flex shrink-0 gap-2">
                              {cell.booking.status === "booked" ? (
                                <button
                                  type="button"
                                  className="rounded-full bg-cream px-3 py-1 text-xs font-semibold text-ink"
                                  onClick={() => setStatus(cell.booking!.id, "done")}
                                >
                                  Done
                                </button>
                              ) : null}
                              <button
                                type="button"
                                className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-cream"
                                onClick={() => setStatus(cell.booking!.id, "deleted")}
                              >
                                Remove
                              </button>
                            </span>
                          )}
                        </span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setStart(cell.start)}
                        className={`flex w-full items-stretch text-left ${
                          selected ? "bg-gold/15" : ""
                        }`}
                      >
                        <span className="w-20 shrink-0 px-4 py-3 text-sm text-cream/50">
                          {cell.start}
                        </span>
                        <span className="flex flex-1 items-center px-4 py-3 text-sm text-gold-soft">
                          {selected ? "Selected · tap a job below" : "Free"}
                        </span>
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="mt-8">
          <h2 className="font-display text-3xl text-cream">What’s booked</h2>
          {dayBookings.length === 0 ? (
            <p className="mt-3 text-cream/55">Nothing written in yet.</p>
          ) : (
            <ul className="mt-4 space-y-2">
              {dayBookings.map((booking) => (
                <li
                  key={booking.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <p className="text-cream">
                    <span className="font-semibold">
                      {booking.start}–{booking.end}
                    </span>
                    {" · "}
                    {booking.status === "blocked" ? booking.notes || "Busy" : booking.customerName}
                    {" · "}
                    {booking.serviceName}
                    {booking.status !== "blocked" ? ` · ${formatPounds(bookingPence(booking))}` : ""}
                  </p>
                  <div className="flex items-center gap-3">
                    <p className="text-sm text-cream/45">
                      {booking.status}
                      {booking.source === "online" ? " · online" : " · walk-in"}
                    </p>
                    <button
                      type="button"
                      className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-cream"
                      onClick={() => setStatus(booking.id, "deleted")}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {error ? <p className="mt-6 font-semibold text-gold-soft">{error}</p> : null}

        <p className="mt-10 text-sm text-cream/40">
          Customers book on the{" "}
          <a className="text-gold-soft" href="/barber#book">
            Cut page
          </a>
          . WhatsApp {site.phoneDisplay}.
        </p>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink-deep/95 px-4 py-3 backdrop-blur md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm text-cream/70">
              {start ? `From ${start}` : "Next free slot"}
              {walkInName ? ` · ${walkInName}` : " · Walk-in"}
            </p>
            <input
              value={walkInName}
              onChange={(event) => setWalkInName(event.target.value)}
              className="min-w-[8rem] flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cream outline-none md:max-w-xs"
              placeholder="Name optional"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {quickChairActions.map((action) => (
              <button
                key={action.label}
                type="button"
                disabled={busy}
                onClick={() => runQuick(action)}
                className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold ${
                  action.kind === "block"
                    ? "border border-white/20 text-cream"
                    : "bg-gold text-paper"
                }`}
              >
                {action.label}
                <span className="ml-2 text-xs opacity-75">{action.hint}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-[1.4rem] border border-white/10 bg-white/5 px-5 py-4">
      <p className="text-sm text-cream/50">{label}</p>
      <p className="mt-1 font-display text-4xl text-cream">{value}</p>
      <p className="mt-1 text-sm text-cream/55">{detail}</p>
    </div>
  );
}
