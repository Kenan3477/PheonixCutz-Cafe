import type { Metadata } from "next";
import { EatMenu } from "@/components/EatMenu";

export const metadata: Metadata = {
  title: "Food and coffee",
  description:
    "Breakfast, baps, bagels, lunch and coffee at our cafe on Wimborne Road in Winton.",
};

export default function MenuPage() {
  return <EatMenu />;
}
