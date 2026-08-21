import Image from "next/image";
import Link from "next/link";
import { Eyebrow, LeafCorners, LogoMark } from "@/components/Brand";
import { chair, gallery, kitchen, reviews, site } from "@/lib/site";

export function DualStory() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <article className="menu-card relative overflow-hidden p-8 md:p-12">
          <LeafCorners />
          <Eyebrow>The kitchen</Eyebrow>
          <h2 className="mt-4 font-display text-5xl text-paper">Phoenix Cafe</h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-gold-soft">
            Black menus, gold leaf, lime booths. Full English plates with beans
            in glass ramekins, garden breakfasts with avocado, bagels, burgers,
            and a yellow loyalty card on the coffee counter.
          </p>
          <p className="mt-4 font-script text-3xl text-gold">{site.coffeeLine}</p>
          <Link
            href="/menu"
            className="mt-8 inline-flex text-xs tracking-[0.22em] text-gold uppercase"
          >
            Open the kitchen menu →
          </Link>
        </article>
        <article className="relative overflow-hidden rounded-[1.6rem] bg-ink-2">
          <Image
            src="/images/real/godaddy-hero.jpg"
            alt="Phoenix Turkish Barber emblem — crossed shears and a phoenix"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/10" />
          <div className="relative flex min-h-[420px] flex-col justify-end p-8 md:p-12">
            <Eyebrow>The chair</Eyebrow>
            <h2 className="mt-4 font-display text-5xl text-paper">
              Turkish Barber
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-gold-soft">
              Yusuf’s house since 2022. Skin fades, wet shaves, kids’ cuts, and
              the Phoenix Special — hot wax, ear flame, hot towel, face mask.
            </p>
            <p className="mt-4 font-script text-3xl text-gold">{site.feel}</p>
            <Link
              href="/barber"
              className="mt-8 inline-flex text-xs tracking-[0.22em] text-gold uppercase"
            >
              See the chair list →
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}

