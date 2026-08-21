import Image from "next/image";
import Link from "next/link";
import { HoursPill } from "@/components/HoursPill";
import { site, whatsappHref } from "@/lib/site";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-stretch gap-6 px-5 py-6 md:px-8 lg:grid-cols-2 lg:py-10">
      <div className="relative min-h-[420px] overflow-hidden rounded-[1.8rem] lg:min-h-[640px]">
        <Image
          src="/images/real/breakfast-full-english-mushrooms.jpg"
          alt="Full English breakfast at Phoenix Cafe, Winton, with the black and gold welcome menu"
          fill
          priority
          className="object-cover object-[50%_30%]"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>
      <div className="flex flex-col justify-center rounded-[1.8rem] bg-paper px-6 py-10 md:px-10">
        <HoursPill />
        <p className="mt-6 font-script text-3xl text-gold">Good Day</p>
        <h1 className="mt-1 font-display text-5xl leading-[0.95] text-ink md:text-6xl">
          Cafe and Turkish barber in Winton
        </h1>
        <p className="mt-5 max-w-md text-[1.05rem] leading-7 text-muted">
          One door on Wimborne Road. Full English plates and proper coffee on
          one side, Yusuf’s chair on the other. Walk in, say hello.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/menu" className="btn btn-ink">
            See food and coffee
          </Link>
          <a
            href={whatsappHref("Hi Yusuf — can I book a chair at Phoenix?")}
            className="btn btn-gold"
          >
            Book a haircut
          </a>
        </div>
        <dl className="mt-8 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted">Find us</dt>
            <dd className="font-medium">
              493 Wimborne Road
              <br />
              Winton, BH9 2AW
            </dd>
          </div>
          <div>
            <dt className="text-muted">WhatsApp</dt>
            <dd className="font-medium">{site.phoneDisplay}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
