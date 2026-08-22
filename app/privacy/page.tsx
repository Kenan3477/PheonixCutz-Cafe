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
        This is our shop site. We do not take card payments here. If you book a
        haircut online, we store your name, mobile number, chosen service and
        time so Yusuf can run the chair diary. That book is only on the private
        diary page. The public calendar shows free or busy times, not your
        name. WhatsApp us if you would rather send a message.
      </p>
      <p className="mt-4">
        The photos are from our shop — Instagram, Facebook, and around the cafe.
      </p>
      <p className="mt-4">
        Questions: WhatsApp {site.phoneDisplay} or visit {site.address.display}.
      </p>
    </article>
  );
}
