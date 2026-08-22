import type { Metadata } from "next";
import { ChairDesk } from "@/components/ChairDesk";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Chair diary",
  robots: { index: false, follow: false },
};

export default function ChairPage() {
  return <ChairDesk />;
}
