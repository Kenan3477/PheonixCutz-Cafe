import Image from "next/image";
import Link from "next/link";
import { HoursPill } from "@/components/HoursPill";
import { site } from "@/lib/site";

export function CutHero() {
  return (
    <section className="relative isolate min-h-[88vh] overflow-hidden bg-ink-deep text-cream">
      <Image
        src="/images/real/barber-door.jpg"
        alt="The door into Yusuf’s barber, looking through to the chairs"
        fill
        priority
        className="object-cover object-[50%_40%]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/50 to-transparent" />
      <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-5 py-16 md:px-8 md:py-20">
        <HoursPill dark className="inline-flex max-w-[min(100%,22rem)]" />
        <p className="mt-6 font-script text-4xl text-gold-soft">Good Cutz</p>
        <h1 className="mt-1 max-w-3xl font-display text-5xl leading-[0.95] md:text-7xl">
          Yusuf’s chair
        </h1>
        <p className="mt-5 max-w-xl text-[1.05rem] leading-7 text-cream/80">
          Same door as the cafe, then through to the chairs. Complimentary
          Turkish tea while you wait, and a lollipop for the kids.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/barber#book" className="btn btn-gold">
            Book a cut
          </Link>
          <a href={site.whatsapp} className="btn btn-ghost-dark">
            WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}
