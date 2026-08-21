import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/Brand";
import { chair, gallery, kitchen, reviews, site, whatsappHref } from "@/lib/site";

export function QuickFacts() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-6 md:px-8">
      <div className="grid gap-3 rounded-[1.6rem] border border-line bg-paper p-4 sm:grid-cols-2 lg:grid-cols-4">
        <Fact label="Hygiene" value={`5/5 · ${site.hygiene.label}`} href={site.hygiene.url} />
        <Fact label="Closed" value="Mondays" />
        <Fact label="Coffee loyalty" value="Buy 6, 7th free" />
        <Fact label="Haircut from" value="£14 · kids £9" href="/barber" />
      </div>
    </section>
  );
}

function Fact({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <>
      <p className="text-sm text-muted">{label}</p>
      <p className="font-semibold">{value}</p>
    </>
  );
  return href ? (
    <a href={href} className="rounded-xl px-3 py-2 hover:bg-cream">
      {inner}
    </a>
  ) : (
    <div className="px-3 py-2">{inner}</div>
  );
}

export function DualStory() {
  return (
    <section className="mx-auto grid max-w-6xl gap-5 px-5 py-10 md:px-8 lg:grid-cols-2">
      <article className="card overflow-hidden">
        <div className="relative h-64">
          <Image
            src="/images/real/interior-seating.jpg"
            alt="Seating inside Phoenix Cafe — copper ceiling, lime booths and herringbone floor"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
        <div className="p-7">
          <Eyebrow>Eat</Eyebrow>
          <h2 className="mt-2 font-display text-4xl">The cafe</h2>
          <p className="mt-3 text-muted">
            Full English, Turkish breakfast, baps, bagels, lasagna and coffee
            in the lime booths. Cash and card at the counter.
          </p>
          <Link href="/menu" className="mt-5 inline-flex font-semibold text-teal">
            See what’s cooking →
          </Link>
        </div>
      </article>
      <article className="card overflow-hidden">
        <div className="relative h-64 bg-ink-deep">
          <Image
            src="/images/real/godaddy-hero.jpg"
            alt="Phoenix Turkish Barber crossed-shears emblem"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
        <div className="p-7">
          <Eyebrow>Cut</Eyebrow>
          <h2 className="mt-2 font-display text-4xl">The barber</h2>
          <p className="mt-3 text-muted">
            Yusuf’s Turkish barber: skin fades, wet shaves, kids’ cuts, and the
            Phoenix Special with hot towel and face mask. Coffee while you wait.
          </p>
          <Link href="/barber" className="mt-5 inline-flex font-semibold text-teal">
            See prices and book →
          </Link>
        </div>
      </article>
    </section>
  );
}

