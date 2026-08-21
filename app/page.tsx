import { Hero } from "@/components/Hero";
import {
  BoardPrices,
  ChairBand,
  DualStory,
  GalleryBand,
  KitchenBand,
  ReviewsBand,
  VisitBand,
  WelcomeCard,
} from "@/components/Sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WelcomeCard />
      <DualStory />
      <KitchenBand />
      <BoardPrices />
      <ChairBand />
      <GalleryBand />
      <ReviewsBand />
      <VisitBand />
    </>
  );
}
