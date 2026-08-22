"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  chairServices,
  occupyPublicDays,
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
        setError("");
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Could not load times.");
        setLoading(false);
      });
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
        days?: PublicDay[];
        next?: AvailabilityResponse["next"];
        whatsapp?: string;
      };
      if (!response.ok || !data.booking) {
        throw new Error(data.error || "That time was just taken.");
      }
      setDays(
        data.days ??
          occupyPublicDays(days, date, start, service?.minutes ?? 30),
      );
      if (data.next !== undefined) setNext(data.next);
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

  return (
    <section id="book" className="dark-section px-5 py-16 md:px-8">
      <form onSubmit={onSubmit} className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-[0.18em] uppercase text-gold-soft">
            Book the chair
          </p>
          <h2 className="mt-3 font-display text-5xl text-cream md:text-6xl">
            Yusuf’s availability
          </h2>
          <p className="mt-4 max-w-xl text-cream/70">
            Gold times are free. Dim times are already taken — names stay
            private. Walk-ins are still welcome if a chair comes free.
          </p>
          {next ? (
            <p className="mt-4 text-sm text-gold-soft">
              Next free {service?.minutes}-minute slot: {formatLondonDay(next.date)} at {next.start}
            </p>
          ) : null}
        </div>

        {confirmed ? (
          <div className="mt-8 rounded-[1.6rem] border border-gold/40 bg-gold/10 px-6 py-5">
            <p className="text-sm font-semibold text-gold-soft">You’re in the book</p>
            <p className="mt-2 font-display text-3xl text-cream">
              {confirmed.serviceName} · {formatLondonLongDay(confirmed.date)} at {confirmed.start}
            </p>
            <p className="mt-2 text-cream/70">
              That time now shows as taken. WhatsApp Yusuf if you need to change it.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={confirmed.whatsapp} className="btn btn-gold">
                WhatsApp Yusuf
              </a>
              <button
                type="button"
                className="btn btn-ghost-dark"
                onClick={() => setConfirmed(null)}
              >
                Book another time
              </button>
            </div>
          </div>
        ) : null}

        <div className="mt-10 grid gap-8 lg:grid-cols-[17rem_1fr]">
          <label className="block text-sm text-cream/70">
            Service
            <select
              value={serviceId}
              onChange={(event) => {
                setServiceId(event.target.value);
                setLoading(true);
                setStart("");
                setConfirmed(null);
              }}
              className="mt-3 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-cream outline-none"
            >
              {services.map((item) => (
                <option key={item.id} value={item.id} className="text-ink">
                  {item.name} · {item.price} · {item.minutes} min
                </option>
              ))}
            </select>
          </label>

          <div>
            <p className="text-sm text-cream/70">Day</p>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
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
                    className={`min-w-[5.4rem] rounded-2xl border px-3 py-3 text-left text-sm ${
                      selected
                        ? "border-gold bg-gold text-paper"
                        : day.closed
                          ? "cursor-not-allowed border-white/5 bg-white/5 text-cream/30"
                          : "border-white/10 bg-white/5 text-cream"
                    }`}
                  >
                    <span className="block font-semibold">{formatLondonDay(day.date)}</span>
                    <span className="block text-xs opacity-75">
                      {day.closed ? "Closed" : `${free} free`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-sm text-cream/70">Time</p>
          {loading ? (
            <p className="mt-4 text-cream/55">Checking the book…</p>
          ) : selectedDay && selectedDay.slots.length > 0 ? (
            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
              {selectedDay.slots.map((slot) => {
                const selected = slot.start === start;
                return (
                  <button
                    key={slot.start}
                    type="button"
                    disabled={!slot.available}
                    onClick={() => setStart(slot.start)}
                    className={`rounded-2xl border px-3 py-3 text-sm font-semibold tracking-wide ${
                      selected
                        ? "border-gold bg-gold text-paper"
                        : slot.available
                          ? "border-gold/30 bg-gold/10 text-cream hover:border-gold"
                          : "cursor-not-allowed border-white/5 bg-white/[0.03] text-cream/25"
                    }`}
                  >
                    {slot.available ? slot.start : slot.start}
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="mt-4 text-cream/55">
              {openDays.length
                ? "No free times that day for this service."
                : "No online times this fortnight. WhatsApp Yusuf or walk in."}
            </p>
          )}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
          <label className="block text-sm text-cream/70">
            Your name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="mt-3 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-cream outline-none ring-gold/30 focus:ring"
              placeholder="First name"
            />
          </label>
          <label className="block text-sm text-cream/70">
            Mobile
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              required
              inputMode="tel"
              autoComplete="tel"
              className="mt-3 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-cream outline-none ring-gold/30 focus:ring"
              placeholder="07902 000000"
            />
          </label>
          <button
            type="submit"
            className="btn btn-gold w-full md:w-auto"
            disabled={saving || !start}
          >
            {saving ? "Holding…" : "Hold this time"}
          </button>
        </div>

        {selectedSlot ? (
          <p className="mt-4 text-sm text-cream/60">
            {service?.name} from {selectedSlot.start} to {selectedSlot.end} on{" "}
            {formatLondonLongDay(date)}.
          </p>
        ) : null}
        {error ? <p className="mt-4 text-sm font-semibold text-gold-soft">{error}</p> : null}
        <p className="mt-6 text-sm text-cream/45">
          Prefer a message?{" "}
          <a className="text-gold-soft" href={site.whatsapp}>
            WhatsApp {site.phoneDisplay}
          </a>
        </p>
      </form>
    </section>
  );
}
