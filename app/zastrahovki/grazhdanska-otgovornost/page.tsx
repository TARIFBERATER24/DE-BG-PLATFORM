import type { Metadata } from "next";
import CategoryGuidePage from "@/components/CategoryGuidePage";

export const metadata: Metadata = {
  title: "Гражданска отговорност в Германия (Privathaftpflicht)",
  description:
    "Защо Privathaftpflichtversicherung се смята за първата застраховка, която всеки в Германия трябва да има — обяснено на български.",
};

export default function GrazhdanskaOtgovornostPage() {
  return (
    <CategoryGuidePage
      title="Гражданска отговорност (Privathaftpflicht)"
      intro="Покрива щети, които неволно причинявате на друг човек или на чуждо имущество — например счупена вещ у приятел или инцидент по време на спорт."
      paragraphs={[
        "Privathaftpflichtversicherung не е задължителна по закон, но се смята почти за стандарт в Германия — цената обикновено е няколко евро на месец, а покритието често достига милиони евро.",
        "Без нея сте лично отговорни за целия размер на причинена щета, без ограничение — а по немското право отговорността не изтича с времето, ако не бъде уредена.",
        "Много семейни полици покриват автоматично и партньора/децата — затова си струва да проверите дали вече сте включени в нечия полица, преди да купувате нова.",
      ]}
      backHref="/zastrahovki"
      backLabel="Всички застраховки"
    />
  );
}