export function ShopGallery() {
  return (
    <section className="px-5 py-12 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Eyebrow>The shop</Eyebrow>
        <h2 className="mt-2 font-display text-5xl">As it looks on Wimborne Road</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {gallery.map((shot) => (
            <figure
              key={shot.src}
              className={`relative overflow-hidden rounded-[1.6rem] ${
                shot.wide ? "md:col-span-2 min-h-[320px] md:min-h-[460px]" : "min-h-[280px]"
              }`}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                className={`object-cover ${
                  shot.src.includes("shop-front") ? "object-[50%_12%]" : ""
                }`}
                sizes={shot.wide ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function KitchenBand() {
  return (
    <section id="kitchen" className="px-5 py-14 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <Eyebrow>From the kitchen</Eyebrow>
          <h2 className="mt-2 font-display text-5xl">What they actually serve</h2>
          <p className="mt-4 text-muted">{kitchen.intro}</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {kitchen.plates.map((plate) => (
            <figure key={plate.name} className="card overflow-hidden">
              <div className="relative aspect-[4/5]">
                <Image
                  src={plate.photo}
                  alt={plate.blurb}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                />
              </div>
              <figcaption className="p-5">
                <h3 className="font-display text-2xl">{plate.name}</h3>
                <p className="mt-2 text-[0.95rem] leading-6 text-muted">
                  {plate.blurb}
                </p>
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
    <section className="px-5 pb-16 md:px-8">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[1.8rem] border border-line bg-paper lg:grid-cols-2">
        <div className="relative min-h-[360px]">
          <Image
            src="/images/real/cafe-counter.jpg"
            alt="Phoenix Cafe counter, pastry case and yellow drinks board"
            fill
            className="object-cover object-[60%_50%]"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
        <div className="p-7 md:p-10">
          <Eyebrow>On the yellow board</Eyebrow>
          <h2 className="mt-2 font-display text-4xl">Coffee and sweets</h2>
          <p className="mt-3 text-muted">
            {kitchen.intro} {kitchen.milkNote}
          </p>
          <ul className="mt-6">
            {kitchen.drinks.slice(0, 8).map((item) => (
              <li key={item.name} className="price-row">
                <span>{item.name}</span>
                <span className="font-semibold">{item.price}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 rounded-2xl bg-cream px-4 py-3 text-sm">
            Loyalty card: {kitchen.loyalty}
          </p>
        </div>
      </div>
    </section>
  );
}

export function ChairBand() {
  return (
    <section className="dark-section px-5 py-16 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <Eyebrow light>Phoenix Turkish Barber</Eyebrow>
          <h2 className="mt-2 font-display text-5xl text-cream">
            Honest prices for the chair
          </h2>
          <p className="mt-4 text-cream/70">{chair.intro}</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {chair.groups.map((group) => (
            <div
              key={group.title}
              className="rounded-[1.4rem] border border-white/10 bg-white/5 p-6"
            >
              <h3 className="font-display text-3xl text-gold-soft">{group.title}</h3>
              <ul className="mt-4">
                {group.items.map((item) => (
                  <li key={item.name} className="price-row text-[0.95rem]">
                    <span>{item.name}</span>
                    <span className="font-semibold text-gold-soft">{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-sm leading-7 text-cream/70">
          {chair.specialNote}
        </p>
        <a
          href={whatsappHref("Hi Yusuf — I’d like to book a haircut.")}
          className="btn btn-gold mt-6"
        >
          WhatsApp to book
        </a>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    {
      n: "1",
      title: "Come down Wimborne Road",
      text: "493, in Winton. Street parking. Closed Mondays.",
    },
    {
      n: "2",
      title: "Eat, or take a chair",
      text: "Walk in for food and coffee. For a cut, WhatsApp or wait for the next chair.",
    },
    {
      n: "3",
      title: "Ask if you’re unsure",
      text: "Food prices are on the printed menu. Drinks are on the yellow board. The team will talk you through allergies.",
    },
  ];

  return (
    <section className="px-5 py-16 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Eyebrow>A simple visit</Eyebrow>
        <h2 className="mt-2 font-display text-5xl">How it works</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.n} className="card p-6">
              <p className="font-display text-3xl text-gold">{step.n}</p>
              <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-muted">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AmenitiesBand() {
  return (
    <section className="px-5 pb-6 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
        {site.amenities.map((item) => (
          <div key={item.title} className="card p-6">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="mt-2 text-muted">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ReviewsBand() {
  return (
    <section className="px-5 py-12 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Eyebrow>What people say</Eyebrow>
        <h2 className="mt-2 font-display text-4xl">From local listings</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <blockquote key={review.quote} className="card p-6">
              <p className="text-[1.05rem] leading-7">{review.quote}</p>
              <footer className="mt-4 text-sm text-muted">{review.source}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqBand() {
  return (
    <section className="px-5 py-12 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Eyebrow>Good to know</Eyebrow>
        <h2 className="mt-2 font-display text-4xl">Common questions</h2>
        <div className="mt-8 divide-y divide-line rounded-[1.6rem] border border-line bg-paper">
          {site.faqs.map((item) => (
            <details key={item.q} className="group px-6 py-5">
              <summary className="cursor-pointer list-none text-lg font-semibold marker:content-none">
                <span className="flex items-center justify-between gap-4">
                  {item.q}
                  <span className="text-gold group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-3 max-w-3xl text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function VisitBand() {
  return (
    <section className="px-5 py-14 md:px-8">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[1.8rem] border border-line bg-paper lg:grid-cols-2">
        <div className="p-7 md:p-10">
          <Eyebrow>Visit</Eyebrow>
          <h2 className="mt-2 font-display text-4xl">Wimborne Road, Winton</h2>
          <p className="mt-3 text-lg">{site.address.display}</p>
          <p className="mt-1 text-sm text-muted">what3words · {site.address.what3words}</p>
          <dl className="mt-8">
            {site.hours.map((row) => (
              <div key={row.day} className="price-row text-[0.95rem]">
                <dt>{row.day}</dt>
                <dd className="font-semibold">
                  {row.open && row.close ? `${row.open}–${row.close}` : "Closed"}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-sm text-muted">{site.hoursNote}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={site.address.mapsUrl} className="btn btn-ink">
              Open in Maps
            </a>
            <a href={`tel:${site.phoneTel}`} className="btn btn-ghost">
              Call {site.phoneDisplay}
            </a>
          </div>
          <p className="mt-6 text-sm">
            Food hygiene {site.hygiene.rating}/5 · inspected {site.hygiene.inspected}
          </p>
        </div>
        <div className="grid min-h-[420px]">
          <div className="relative min-h-[280px]">
            <Image
              src="/images/real/shop-front.jpg"
              alt="The shop front at 493 Wimborne Road"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <iframe
            title="Map of Phoenix Cutz & Cafe on Wimborne Road"
            src={site.address.embedUrl}
            className="h-full min-h-[280px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
