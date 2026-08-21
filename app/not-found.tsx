import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
      <h1 className="font-display text-5xl">That page isn’t here</h1>
      <p className="mt-3 text-muted">Try the menu, the barber list, or the map.</p>
      <Link href="/" className="btn btn-ink mt-8">
        Back home
      </Link>
    </div>
  );
}
