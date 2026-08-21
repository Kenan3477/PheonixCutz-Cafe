"use client";

import Link from "next/link";
import { useState } from "react";
import { Wordmark } from "@/components/Brand";
import { HoursPill } from "@/components/HoursPill";
import { site, whatsappHref } from "@/lib/site";

const links = [
  { href: "/#kitchen", label: "Kitchen" },
  { href: "/menu", label: "Menu" },
  { href: "/barber", label: "The chair" },
  { href: "/visit", label: "Visit" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 md:px-8">
        <Wordmark compact />
        <nav className="hidden items-center gap-7 text-[0.78rem] tracking-[0.2em] uppercase text-gold-soft lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-paper"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <HoursPill className="hidden md:inline-flex" />
          <a
            href={whatsappHref(
              "Hi Phoenix — I’d like to book a chair / ask about the kitchen.",
            )}
            className="hidden rounded-full bg-gold px-4 py-2 text-[0.72rem] font-semibold tracking-[0.18em] text-ink uppercase transition hover:bg-gold-soft sm:inline-flex"
          >
            WhatsApp
          </a>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-gold/30 text-gold lg:hidden"
            aria-expanded={open}
            aria-label="Open menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">Menu</span>
            <span className="block w-4 border-t border-current" />
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-white/5 bg-ink px-5 py-5 lg:hidden">
          <div className="flex flex-col gap-4 text-sm tracking-[0.22em] uppercase">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a href={site.whatsapp}>WhatsApp the house</a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black px-5 py-14 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Wordmark />
          <p className="mt-5 max-w-md text-sm leading-7 text-muted">
            Cafe and Turkish barber on Wimborne Road, Winton. Same door, two
            trades, one house — Yusuf’s chair and a kitchen that plates Full
            English, burgers, bagels and coffee.
          </p>
        </div>
        <div>
          <p className="text-[0.7rem] tracking-[0.24em] text-gold uppercase">
            House
          </p>
          <ul className="mt-4 space-y-2 text-sm text-gold-soft">
            <li>
              <Link href="/menu">Kitchen menu</Link>
            </li>
            <li>
              <Link href="/barber">Barber prices</Link>
            </li>
            <li>
              <Link href="/visit">Find us</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[0.7rem] tracking-[0.24em] text-gold uppercase">
            Contact
          </p>
          <ul className="mt-4 space-y-2 text-sm text-gold-soft">
            <li>
              <a href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>
            </li>
            <li>
              <a href={site.instagram}>{site.instagramHandle}</a>
            </li>
            <li>
              <a href={site.facebook}>Facebook</a>
            </li>
            <li>
              <a href={site.hygiene.url}>
                Food hygiene {site.hygiene.rating}/5
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="gold-rule mx-auto mt-12 max-w-7xl" />
      <p className="mx-auto mt-6 max-w-7xl text-xs text-muted">
        © {new Date().getFullYear()} {site.name} · {site.address.display}
      </p>
    </footer>
  );
}
