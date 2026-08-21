"use client";

import { FormEvent, useMemo, useState } from "react";
import { chair, whatsappHref } from "@/lib/site";

const services = chair.groups.flatMap((group) =>
  group.items.map((item) => `${item.name} (${item.price})`),
);

export function BookChair() {
  const [name, setName] = useState("");
  const [service, setService] = useState(services.at(-2) ?? services[0]);
  const [when, setWhen] = useState("");

  const href = useMemo(() => {
    const lines = [
      `Hi Yusuf — booking request from the Phoenix website.`,
      name ? `Name: ${name}` : null,
      `Service: ${service}`,
      when ? `Preferred time: ${when}` : "Preferred time: first available",
    ].filter(Boolean);
    return whatsappHref(lines.join("\n"));
  }, [name, service, when]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="px-5 pb-16 md:px-8">
      <form
        onSubmit={onSubmit}
        className="card mx-auto grid max-w-3xl gap-5 p-7 md:grid-cols-2"
      >
        <div className="md:col-span-2">
          <p className="text-sm font-semibold text-teal">WhatsApp the chair</p>
          <h2 className="mt-1 font-display text-4xl">Hold a time</h2>
          <p className="mt-2 text-muted">
            This opens WhatsApp with your request filled in. Nothing is stored
            on the website.
          </p>
        </div>
        <label className="block text-sm">
          <span className="text-muted">Your name</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-3 text-ink outline-none ring-gold/30 focus:ring"
            placeholder="First name"
          />
        </label>
        <label className="block text-sm">
          <span className="text-muted">Preferred time</span>
          <input
            value={when}
            onChange={(event) => setWhen(event.target.value)}
            className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-3 text-ink outline-none ring-gold/30 focus:ring"
            placeholder="Saturday after 11"
          />
        </label>
        <label className="block text-sm md:col-span-2">
          <span className="text-muted">Service</span>
          <select
            value={service}
            onChange={(event) => setService(event.target.value)}
            className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-3 text-ink outline-none"
          >
            {services.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="btn btn-gold md:col-span-2">
          Open WhatsApp
        </button>
      </form>
    </section>
  );
}
