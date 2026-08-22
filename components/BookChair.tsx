"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  chairServices,
  type ChairService,
  type PublicDay,
} from "@/lib/booking";
import { formatLondonDay, formatLondonLongDay } from "@/lib/london";
import { site } from "@/lib/site";

type AvailabilityResponse = {
  services: ChairService[];
  serviceId: string;
  days: PublicDay[];
  next: { date: string; weekday: string; start: string } | null;
  store: string;
  error?: string;
};

type Confirmed = {
  date: string;
  start: string;
  end: string;
  serviceName: string;
  whatsapp: string;
};

export function BookChair() {
  const [services, setServices] = useState<ChairService[]>(chairServices);
  const [serviceId, setServiceId] = useState(chairServices[0]?.id ?? "hair-cut");
  const [days, setDays] = useState<PublicDay[]>([]);
  const [next, setNext] = useState<AvailabilityResponse["next"]>(null);
  const [date, setDate] = useState("");
  const [start, setStart] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState<Confirmed | null>(null);

  const service = services.find((item) => item.id === serviceId) ?? services[0];
  const selectedDay = days.find((day) => day.date === date);
  const selectedSlot = selectedDay?.slots.find((slot) => slot.start === start);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    fetch(`/api/bookings/availability?service=${encodeURIComponent(serviceId)}`, {
      signal: controller.signal,
      cache: "no-store",
    })
      .then(async (response) => {
        const data = (await response.json()) as AvailabilityResponse;
        if (!response.ok) throw new Error(data.error || "Could not load times.");
        setServices(data.services);
        setDays(data.days);
        setNext(data.next);
        setDate((current) => {
          if (current && data.days.some((day) => day.date === current && !day.closed)) {
            return current;
          }
          return data.next?.date ?? data.days.find((day) => !day.closed)?.date ?? "";
        });
        setStart("");
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Could not load times.");
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [serviceId]);

  const openDays = useMemo(() => days.filter((day) => !day.closed), [days]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!date || !start) {
      setError("Pick a day and a time.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId, date, start, name, phone }),
      });
      const data = (await response.json()) as {
        error?: string;
        booking?: Confirmed;
        whatsapp?: string;
      };
      if (!response.ok || !data.booking) {
        throw new Error(data.error || "That time was just taken.");
      }
      setConfirmed({
        ...data.booking,
        whatsapp: data.whatsapp ?? site.whatsapp,
      });
      setStart("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not book that time.");
    } finally {
      setSaving(false);
    }
  }

  if (confirmed) {
    return (
      <section id="book" className="px-5 pb-16 md:px-8">
        <div className="card mx-auto max-w-3xl p-7">
          <p className="text-sm font-semibold text-teal">You’re in the book</p>
          <h2 className="mt-1 font-display text-4xl">See you in the chair</h2>
          <p className="mt-4 text-lg">
            {confirmed.serviceName} on {formatLondonLongDay(confirmed.date)} at{" "}
            {confirmed.start}.
          </p>
          <p className="mt-3 text-muted">
            Yusuf has the time held. Walk-ins still happen around the book, so
            send him a WhatsApp if you want a last-minute change.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={confirmed.whatsapp} className="btn btn-gold">
              WhatsApp Yusuf
            </a>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setConfirmed(null)}
            >
              Book another time
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="book" className="px-5 pb-16 md:px-8">
      <form
        onSubmit={onSubmit}
        className="card mx-auto grid max-w-3xl gap-5 p-7"
      >
        <div>
          <p className="text-sm font-semibold text-teal">Book the chair</p>
          <h2 className="mt-1 font-display text-4xl">See Yusuf’s availability</h2>
          <p className="mt-2 text-muted">
            Green times are free. Taken slots stay private — you only see that
            the chair is busy. Walk-ins are still welcome if a gap appears.
          </p>
          {next ? (
            <p className="mt-3 text-sm text-teal">
              Next free {service?.minutes}-minute slot: {formatLondonDay(next.date)} at {next.start}.
            </p>
          ) : null}
        </div>

        <label className="block text-sm">
          <span className="text-muted">Service</span>
          <select
            value={serviceId}
            onChange={(event) => setServiceId(event.target.value)}
            className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-3 text-ink outline-none"
          >
            {services.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} · {item.price} · {item.minutes} min
              </option>
            ))}
          </select>
        </label>

        <div>
          <p className="text-sm text-muted">Day</p>
          <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
            {days.map((day) => {
              const free = day.slots.filter((slot) => slot.available).length;
              const selected = day.date === date;
              return (
                <button
                  key={day.date}
                  type="button"
                  disabled={day.closed}
                  onClick={() => {
                    setDate(day.date);
                    setStart("");
                  }}
                  className={`min-w-[5.6rem] rounded-2xl border px-3 py-3 text-left text-sm ${
                    selected
                      ? "border-gold bg-gold text-paper"
                      : day.closed
                        ? "cursor-not-allowed border-line bg-cream/60 text-muted"
                        : "border-line bg-cream"
                  }`}
                >
                  <span className="block font-semibold">{formatLondonDay(day.date)}</span>
                  <span className="block text-xs opacity-80">
                    {day.closed ? "Closed" : `${free} free`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="text-sm text-muted">Time</p>
          {loading ? (
            <p className="mt-3 text-muted">Checking the book…</p>
          ) : selectedDay && selectedDay.slots.length > 0 ? (
            <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {selectedDay.slots.map((slot) => {
                const selected = slot.start === start;
                return (
                  <button
                    key={slot.start}
                    type="button"
                    disabled={!slot.available}
                    onClick={() => setStart(slot.start)}
                    className={`rounded-xl border px-3 py-2.5 text-sm font-semibold ${
                      selected
                        ? "border-gold bg-gold text-paper"
                        : slot.available
                          ? "border-lime/40 bg-lime/10 text-ink"
                          : "cursor-not-allowed border-line bg-cream text-muted line-through"
                    }`}
                  >
                    {slot.start}
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="mt-3 text-muted">
              {openDays.length
                ? "No free times that day for this service."
                : "No online times this fortnight. WhatsApp Yusuf or walk in."}
            </p>
          )}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="block text-sm">
            <span className="text-muted">Your name</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-3 text-ink outline-none ring-gold/30 focus:ring"
              placeholder="First name"
            />
          </label>
          <label className="block text-sm">
            <span className="text-muted">Mobile</span>
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              required
              inputMode="tel"
              autoComplete="tel"
              className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-3 text-ink outline-none ring-gold/30 focus:ring"
              placeholder="07902 000000"
            />
          </label>
        </div>

        {selectedSlot ? (
          <p className="text-sm text-muted">
            Holding {service?.name} from {selectedSlot.start} to {selectedSlot.end} on{" "}
            {formatLondonLongDay(date)}.
          </p>
        ) : null}

        {error ? <p className="text-sm font-semibold text-teal">{error}</p> : null}

        <button type="submit" className="btn btn-gold" disabled={saving || !start}>
          {saving ? "Holding the chair…" : "Book this time"}
        </button>
        <p className="text-xs text-muted">
          Prefer a message instead?{" "}
          <a className="font-semibold text-teal" href={site.whatsapp}>
            WhatsApp {site.phoneDisplay}
          </a>
          . Yusuf’s diary is at{" "}
          <a className="font-semibold text-teal" href="/chair">
            /chair
          </a>
          .
        </p>
      </form>
    </section>
  );
}
