import type { Metadata } from "next";
import { BoardPrices, KitchenBand } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Food and coffee",
  description:
    "Breakfast plates, coffee and sweets at Phoenix Cutz & Cafe in Winton. Food from their Instagram; drink prices from the counter board.",
};

export default function MenuPage() {
  return (
    <div className="pt-6">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="text-sm font-semibold text-teal">Eat</p>
        <h1 className="mt-2 font-display text-5xl md:text-6xl">Food and coffee</h1>
        <p className="mt-4 max-w-2xl text-muted">
          These are the plates they photograph and serve. Ask at the counter for
          today’s food prices — we only publish drink and tart prices we can
          read on their board.
        </p>
      </div>
      <KitchenBand />
      <BoardPrices />
    </div>
  );
}
