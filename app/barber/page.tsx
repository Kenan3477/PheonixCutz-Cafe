import type { Metadata } from "next";
import { BookChair } from "@/components/BookChair";
import { CutHero } from "@/components/CutHero";
import { ChairBand, ChairGallery } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Haircuts and prices",
  description:
    "Phoenix Turkish Barber at 493 Wimborne Road, Winton. Haircuts, wet shaves, kids cuts and the Phoenix Special. Complimentary Turkish tea, and a lollipop for the kids.",
};

export default function BarberPage() {
  return (
    <div>
      <CutHero />
      <ChairGallery />
      <ChairBand />
      <BookChair />
    </div>
  );
}
