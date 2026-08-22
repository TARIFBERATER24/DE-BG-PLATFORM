import type { Metadata } from "next";
import CategoryComparisonPage from "@/components/CategoryComparisonPage";
import DslIframeWidget from "@/components/DslIframeWidget";

export const metadata: Metadata = {
  title: "Сравнение на интернет доставчици",
  description:
    "DSL, кабел и оптика в Германия — сравнете тарифи и покритие по адрес, обяснено на български.",
};

export default function InternetPage() {
  return (
    <CategoryComparisonPage
      title="Сравнение на интернет доставчици"
      intro="DSL, кабел или оптика — наличните скорости зависят от адреса ви. Сравнете тарифи и покритие, преди да подпишете договор."
      ctaLabel="Сравни оферти за интернет"
      network="check24"
      programSlug="internetvergleich"
      widget={<DslIframeWidget />}
    />
  );
}
