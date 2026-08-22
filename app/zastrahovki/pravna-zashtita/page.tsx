import type { Metadata } from "next";
import CategoryGuidePage from "@/components/CategoryGuidePage";

export const metadata: Metadata = {
  title: "Правна защита в Германия",
  description:
    "Информативен преглед на Rechtsschutzversicherung и адвокатските разходи в Германия.",
};

export default function PravnaZashtitaPage() {
  return (
    <CategoryGuidePage
      title="Правна защита (Rechtsschutzversicherung)"
      intro="Правната защита може да помогне с разходите при определени спорове, но не покрива всеки случай и не е автоматично необходима за всеки."
      paragraphs={[
        "Преди договор проверете кои модули ви трябват: личен, трудов, транспортен, жилищен или наемателски.",
        "В много договори има период на изчакване, често около три месеца, а спор, който вече е започнал или е предвидим, обикновено не се покрива.",
        "Сравнете условията с реалните си рискове и проверете дали вече имате подобна защита чрез профсъюз, Mietverein или друга организация.",
      ]}
      backHref="/zastrahovki"
      backLabel="Всички застраховки"
    />
  );
}
