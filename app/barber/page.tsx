import type { Metadata } from "next";
import { BookChair } from "@/components/BookChair";
import { ChairBand } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Haircuts and prices",
  description:
    "Phoenix Turkish Barber price list at 493 Wimborne Road, Winton. Haircuts, wet shaves, kids cuts and the Phoenix Special.",
};

export default function BarberPage() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
        <p className="text-sm font-semibold text-teal">Cut</p>
        <h1 className="mt-2 font-display text-5xl md:text-6xl">
          Turkish barber prices
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Book a free slot below — you can see when Yusuf is available.
          Walk-ins are still welcome if a chair is free. The cafe takes cash
          and card; ask at the chair if you want to pay by card for a cut.
        </p>
      </div>
      <ChairBand />
      <div className="bg-cream py-8">
        <BookChair />
      </div>
    </div>
  );
}
