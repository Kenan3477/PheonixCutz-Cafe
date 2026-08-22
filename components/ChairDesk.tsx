"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { Booking, ChairService } from "@/lib/booking";
import { displayPhone } from "@/lib/booking";
import { addDaysToIsoDate, formatLondonDay, formatLondonLongDay } from "@/lib/london";
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
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceId, setServiceId] = useState("hair-cut");
  const [start, setStart] = useState("10:00");
  const [notes, setNotes] = useState("");
  const [blockMinutes, setBlockMinutes] = useState(30);

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
    setServiceId((current) => current || payload.services[0]?.id || "hair-cut");
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
        setServiceId((current) => current || payload.services[0]?.id || "hair-cut");
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Could not open the diary.");
        setSignedIn(false);
      });
  }, []);

  const dayBookings = useMemo(
    () =>
      (data?.bookings ?? [])
        .filter((booking) => booking.date === date)
        .sort((a, b) => a.start.localeCompare(b.start)),
    [data, date],
  );

  const dayClosed = Boolean(data?.closedDates.includes(date));
  const dayOptions = data
    ? Array.from({ length: 21 }, (_, index) => addDaysToIsoDate(data.today, index - 1))
    : [];

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
      setName("");
      setPhone("");
      setNotes("");
      await loadDesk();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  }

  async function setStatus(id: string, status: "cancelled" | "done") {
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
      <div className="mx-auto max-w-lg px-5 py-16">
        <p className="text-muted">Opening the chair diary…</p>
      </div>
    );
  }

  if (!signedIn) {
    return (
      <form onSubmit={onLogin} className="card mx-auto mt-10 max-w-lg p-7">
        <p className="text-sm font-semibold text-teal">Chair diary</p>
        <h1 className="mt-1 font-display text-4xl">Yusuf’s book</h1>
        <p className="mt-3 text-muted">
          Customers only see free or busy. Names and numbers stay on this page.
        </p>
        <label className="mt-6 block text-sm">
          <span className="text-muted">Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-3 text-ink outline-none"
            autoComplete="current-password"
          />
        </label>
        {error ? <p className="mt-3 text-sm font-semibold text-teal">{error}</p> : null}
        <button type="submit" className="btn btn-gold mt-5" disabled={busy}>
          {busy ? "Checking…" : "Open the book"}
        </button>
      </form>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 md:px-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-teal">Chair diary</p>
          <h1 className="mt-1 font-display text-5xl">The book</h1>
          <p className="mt-2 text-muted">
            {formatLondonLongDay(date)}
            {dayClosed ? " · closed to online booking" : ""}
          </p>
        </div>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={async () => {
            await fetch("/api/chair/logout", { method: "POST" });
            setSignedIn(false);
            setData(null);
          }}
        >
          Sign out
        </button>
      </div>

      {data?.store === "ephemeral" ? (
        <p className="mt-5 rounded-2xl border border-gold/40 bg-gold/10 px-4 py-3 text-sm">
          Bookings are on temporary storage until a KV database is connected in
          Vercel. They can reset when the site updates. Kenan can add Storage →
          KV on the Vercel project to keep the diary.
        </p>
      ) : (
        <p className="mt-5 text-sm text-muted">Diary {data?.storeLabel}.</p>
      )}

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
        {dayOptions.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setDate(value)}
            className={`min-w-[5.4rem] rounded-2xl border px-3 py-3 text-left text-sm ${
              value === date ? "border-gold bg-gold text-paper" : "border-line bg-paper"
            }`}
          >
            <span className="block font-semibold">{formatLondonDay(value)}</span>
            <span className="block text-xs opacity-80">
              {data?.closedDates.includes(value)
                ? "Closed"
                : `${data?.bookings.filter((booking) => booking.date === value && booking.status !== "cancelled").length ?? 0} in`}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          className="btn btn-ghost"
          disabled={busy}
          onClick={() => postChange({ type: dayClosed ? "open" : "close", date })}
        >
          {dayClosed ? "Open this day" : "Close this day"}
        </button>
      </div>

      <section className="mt-8">
        <h2 className="font-display text-3xl">Appointments</h2>
        {dayBookings.length === 0 ? (
          <p className="mt-3 text-muted">Nothing written in for this day yet.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {dayBookings.map((booking) => (
              <li key={booking.id} className="card p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">
                      {booking.start}–{booking.end} · {booking.serviceName}
                    </p>
                    <p className="mt-1">
                      {booking.status === "blocked"
                        ? booking.notes || "Busy"
                        : booking.customerName}
                    </p>
                    {booking.customerPhone ? (
                      <a className="mt-1 inline-block text-teal" href={`tel:${booking.customerPhone}`}>
                        {displayPhone(booking.customerPhone)}
                      </a>
                    ) : null}
                    <p className="mt-1 text-sm text-muted">
                      {booking.status}
                      {booking.source === "online" ? " · booked online" : " · added by Yusuf"}
                    </p>
                  </div>
                  {booking.status === "booked" || booking.status === "blocked" ? (
                    <div className="flex flex-wrap gap-2">
                      {booking.status === "booked" ? (
                        <button
                          type="button"
                          className="btn btn-ink"
                          disabled={busy}
                          onClick={() => setStatus(booking.id, "done")}
                        >
                          Done
                        </button>
                      ) : null}
                      <button
                        type="button"
                        className="btn btn-ghost"
                        disabled={busy}
                        onClick={() => setStatus(booking.id, "cancelled")}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <form
        className="card mt-8 grid gap-4 p-6"
        onSubmit={(event) => {
          event.preventDefault();
          postChange({
            type: "booking",
            date,
            start,
            serviceId,
            name,
            phone,
            notes,
          });
        }}
      >
        <h2 className="font-display text-3xl">Add a walk-in</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm">
            <span className="text-muted">Time</span>
            <input
              value={start}
              onChange={(event) => setStart(event.target.value)}
              className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-3"
              placeholder="10:00"
            />
          </label>
          <label className="text-sm">
            <span className="text-muted">Service</span>
            <select
              value={serviceId}
              onChange={(event) => setServiceId(event.target.value)}
              className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-3"
            >
              {(data?.services ?? []).map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            <span className="text-muted">Name</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-3"
            />
          </label>
          <label className="text-sm">
            <span className="text-muted">Mobile (optional)</span>
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-3"
            />
          </label>
        </div>
        <button type="submit" className="btn btn-gold" disabled={busy}>
          Add to the book
        </button>
      </form>

      <form
        className="card mt-5 grid gap-4 p-6"
        onSubmit={(event) => {
          event.preventDefault();
          postChange({
            type: "block",
            date,
            start,
            minutes: blockMinutes,
            notes: notes || "Busy",
          });
        }}
      >
        <h2 className="font-display text-3xl">Block a time</h2>
        <p className="text-sm text-muted">
          Use this for lunch, a break, or a walk-in you do not want shown as free.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm">
            <span className="text-muted">From</span>
            <input
              value={start}
              onChange={(event) => setStart(event.target.value)}
              className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-3"
            />
          </label>
          <label className="text-sm">
            <span className="text-muted">Length</span>
            <select
              value={blockMinutes}
              onChange={(event) => setBlockMinutes(Number(event.target.value))}
              className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-3"
            >
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={90}>90 minutes</option>
            </select>
          </label>
        </div>
        <label className="text-sm">
          <span className="text-muted">Note</span>
          <input
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-3"
            placeholder="Lunch"
          />
        </label>
        <button type="submit" className="btn btn-ink" disabled={busy}>
          Block this time
        </button>
      </form>

      {error ? <p className="mt-5 font-semibold text-teal">{error}</p> : null}

      <p className="mt-10 text-sm text-muted">
        Customers book on the{" "}
        <a className="font-semibold text-teal" href="/barber#book">
          Cut page
        </a>
        . WhatsApp remains {site.phoneDisplay}.
      </p>
    </div>
  );
}
