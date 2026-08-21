import type { Metadata } from "next";
import {
  BoardPrices,
  GalleryBand,
  KitchenBand,
  WelcomeCard,
} from "@/components/Sections";

export const metadata: Metadata = {
  title: "Kitchen menu",
  description:
    "Breakfast plates, coffee and sweets at Phoenix Cutz & Cafe in Winton. Food from their Instagram; drink prices from the counter board.",
};

export default function MenuPage() {
  return (
    <div className="pt-24">
      <WelcomeCard />
      <KitchenBand />
      <BoardPrices />
      <GalleryBand />
    </div>
  );
}
