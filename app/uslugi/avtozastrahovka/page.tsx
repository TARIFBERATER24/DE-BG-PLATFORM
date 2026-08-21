import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { featureFlags } from "@/lib/feature-flags";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Намиране на автомобилна застраховка",
  description:
    "Търсим и предлагаме няколко подходящи автомобилни застраховки вместо вас.",
};

export default function AvtozastrahovkaPage() {
  if (!featureFlags.autoInsuranceFinder) {
    notFound();
  }

  return (
    <>
      <div className="mx-auto max-w-3xl px-6 pt-16">
        <div className="rounded-lg border border-alert-line bg-alert-bg p-4 text-sm text-alert-ink">
          Регулаторно чувствителна услуга (§34d/§34e GewO). Преди реален
          трафик тук трябва да фигурира: вид посредник (Makler/Vertreter),
          Vermittlerregister номер, данни за Vermögensschadenhaftpflicht
          застраховката, и информация за компетентния омбудсман — съгласно
          §15 VersVermV.
        </div>
      </div>
      <ServicePage
        title="Намиране на автомобилна застраховка"
        intro="Преглеждаме нуждите ви и ви предлагаме няколко подходящи оферти за автомобилна застраховка — вие избирате и подписвате."
        paragraphs={[
          "Обсъждаме какъв тип покритие ви трябва (Haftpflicht, Teilkasko, Vollkasko) и какви фактори влияят на цената във вашия случай.",
          "Представяме ви няколко конкретни оферти от различни застрахователи, обяснени на разбираем български.",
        ]}
        includes={[
          "Преглед на текущата ви ситуация и нужди",
          "Няколко конкретни, сравнени оферти",
          "Обяснение на условията на български",
          "Съдействие при сключване на избраната полица",
        ]}
      />
    </>
  );
}
