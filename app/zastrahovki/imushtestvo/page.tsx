import type { Metadata } from "next";
import CategoryGuidePage from "@/components/CategoryGuidePage";

export const metadata: Metadata = {
  title: "Застраховка на домашно имущество в Германия (Hausrat)",
  description:
    "Какво покрива Hausratversicherung и защо е важна и за наематели, не само за собственици — обяснено на български.",
};

export default function ImushtestvoPage() {
  return (
    <CategoryGuidePage
      title="Застраховка на домашно имущество (Hausrat)"
      intro="Hausratversicherung покрива вещите във вашето жилище — мебели, техника, дрехи — при пожар, кражба, буря или спукана тръба."
      paragraphs={[
        "Полезна е както за собственици, така и за наематели — наемодателската застраховка на сградата не покрива личните ви вещи вътре в жилището.",
        "Цената зависи основно от квадратурата на жилището и района (по-висок риск от кражба в някои градски зони означава по-висока премия).",
        "Fahrraddiebstahl (кражба на велосипед извън дома) често се добавя като опция — да се провери, ако имате скъп велосипед.",
      ]}
      backHref="/zastrahovki"
      backLabel="Всички застраховки"
    />
  );
}
