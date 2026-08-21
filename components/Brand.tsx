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
      className={`rounded-full ring-1 ring-black/10 ${className}`}
      priority
    />
  );
}

export function Wordmark({
  compact = false,
  tone = "light",
}: {
  compact?: boolean;
  tone?: "light" | "dark";
}) {
  const name = tone === "dark" ? "text-cream" : "text-ink";
  const sub = tone === "dark" ? "text-gold-soft" : "text-gold";

  return (
    <Link href="/" className="group flex items-center gap-3">
      <LogoMark size={compact ? 40 : 50} />
      <span className="leading-none">
        <span className={`block font-display text-[1.35rem] ${name}`}>
          Phoenix
        </span>
        <span className={`mt-0.5 block text-[0.78rem] ${sub}`}>
          Cutz & Cafe
        </span>
      </span>
    </Link>
  );
}

export function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <p
      className={`text-sm font-semibold ${light ? "text-gold-soft" : "text-teal"}`}
    >
      {children}
    </p>
  );
}
