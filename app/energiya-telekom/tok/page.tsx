import type { Metadata } from "next";
import CategoryComparisonPage from "@/components/CategoryComparisonPage";
import ConsultationOffer from "@/components/ConsultationOffer";
import PowerIframeWidget from "@/components/PowerIframeWidget";

export const metadata: Metadata = {
  title: "Сравнение на доставчици на ток",
  description:
    "Как да смените доставчика си на електроенергия в Германия — обяснено на български, с връзка към сравнителен инструмент.",
};

export default function TokPage() {
  return (
    <CategoryComparisonPage
      title="Сравнение на доставчици на ток"
      intro="В Германия можете свободно да смените доставчика си на електроенергия по всяко време — цената зависи от район, потребление и оператор."
      ctaLabel="Сравни оферти за ток"
      network="check24"
      programSlug="stromvergleich"
      widget={<PowerIframeWidget />}
    >
      <ConsultationOffer utility="ток" />
    </CategoryComparisonPage>
  );
}
