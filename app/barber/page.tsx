import type { Metadata } from "next";
import Image from "next/image";
import { ChairBand } from "@/components/Sections";
import { BookChair } from "@/components/BookChair";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Turkish Barber",
  description:
    "Phoenix Turkish Barber price list at 493 Wimborne Road, Winton. Haircuts, wet shaves, kids cuts and the Phoenix Special.",
};

export default function BarberPage() {
  return (
    <div className="pt-24">
      <section className="relative isolate min-h-[52vh] overflow-hidden">
        <Image
          src="/images/real/godaddy-hero.jpg"
          alt="Phoenix Turkish Barber crossed-shears emblem"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="relative mx-auto flex min-h-[52vh] max-w-7xl flex-col justify-end px-5 pb-14 md:px-8">
          <p className="font-script text-4xl text-gold-soft">{site.feel}</p>
          <h1 className="mt-2 font-display text-6xl uppercase md:text-8xl">
            The chair
          </h1>
          <p className="mt-4 max-w-xl text-gold-soft">
            WhatsApp Yusuf to hold a time. Walk-ins welcome. Cash is listed as
            the usual payment on local barber directories.
          </p>
        </div>
      </section>
      <ChairBand />
      <BookChair />
    </div>
  );
}