export function KitchenBand() {
  return (
    <section id="kitchen" className="px-5 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow>From their Instagram</Eyebrow>
            <h2 className="mt-3 font-display text-5xl md:text-6xl">
              Plates from the house
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-muted">{kitchen.intro}</p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {kitchen.plates.map((plate) => (
            <figure
              key={plate.name}
              className="group overflow-hidden rounded-[1.4rem] bg-ink-2"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={plate.photo}
                  alt={plate.blurb}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                />
              </div>
              <figcaption className="p-6">
                <h3 className="font-display text-2xl text-paper">{plate.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{plate.blurb}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BoardPrices() {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-5 py-20 md:grid-cols-[1.1fr_0.9fr] md:px-8">
      <div className="relative overflow-hidden rounded-[1.6rem]">
        <Image
          src="/images/real/coffee-latte-counter.jpg"
          alt="Latte, loyalty card and the yellow drinks board at Phoenix Cafe"
          width={1403}
          height={1753}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="menu-card relative p-8 md:p-10">
        <LeafCorners />
        <Eyebrow>On the yellow board</Eyebrow>
        <h2 className="mt-3 font-display text-4xl">Coffee & sweets</h2>
        <p className="mt-4 text-sm leading-7 text-muted">
          Read from the counter menu in their own photo — not guessed.
        </p>
        <ul className="mt-8 space-y-3">
          {kitchen.drinks.map((item) => (
            <li
              key={item.name}
              className="flex items-baseline justify-between gap-4 border-b border-gold/15 pb-3"
            >
              <span className="text-paper">{item.name}</span>
              <span className="text-gold">{item.price ?? "Ask"}</span>
            </li>
          ))}
          {kitchen.sweets.map((item) => (
            <li
              key={item.name}
              className="flex items-baseline justify-between gap-4 border-b border-gold/15 pb-3"
            >
              <span className="text-paper">{item.name}</span>
              <span className="text-gold">{item.price}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 rounded-2xl border border-gold/20 px-4 py-3 text-sm text-gold-soft">
          Loyalty: {kitchen.loyalty}
        </p>
      </div>
    </section>
  );
}

export function ChairBand() {
  return (
    <section className="bg-black/40 px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Phoenix Turkish Barber</Eyebrow>
            <h2 className="mt-3 font-display text-5xl md:text-6xl">
              Feel the difference
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-muted">{chair.intro}</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {chair.groups.map((group) => (
            <div key={group.title} className="menu-card relative p-7">
              <LeafCorners />
              <h3 className="font-display text-3xl text-gold">{group.title}</h3>
              <ul className="mt-6 space-y-3">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-baseline justify-between gap-6 text-sm"
                  >
                    <span className="text-paper">{item.name}</span>
                    <span className="font-medium tracking-wide text-gold">
                      {item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm leading-7 text-gold-soft">{chair.specialNote}</p>
      </div>
    </section>
  );
}

export function GalleryBand() {
  return (
    <section className="px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-6">
          <div>
            <Eyebrow>Their camera</Eyebrow>
            <h2 className="mt-3 font-display text-5xl">From the house feed</h2>
          </div>
          <a
            href={site.instagram}
            className="hidden text-xs tracking-[0.2em] text-gold uppercase sm:inline"
          >
            {site.instagramHandle}
          </a>
        </div>
        <div className="mt-12 columns-1 gap-4 md:columns-2">
          {gallery.map((shot) => (
            <figure
              key={shot.src}
              className="mb-4 break-inside-avoid overflow-hidden rounded-[1.3rem]"
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                width={"wide" in shot && shot.wide ? 1600 : 1200}
                height={"wide" in shot && shot.wide ? 2000 : 1500}
                className="h-auto w-full object-cover"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ReviewsBand() {
  return (
    <section className="px-5 py-16 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
        {reviews.map((review) => (
          <blockquote
            key={review.quote}
            className="menu-card relative p-7"
          >
            <LeafCorners />
            <p className="font-display text-2xl leading-snug text-paper">
              “{review.quote}”
            </p>
            <footer className="mt-6 text-xs tracking-[0.18em] text-gold uppercase">
              {review.source}
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

export function VisitBand() {
  return (
    <section className="px-5 py-24 md:px-8">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[1.8rem] border border-gold/20 lg:grid-cols-2">
        <div className="bg-ink-2 p-8 md:p-12">
          <LogoMark size={72} />
          <div className="mt-8">
            <Eyebrow>Find the house</Eyebrow>
          </div>
          <h2 className="mt-3 font-display text-5xl">Wimborne Road, Winton</h2>
          <p className="mt-4 text-gold-soft">{site.address.display}</p>
          <p className="mt-2 text-sm text-muted">
            what3words · {site.address.what3words}
          </p>
          <dl className="mt-8 space-y-2 text-sm">
            {site.hours.map((row) => (
              <div
                key={row.day}
                className="flex justify-between border-b border-white/5 py-2"
              >
                <dt>{row.day}</dt>
                <dd className="text-gold">
                  {row.open && row.close ? `${row.open} – ${row.close}` : "Closed"}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-xs leading-6 text-muted">{site.hoursNote}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={site.address.mapsUrl}
              className="rounded-full bg-gold px-5 py-2 text-xs font-semibold tracking-[0.16em] text-ink uppercase"
            >
              Directions
            </a>
            <a
              href={`tel:${site.phoneTel}`}
              className="rounded-full border border-gold/40 px-5 py-2 text-xs tracking-[0.16em] text-gold uppercase"
            >
              {site.phoneDisplay}
            </a>
          </div>
          <p className="mt-8 text-sm text-gold-soft">
            Food hygiene {site.hygiene.rating}/5 · {site.hygiene.label} · inspected{" "}
            {site.hygiene.inspected}
          </p>
        </div>
        <div className="min-h-[420px] bg-black">
          <iframe
            title="Map of Phoenix Cutz & Cafe on Wimborne Road"
            src={site.address.embedUrl}
            className="h-full min-h-[420px] w-full border-0 grayscale contrast-125"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

export function WelcomeCard() {
  return (
    <section className="px-5 py-10 md:px-8">
      <div className="menu-card relative mx-auto max-w-xl px-8 py-16 text-center">
        <LeafCorners />
        <p className="font-script text-3xl text-paper">{site.scriptLine}</p>
        <LogoMark size={88} className="mx-auto mt-4" />
        <p className="mt-3 font-script text-2xl text-paper">{site.coffeeLine}</p>
        <p className="mt-8 font-display text-6xl text-gold">Menu</p>
        <p className="mt-6 text-sm tracking-[0.28em] text-gold uppercase">
          Welcome!
        </p>
        <p className="mt-3 text-xs tracking-[0.22em] text-gold-soft uppercase">
          {site.welcome}
        </p>
        <p className="mt-10 text-[0.7rem] tracking-[0.32em] text-gold uppercase">
          Phoenix Cafe
        </p>
      </div>
    </section>
  );
}
