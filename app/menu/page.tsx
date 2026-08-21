import type { Metadata } from "next";
import { EatMenu } from "@/components/EatMenu";

export const metadata: Metadata = {
  title: "Food and coffee",
  description:
    "Breakfast, burgers, bagels, coffee and sweets at Phoenix Cutz & Cafe in Winton. Drink prices from their counter board.",
};

export default function MenuPage() {
  return <EatMenu />;
}
