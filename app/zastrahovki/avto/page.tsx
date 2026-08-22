import Link from "next/link";
import type { Metadata } from "next";
import KfzEstimator from "@/components/KfzEstimator";
import TarifCheckKfzWidget from "@/components/TarifCheckKfzWidget";
import HelpButton from "@/components/HelpButton";

export const metadata: Metadata = {
  title: "Автомобилна застраховка в Германия (Kfz-Versicherung)",
  description:
    "Kfz-Haftpflicht, Teilkasko и Vollkasko обяснени на български — стъпки за сключване и ориентировъчен калкулатор.",
};

const steps = [
  "Попълвате данните за колата и адреса си в сравнителния инструмент",
  "Получавате няколко реални оферти от различни немски застрахователи",
  "Избирате оферта и подавате заявлението онлайн, без хартия",
  "Получавате eVB номер — той е нужен, за да регистрирате колата в Zulassungsstelle",
];

export default function AvtoPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">
        Автомобилна застраховка (Kfz-Versicherung)
      </h1>
      <p className="mt-4 text-ink-muted">
        За да регистрирате кола в Германия, ви трябва поне задължителна
        застраховка гражданска отговорност за МПС (Kfz-Haftpflicht).
      </p>

      <div className="mt-6 space-y-4 text-ink">
        <p>
          Има три нива на покритие: Kfz-Haftpflicht (задължителна, покрива
          щети на трети лица), Teilkasko (добавя кражба, пожар, счупено
          стъкло) и Vollkasko (добавя и щети по собствената кола, дори по
          ваша вина).
        </p>
        <p>
          Цената зависи основно от Schadenfreiheitsklasse (клас безрискова
          история — колкото по-дълго карате без щети, толкова по-евтина е
          застраховката) и Regionalklasse (район на регистрация).
        </p>
        <p>
          Като нов шофьор в Германия без немска история обикновено
          стартирате от най-високия рисков клас — с времето класът се
          подобрява годишно без щети.
        </p>
      </div>

      <div className="mt-10 rounded-lg border border-line p-6">
        <h2 className="font-semibold text-ink">Как става стъпка по стъпка</h2>
        <ol className="mt-3 space-y-3 text-sm text-ink-muted">
          {steps.map((step, index) => (
            <li key={step.slice(0, 24)} className="flex gap-3">
              <span
                aria-hidden="true"
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-tint text-xs font-semibold text-brand"
              >
                {index + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      <TarifCheckKfzWidget />

      <div id="kfz-estimator" className="mt-10 scroll-mt-20">
        <h2 className="text-xl font-semibold text-ink">
          Ориентировъчен калкулатор
        </h2>
        <p className="mt-1.5 text-sm text-ink-muted">
          Искате само груба представа, без да въвеждате адрес? Отговорете
          на няколко въпроса тук.
        </p>
        <div className="mt-4">
          <KfzEstimator />
        </div>
      </div>

      <HelpButton
        topic="Автомобилна застраховка"
        label="Получете безплатна консултация"
      />

      <Link
        href="/zastrahovki"
        className="mt-8 inline-block text-sm font-medium text-brand hover:text-brand-hover"
      >
        ← Всички застраховки
      </Link>
    </div>
  );
}
