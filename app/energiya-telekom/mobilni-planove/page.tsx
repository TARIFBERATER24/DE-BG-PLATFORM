import type { Metadata } from "next";
import CategoryComparisonPage from "@/components/CategoryComparisonPage";

export const metadata: Metadata = {
  title: "Сравнение на мобилни планове",
  description:
    "Предплатени и абонаментни мобилни тарифи в Германия — сравнете данни, минути и цена на български.",
};

export default function MobilniPlanovePage() {
  return (
    <CategoryComparisonPage
      title="Сравнение на мобилни планове"
      intro="Предплатени или абонаментни планове от немски и виртуални оператори — сравнете данни, минути и цена, за да намерите подходящия план."
      ctaLabel="Сравни мобилни планове"
      network="check24"
      programSlug="handyvergleich"
    />
  );
}
