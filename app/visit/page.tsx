import type { Metadata } from "next";
import { VisitBand } from "@/components/Sections";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Visit",
  description: `Find Phoenix Cutz & Cafe at ${site.address.display}. Hours, map, WhatsApp and directions for Winton.`,
};

export default function VisitPage() {
  return (
    <div className="pt-24">
      <div className="mx-auto max-w-7xl px-5 pt-10 md:px-8">
        <p className="font-script text-4xl text-gold">All time welcome</p>
        <h1 className="mt-2 font-display text-6xl md:text-7xl">Come in</h1>
        <p className="mt-4 max-w-2xl text-gold-soft">
          Free street parking on Wimborne Road. Wheelchair-accessible seating
          and restroom are listed on local directories. Children are welcome in
          the chair and the cafe.
        </p>
      </div>
      <VisitBand />
    </div>
  );
}
