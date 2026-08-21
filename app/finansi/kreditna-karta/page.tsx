import type { Metadata } from "next";
import CategoryGuidePage from "@/components/CategoryGuidePage";

export const metadata: Metadata = {
  title: "Кредитна карта в Германия (Kreditkarte)",
  description:
    "Charge card срещу revolving кредитна линия, и разликата с дебитната Girocard — обяснено на български.",
};

export default function KreditnaKartaPage() {
  return (
    <CategoryGuidePage
      title="Кредитна карта (Kreditkarte)"
      intro="За разлика от много други държави, в Германия дебитната Girocard е по-разпространена от кредитната карта в ежедневието — но кредитна карта остава полезна за онлайн покупки и пътувания."
      paragraphs={[
        "Има два основни модела: Charge card (пълното салдо се тегли автоматично всеки месец) и revolving/кредитна линия (плащате на части, с лихва върху остатъка).",
        "Много карти без такса за обслужване съществуват при онлайн банките, докато премиум карти с бонус програми обичайно имат годишна такса.",
        "Одобрението често изисква доказан доход и добра SCHUFA история — затова тази категория логично идва след отваряне на банкова сметка.",
      ]}
      backHref="/finansi"
      backLabel="Всички финансови продукти"
    />
  );
}
