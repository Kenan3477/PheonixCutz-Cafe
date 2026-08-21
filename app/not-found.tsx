import Link from "next/link";

const pages = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Food and coffee" },
  { href: "/barber", label: "Haircuts" },
  { href: "/visit", label: "Hours and map" },
];

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-5 py-16 text-center">
      <p className="font-script text-3xl text-gold">Good Day</p>
      <h1 className="mt-2 font-display text-5xl leading-tight">
        This page isn’t on the shop site
      </h1>
      <p className="mt-4 text-muted">
        The cafe is here — that address just doesn’t match a page. These do.
      </p>
      <div className="mt-8 grid w-full gap-3">
        {pages.map((page) => (
          <Link key={page.href} href={page.href} className="btn btn-ink">
            {page.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
