"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Wordmark } from "@/components/Brand";
import { HoursPill } from "@/components/HoursPill";
import { site, whatsappHref } from "@/lib/site";

const links = [
  { href: "/menu", label: "Eat" },
  { href: "/barber", label: "Cut" },
  { href: "/visit", label: "Visit" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8">
        <Wordmark compact />
        <nav className="hidden items-center gap-8 text-[0.95rem] text-ink/80 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname === link.href
                  ? "font-semibold text-ink underline decoration-gold decoration-2 underline-offset-8"
                  : "hover:text-ink"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <HoursPill className="hidden lg:inline-flex" />
          <a
            href={whatsappHref("Hi Phoenix — can I book a haircut?")}
            className="btn btn-gold hidden sm:inline-flex"
          >
            Book a cut
          </a>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-paper md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="flex w-4 flex-col gap-1">
              <span className="block h-px bg-ink" />
              <span className="block h-px bg-ink" />
              <span className="block h-px bg-ink" />
            </span>
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-line bg-cream px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4 text-lg">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <HoursPill />
            <a className="btn btn-gold" href={site.whatsapp}>
              WhatsApp the shop
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink-deep px-5 py-16 text-cream md:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Wordmark tone="dark" />
          <p className="mt-5 max-w-md text-[0.95rem] leading-7 text-cream/70">
            Cafe and Turkish barber on Wimborne Road, Winton. Come for a Full
            English, stay for a fade — or the other way round.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-gold-soft">On this site</p>
          <ul className="mt-4 space-y-2 text-cream/80">
            <li>
              <Link href="/menu">Food and coffee</Link>
            </li>
            <li>
              <Link href="/barber">Haircuts and prices</Link>
            </li>
            <li>
              <Link href="/visit">Hours and map</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-gold-soft">Get in touch</p>
          <ul className="mt-4 space-y-2 text-cream/80">
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
      <p className="mx-auto mt-12 max-w-6xl text-sm text-cream/45">
        © {new Date().getFullYear()} {site.name} · {site.address.display}
      </p>
    </footer>
  );
}

export function MobileDock() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-3 gap-2 rounded-full border border-line bg-paper/95 p-1.5 shadow-xl backdrop-blur md:hidden">
      <Link
        href="/menu"
        className={`rounded-full px-2 py-2.5 text-center text-sm font-semibold ${
          pathname === "/menu" ? "bg-cream" : ""
        }`}
      >
        Menu
      </Link>
      <a
        href={whatsappHref("Hi Yusuf — can I book a chair?")}
        className="rounded-full bg-gold px-2 py-2.5 text-center text-sm font-semibold text-paper"
      >
        Book
      </a>
      <a
        href={site.address.mapsUrl}
        className="rounded-full px-2 py-2.5 text-center text-sm font-semibold"
      >
        Map
      </a>
    </nav>
  );
}
