import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { HoursPill } from "@/components/HoursPill";
import { site, whatsappHref } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden">
      <Image
        src="/images/real/breakfast-full-english-mushrooms.jpg"
        alt="Full English breakfast at Phoenix Cafe, Winton, with the black and gold welcome menu"
        fill
        priority
        className="object-cover object-[50%_35%]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink to-transparent" />
      <Embers />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-20">
        <div className="reveal max-w-3xl">
          <HoursPill />
          <p className="mt-6 font-script text-4xl text-gold-soft md:text-5xl">
            {site.scriptLine}
          </p>
          <h1 className="mt-2 font-display text-[18vw] leading-[0.78] tracking-tight text-paper uppercase sm:text-8xl md:text-[7.4rem]">
            Phoenix
            <span className="block text-[0.38em] tracking-[0.34em] text-gold">
              Cutz & Cafe
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-gold-soft/90 md:text-lg">
            Winton’s house for a Full English and a Turkish cut. One door on
            Wimborne Road — kitchen, coffee, and Yusuf’s chair.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/menu"
              className="rounded-full bg-gold px-6 py-3 text-sm font-semibold tracking-[0.16em] text-ink uppercase"
            >
              See the kitchen
            </Link>
            <a
              href={whatsappHref(
                "Hi Yusuf — can I book a chair at Phoenix Turkish Barber?",
              )}
              className="rounded-full border border-gold/50 px-6 py-3 text-sm tracking-[0.16em] text-gold-soft uppercase"
            >
              Book the chair
            </a>
          </div>
          <p className="mt-6 text-xs tracking-[0.22em] text-muted uppercase">
            {site.address.area} · {site.address.postcode} · {site.instagramHandle}
          </p>
        </div>
      </div>
    </section>
  );
}

function Embers() {
  const motes = [
    { left: "8%", delay: "0s", duration: "11s", drift: "-20px" },
    { left: "22%", delay: "2s", duration: "13s", drift: "30px" },
    { left: "41%", delay: "4s", duration: "10s", drift: "-12px" },
    { left: "63%", delay: "1s", duration: "14s", drift: "24px" },
    { left: "81%", delay: "3s", duration: "12s", drift: "-28px" },
  ];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {motes.map((mote) => (
        <span
          key={mote.left}
          className="ember"
          style={
            {
              left: mote.left,
              animationDelay: mote.delay,
              animationDuration: mote.duration,
              "--drift": mote.drift,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
