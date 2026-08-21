import type { Metadata } from "next";
import { EatMenu } from "@/components/EatMenu";

export const metadata: Metadata = {
  title: "Food and coffee",
  description:
    "Breakfast, baps, bagels, lunch and coffee at Phoenix Cutz & Cafe in Winton. Prices from their printed menu and yellow drinks board.",
};

export default function MenuPage() {
  return <EatMenu />;
}
