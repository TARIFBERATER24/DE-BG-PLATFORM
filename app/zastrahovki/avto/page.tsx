import Link from "next/link";
import type { Metadata } from "next";
import KfzEstimator from "@/components/KfzEstimator";

export const metadata: Metadata = {
  title: "Автомобилна застраховка в Германия (Kfz-Versicherung)",
  description:
    "Kfz-Haftpflicht, Teilkasko и Vollkasko обяснени на български — и ориентировъчен калкулатор за цената.",
};

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

      <div id="kfz-estimator" className="mt-10 scroll-mt-20">
        <h2 className="text-xl font-semibold text-ink">
          Ориентировъчен калкулатор
        </h2>
        <p className="mt-1.5 text-sm text-ink-muted">
          Отговорете на няколко въпроса, за да видите ориентировъчен ценови
          диапазон — не е конкретна оферта.
        </p>
        <div className="mt-4">
          <KfzEstimator />
        </div>
      </div>

      <Link
        href="/zastrahovki"
        className="mt-8 inline-block text-sm font-medium text-brand hover:text-brand-hover"
      >
        ← Всички застраховки
      </Link>
    </div>
  );
}
