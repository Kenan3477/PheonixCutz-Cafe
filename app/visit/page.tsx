import type { Metadata } from "next";
import { AmenitiesBand, FaqBand, VisitBand } from "@/components/Sections";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hours and directions",
  description: `Find Phoenix Cutz & Cafe at ${site.address.display}. Hours, map, WhatsApp and directions for Winton.`,
};

export default function VisitPage() {
  return (
    <div className="pt-6">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="text-sm font-semibold text-teal">Visit</p>
        <h1 className="mt-2 font-display text-5xl md:text-6xl">
          Come down to Winton
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Street parking on Wimborne Road. We have wheelchair-accessible seating
          and a restroom. Children are welcome.
        </p>
      </div>
      <VisitBand />
      <AmenitiesBand />
      <FaqBand />
    </div>
  );
}
