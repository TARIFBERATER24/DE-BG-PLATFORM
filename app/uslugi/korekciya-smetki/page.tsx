import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { featureFlags } from "@/lib/feature-flags";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Корекция на годишни сметки",
  description:
    "Проверка на сметки за ток/газ и помощ при възстановяване на надплатени суми.",
};

export default function KorekciyaSmetkiPage() {
  if (!featureFlags.billCorrection) {
    notFound();
  }

  return (
    <>
      <div className="mx-auto max-w-3xl px-6 pt-16">
        <div className="rounded-lg border border-alert-line bg-alert-bg p-4 text-sm text-alert-ink">
          Регулаторно чувствителна услуга (§10 RDG). Преди реален трафик тук
          трябва да фигурира или регистрационен номер като Inkassodienstleister
          (регистър на местния съд), или данни за партньориращия адвокат/
          кантора, през когото се води случаят.
        </div>
      </div>
      <ServicePage
        title="Корекция на годишни сметки"
        intro="Проверяваме годишната ви сметка за ток или газ за грешно начислени автоматични увеличения и ви помагаме да си върнете надплатеното."
        paragraphs={[
          "Много доставчици прилагат автоматични увеличения на цената, без да са уведомили коректно клиента — това често е основание за връщане на надплатени суми.",
          "Преглеждаме сметката и договора ви и, ако има основание, водим случая до възстановяване на парите.",
        ]}
        includes={[
          "Безплатна първоначална проверка на сметката",
          "Оценка дали има основание за възстановяване",
          "Водене на случая до приключване",
          "Такса само при успешно възстановяване",
        ]}
      />
    </>
  );
}
