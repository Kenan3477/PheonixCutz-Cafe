import Image from "next/image";
import Link from "next/link";

export function LogoMark({
  size = 56,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/images/real/phoenix-logo-profile.jpg"
      alt="Phoenix Cutz & Cafe logo"
      width={size}
      height={size}
      className={`rounded-full ring-1 ring-gold/40 ${className}`}
      priority
    />
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3">
      <LogoMark size={compact ? 42 : 52} />
      <span className="leading-none">
        <span className="block font-display text-[1.15rem] tracking-[0.18em] text-paper uppercase">
          Phoenix
        </span>
        <span className="mt-1 block text-[0.68rem] tracking-[0.28em] text-gold uppercase">
          Cutz & Cafe
        </span>
      </span>
    </Link>
  );
}

export function LeafCorners() {
  return (
    <>
      <svg className="leaf-corner left-4 top-4" viewBox="0 0 100 100" fill="none">
        <path
          d="M8 72C18 40 42 18 78 10"
          stroke="#c9a24a"
          strokeWidth="1.1"
        />
        <path
          d="M16 64c8-18 22-30 44-40"
          stroke="#c9a24a"
          strokeWidth="0.8"
          opacity="0.7"
        />
        <path d="M22 30c10 2 16 10 18 20" stroke="#c9a24a" strokeWidth="0.8" />
        <path d="M34 18c8 4 14 12 16 22" stroke="#c9a24a" strokeWidth="0.8" />
      </svg>
      <svg
        className="leaf-corner right-4 bottom-4 rotate-180"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M8 72C18 40 42 18 78 10"
          stroke="#c9a24a"
          strokeWidth="1.1"
        />
        <path
          d="M16 64c8-18 22-30 44-40"
          stroke="#c9a24a"
          strokeWidth="0.8"
          opacity="0.7"
        />
        <path d="M22 30c10 2 16 10 18 20" stroke="#c9a24a" strokeWidth="0.8" />
        <path d="M34 18c8 4 14 12 16 22" stroke="#c9a24a" strokeWidth="0.8" />
      </svg>
    </>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.72rem] font-medium tracking-[0.32em] text-gold uppercase">
      {children}
    </p>
  );
}
