import Image from "next/image";
import Link from "next/link";
import { HoursPill } from "@/components/HoursPill";
import { site, whatsappHref } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative isolate min-h-[88vh] overflow-hidden bg-ink-deep text-cream">
      <Image
        src="/images/real/shop-front.jpg"
        alt="Phoenix Turkish Barber by Yusuf and the cafe at 493 Wimborne Road, Winton"
        fill
        priority
        className="object-cover object-[50%_12%]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/50 to-transparent" />
      <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-5 py-16 md:px-8 md:py-20">
        <HoursPill dark className="inline-flex max-w-[min(100%,22rem)]" />
        <p className="mt-6 font-script text-4xl text-gold-soft">Good Day</p>
        <h1 className="mt-1 max-w-3xl font-display text-5xl leading-[0.95] md:text-7xl">
          Cafe and Turkish barber in Winton
        </h1>
        <p className="mt-5 max-w-xl text-[1.05rem] leading-7 text-cream/80">
          One door on Wimborne Road. Full English plates and proper coffee on
          one side, Yusuf’s chair on the other. Walk in, say hello.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/menu" className="btn btn-gold">
            See the menu
          </Link>
          <a
            href={whatsappHref("Hi Yusuf — can I book a chair at Phoenix?")}
            className="btn btn-ghost-dark"
          >
            Book a haircut
          </a>
        </div>
        <dl className="mt-10 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-cream/55">Find us</dt>
            <dd className="font-medium">
              493 Wimborne Road
              <br />
              Winton, BH9 2AW
            </dd>
          </div>
          <div>
            <dt className="text-cream/55">WhatsApp</dt>
            <dd className="font-medium">{site.phoneDisplay}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
