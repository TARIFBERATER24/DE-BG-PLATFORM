import type { Metadata } from "next";
import CategoryComparisonPage from "@/components/CategoryComparisonPage";
import ConsultationOffer from "@/components/ConsultationOffer";
import GasIframeWidget from "@/components/GasIframeWidget";

export const metadata: Metadata = {
  title: "Сравнение на доставчици на газ",
  description:
    "Как да смените доставчика си на природен газ в Германия — обяснено на български.",
};

export default function GazPage() {
  return (
    <CategoryComparisonPage
      title="Сравнение на доставчици на газ"
      intro="Ако жилището ви е с газово отопление, доставчикът на газ също може да се смени свободно — често с осезаема разлика в годишната сметка."
      ctaLabel="Сравни оферти за газ"
      network="check24"
      programSlug="gasvergleich"
      widget={<GasIframeWidget />}
    >
      <ConsultationOffer utility="газ" />
    </CategoryComparisonPage>
  );
}
