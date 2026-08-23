import type { Metadata } from "next";
import HomeHero from "@/components/home/HomeHero";
import ActionCards from "@/components/home/ActionCards";
import MeinDeutschlandPreview from "@/components/home/MeinDeutschlandPreview";
import ProductsPreview from "@/components/home/ProductsPreview";
import AssistantConcept from "@/components/home/AssistantConcept";
import HelpSection from "@/components/home/HelpSection";
import TrustSection from "@/components/home/TrustSection";

export const metadata: Metadata = {
  title: "Сравни.де — Германия е сложна. Ние я правим по-лесна.",
  description:
    "Документи, договори, разходи и ежедневни въпроси в Германия — разбираемо на български и събрани на едно място.",
};

export default function Home() {
  return (
    <div>
      <HomeHero />

      <div className="mx-auto max-w-6xl space-y-14 px-6 py-14 sm:space-y-16 sm:py-16">
        <ActionCards />
        <MeinDeutschlandPreview />
        <ProductsPreview />
        <AssistantConcept />
        <HelpSection />
        <TrustSection />
      </div>
    </div>
  );
}
