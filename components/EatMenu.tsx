import Image from "next/image";
import Link from "next/link";
import { LogoMark } from "@/components/Brand";
import { HoursPill } from "@/components/HoursPill";
import { kitchen, site } from "@/lib/site";

const breakfast = kitchen.plates.filter((plate) => plate.section === "breakfast");
const plates = kitchen.plates.filter((plate) => plate.section === "plates");

const jumps = [
  { href: "#breakfast", label: "Breakfast" },
  { href: "#plates", label: "Plates" },
  { href: "#drinks", label: "Coffee" },
  { href: "#sweets", label: "Sweets" },
];

export function EatMenu() {
  return (
    <div>
      <section className="mx-auto grid max-w-6xl items-stretch gap-6 px-5 py-6 md:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative min-h-[380px] overflow-hidden rounded-[1.8rem] lg:min-h-[560px]">
          <Image
            src="/images/real/breakfast-full-english-mushrooms.jpg"
            alt="Full English at Phoenix Cafe with the black and gold welcome menu"
            fill
            priority
            className="object-cover object-[50%_28%]"
            sizes="(min-width: 1024px) 55vw, 100vw"
          />
        </div>
        <div className="flex flex-col justify-center rounded-[1.8rem] bg-ink-deep px-6 py-10 text-cream md:px-9">
          <p className="font-script text-4xl text-gold-soft">Good Day</p>
          <h1 className="mt-2 font-display text-5xl leading-[0.95] md:text-6xl">
            The kitchen
          </h1>
          <p className="mt-5 text-cream/75">
            Walk in, take a lime booth, order from the board. We list every
            plate they have photographed, and every drink price we can read on
            their yellow counter menu.
          </p>
          <div className="mt-6">
            <HoursPill dark />
          </div>
          <dl className="mt-8 grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-cream/50">Food prices</dt>
              <dd>On the board — ask when you order</dd>
            </div>
            <div>
              <dt className="text-cream/50">Hygiene</dt>
              <dd>
                <a href={site.hygiene.url} className="underline decoration-gold/50">
                  5/5 · {site.hygiene.label}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <nav className="sticky top-[4.2rem] z-40 border-y border-line bg-cream/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-5 py-3 md:px-8">
          {jumps.map((jump) => (
            <a
              key={jump.href}
              href={jump.href}
              className="shrink-0 rounded-full border border-line bg-paper px-4 py-2 text-sm font-semibold"
            >
              {jump.label}
            </a>
          ))}
        </div>
      </nav>

      <section id="breakfast" className="mx-auto max-w-6xl scroll-mt-32 px-5 py-16 md:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold text-teal">Breakfast</p>
            <h2 className="mt-1 font-display text-5xl">Plates from the morning</h2>
          </div>
          <p className="max-w-md text-muted">
            Photographed in the cafe. Tell the team about allergies — we do not
            guess ingredients beyond what is on the plate.
          </p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {breakfast.map((plate) => (
            <PlateCard key={plate.name} plate={plate} />
          ))}
        </div>
      </section>

      <section id="plates" className="bg-paper/60 px-5 py-16 md:px-8">
        <div className="mx-auto max-w-6xl scroll-mt-32">
          <p className="text-sm font-semibold text-teal">Later in the day</p>
          <h2 className="mt-1 font-display text-5xl">Burgers and bagels</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {plates.map((plate) => (
              <PlateCard key={plate.name} plate={plate} wide />
            ))}
          </div>
        </div>
      </section>

      <section
        id="drinks"
        className="mx-auto grid max-w-6xl scroll-mt-32 gap-6 px-5 py-16 md:px-8 lg:grid-cols-2"
      >
        <div className="relative min-h-[420px] overflow-hidden rounded-[1.8rem]">
          <Image
            src="/images/real/coffee-latte-counter.jpg"
            alt="Latte, loyalty card and the yellow drinks board at Phoenix Cafe"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
        <div className="rounded-[1.8rem] bg-ink-deep px-7 py-10 text-cream md:px-10">
          <LogoMark size={64} className="mb-5" />
          <p className="font-script text-3xl text-gold-soft">Good Coffee</p>
          <h2 className="mt-2 font-display text-4xl">From the yellow board</h2>
          <p className="mt-3 text-sm text-cream/60">
            Prices copied from the counter menu in their own photo.
          </p>
          <ul className="mt-8">
            {kitchen.drinks.map((item) => (
              <li
                key={item.name}
                className="flex items-baseline justify-between gap-4 border-b border-white/10 py-3"
              >
                <span>{item.name}</span>
                <span className="font-semibold text-gold-soft">
                  {item.price ?? "Ask"}
                </span>
              </li>
            ))}
          </ul>
          <p
            id="sweets"
            className="mt-10 scroll-mt-32 text-sm font-semibold text-gold-soft"
          >
            Sweets
          </p>
          <ul className="mt-3">
            {kitchen.sweets.map((item) => (
              <li
                key={item.name}
                className="flex items-baseline justify-between gap-4 border-b border-white/10 py-3"
              >
                <span>{item.name}</span>
                <span className="font-semibold text-gold-soft">{item.price}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 rounded-2xl bg-white/5 px-4 py-3 text-sm">
            Loyalty card: {kitchen.loyalty}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-20 md:grid-cols-3 md:px-8">
        <div className="card p-6">
          <h3 className="font-display text-2xl">Walk in</h3>
          <p className="mt-2 text-muted">
            No booking for food. Closed Mondays. Wimborne Road, Winton.
          </p>
          <Link href="/visit" className="mt-4 inline-flex font-semibold text-teal">
            Hours and map →
          </Link>
        </div>
        <div className="card p-6">
          <h3 className="font-display text-2xl">See today’s specials</h3>
          <p className="mt-2 text-muted">
            They post plates on Instagram as they cook them.
          </p>
          <a
            href={site.instagram}
            className="mt-4 inline-flex font-semibold text-teal"
          >
            {site.instagramHandle} →
          </a>
        </div>
        <div className="card p-6">
          <h3 className="font-display text-2xl">Stay for a cut</h3>
          <p className="mt-2 text-muted">
            Same door. Yusuf’s chair is next to the kitchen.
          </p>
          <Link href="/barber" className="mt-4 inline-flex font-semibold text-teal">
            Barber prices →
          </Link>
        </div>
      </section>
    </div>
  );
}

function PlateCard({
  plate,
  wide = false,
}: {
  plate: (typeof kitchen.plates)[number];
  wide?: boolean;
}) {
  return (
    <article className={`card overflow-hidden ${wide ? "md:grid md:grid-cols-2" : ""}`}>
      <div className={`relative ${wide ? "min-h-[280px]" : "aspect-[4/5]"}`}>
        <Image
          src={plate.photo}
          alt={plate.blurb}
          fill
          className="object-cover"
          sizes={wide ? "(min-width: 1024px) 40vw, 100vw" : "(min-width: 1024px) 30vw, 100vw"}
        />
      </div>
      <div className="flex flex-col justify-center p-6">
        <p className="text-sm font-semibold text-gold">{plate.tag}</p>
        <h3 className="mt-1 font-display text-3xl">{plate.name}</h3>
        <p className="mt-2 text-muted">{plate.blurb}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {plate.includes.map((item) => (
            <li
              key={item}
              className="rounded-full bg-cream px-3 py-1 text-sm text-ink"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
