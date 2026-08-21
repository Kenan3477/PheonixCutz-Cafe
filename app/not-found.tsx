import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-5 text-center">
      <p className="font-script text-4xl text-gold">Wrong turn</p>
      <h1 className="mt-3 font-display text-5xl">This table is empty</h1>
      <Link href="/" className="mt-8 text-sm tracking-[0.2em] text-gold uppercase">
        Back to the house
      </Link>
    </div>
  );
}
