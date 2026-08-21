import Image from "next/image";
import Link from "next/link";
import { LogoMark } from "@/components/Brand";
import { HoursPill } from "@/components/HoursPill";
import { kitchen, site } from "@/lib/site";

const jumps = [
  { href: "#breakfast", label: "Breakfast" },
  { href: "#omelettes", label: "Omelettes" },
  { href: "#baps", label: "Baps" },
  { href: "#bagels", label: "Bagels" },
  { href: "#toasties", label: "Toasties" },
  { href: "#lunch", label: "Lunch" },
  { href: "#kids", label: "Kids" },
  { href: "#drinks", label: "Coffee" },
  { href: "#sweets", label: "Sweets" },
];

export function EatMenu() {
  return (
    <div>
      <section className="relative isolate min-h-[70vh] overflow-hidden bg-ink-deep text-cream">
        <Image
          src="/images/real/breakfast-full-english-mushrooms.jpg"
          alt="Full English at Phoenix Cafe with the black and gold welcome menu"
          fill
          priority
          className="object-cover object-[50%_28%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/60 to-ink-deep/20" />
        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-end px-5 py-16 md:px-8">
          <p className="font-script text-4xl text-gold-soft">Good Day</p>
          <h1 className="mt-2 font-display text-5xl leading-[0.95] md:text-7xl">
            The kitchen
          </h1>
          <p className="mt-5 max-w-xl text-cream/80">{kitchen.intro}</p>
          <div className="mt-6">
            <HoursPill dark />
          </div>
          <p className="mt-6 text-sm text-cream/60">
            Hygiene{" "}
            <a href={site.hygiene.url} className="underline decoration-gold/50">
              5/5 · {site.hygiene.label}
            </a>
            . Cash and card at the cafe counter.
          </p>
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

      {kitchen.menu.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="mx-auto max-w-6xl scroll-mt-32 px-5 py-14 md:px-8"
        >
          <p className="text-sm font-semibold text-teal">Printed menu</p>
          <h2 className="mt-1 font-display text-5xl">{section.title}</h2>
          {section.id === "breakfast" ? (
            <p className="mt-3 max-w-2xl text-muted">{kitchen.breakfastNote}</p>
          ) : null}
          {section.id === "omelettes" ? (
            <p className="mt-3 max-w-2xl text-muted">{kitchen.omeletteNote}</p>
          ) : null}
          <div className="mt-8 overflow-hidden rounded-[1.6rem] border border-line bg-paper">
            {section.items.map((item) => (
              <article
                key={item.name}
                className={`border-b border-line last:border-b-0 ${
                  "photo" in item && item.photo
                    ? "grid gap-0 md:grid-cols-[220px_1fr]"
                    : ""
                }`}
              >
                {"photo" in item && item.photo ? (
                  <div className="relative min-h-[180px]">
                    <Image
                      src={item.photo}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="220px"
                    />
                  </div>
                ) : null}
                <div className="flex items-start justify-between gap-6 px-5 py-5 md:px-7">
                  <div>
                    <h3 className="font-display text-2xl">{item.name}</h3>
                    {"detail" in item && item.detail ? (
                      <p className="mt-1 text-[0.95rem] text-muted">{item.detail}</p>
                    ) : null}
                  </div>
                  <p className="shrink-0 font-semibold">{item.price}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      <section
        id="drinks"
        className="scroll-mt-32 bg-ink-deep px-5 py-16 text-cream md:px-8"
      >
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="relative min-h-[420px] overflow-hidden rounded-[1.8rem]">
            <Image
              src="/images/real/coffee-latte-counter.jpg"
              alt="Latte, loyalty card and the yellow drinks board at Phoenix Cafe"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
          <div>
            <LogoMark size={64} className="mb-5" />
            <p className="font-script text-3xl text-gold-soft">Good Coffee</p>
            <h2 className="mt-2 font-display text-5xl">From the yellow board</h2>
            <p className="mt-3 text-sm text-cream/60">{kitchen.milkNote}</p>
            <ul className="mt-8">
              {kitchen.drinks.map((item) => (
                <li key={item.name} className="price-row text-cream">
                  <span>{item.name}</span>
                  <span className="font-semibold text-gold-soft">{item.price}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm font-semibold text-gold-soft">Tea</p>
            <ul className="mt-2">
              {kitchen.teas.map((item) => (
                <li key={item.name} className="price-row text-cream">
                  <span>{item.name}</span>
                  <span className="font-semibold text-gold-soft">{item.price}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm font-semibold text-gold-soft">Milkshakes</p>
            <ul className="mt-2">
              {kitchen.milkshakes.map((item) => (
                <li key={item.name} className="price-row text-cream">
                  <span>{item.name}</span>
                  <span className="font-semibold text-gold-soft">{item.price}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 rounded-2xl bg-white/5 px-4 py-3 text-sm">
              Loyalty card: {kitchen.loyalty}
            </p>
          </div>
        </div>
      </section>

      <section id="sweets" className="mx-auto max-w-6xl scroll-mt-32 px-5 py-16 md:px-8">
        <p className="text-sm font-semibold text-teal">Cake and sweets</p>
        <h2 className="mt-1 font-display text-5xl">From the printed menu</h2>
        <div className="mt-8 overflow-hidden rounded-[1.6rem] border border-line bg-paper">
          {kitchen.sweets.map((item) => (
            <div
              key={item.name}
              className="flex items-start justify-between gap-6 border-b border-line px-5 py-5 last:border-b-0 md:px-7"
            >
              <div>
                <h3 className="font-display text-2xl">{item.name}</h3>
                {"detail" in item && item.detail ? (
                  <p className="mt-1 text-muted">{item.detail}</p>
                ) : null}
              </div>
              <p className="shrink-0 font-semibold">{item.price}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">
          Smaller counter bakes on the chalkboard:{" "}
          {kitchen.counterBakes.map((item) => `${item.name} ${item.price}`).join(" · ")}.
        </p>
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
