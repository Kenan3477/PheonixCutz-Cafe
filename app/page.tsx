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
  ShopGallery,
  VisitBand,
} from "@/components/Sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickFacts />
      <DualStory />
      <ShopGallery />
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
