import { Hero } from "@/components/Hero";
import {
  AmenitiesBand,
  BoardPrices,
  ChairBand,
  DualStory,
  FaqBand,
  HowItWorks,
  KitchenBand,
  QuickFacts,
  ReviewsBand,
  VisitBand,
} from "@/components/Sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickFacts />
      <DualStory />
      <KitchenBand />
      <BoardPrices />
      <ChairBand />
      <HowItWorks />
      <AmenitiesBand />
      <ReviewsBand />
      <FaqBand />
      <VisitBand />
    </>
  );
}
