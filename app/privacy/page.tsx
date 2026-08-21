import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-2xl px-5 py-16 leading-7 text-muted">
      <h1 className="font-display text-5xl text-ink">Privacy</h1>
      <p className="mt-6">
        This site is a public brochure for {site.name}. It does not run
        accounts, take card payments, or store booking forms. WhatsApp bookings
        open in WhatsApp and are handled by the shop.
      </p>
      <p className="mt-4">
        Photographs come from the business’s own Instagram, Facebook and GoDaddy
        pages.
      </p>
      <p className="mt-4">
        Questions: WhatsApp {site.phoneDisplay} or visit {site.address.display}.
      </p>
    </article>
  );
}
