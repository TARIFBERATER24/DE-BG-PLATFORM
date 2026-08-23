import Link from "next/link";
import type { Metadata } from "next";
import { FolderLockIcon, SparkIcon, BellIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Mein Deutschland",
  description:
    "Личният AI център за документи, договори и важни срокове в Германия — в подготовка.",
};

const capabilities = [
  {
    Icon: FolderLockIcon,
    title: "AI Intelligence Document Vault",
    description:
      "Съхранявай важните си документи сигурно и ги намирай когато ти потрябват — договори, писма, сметки и решения на институции.",
  },
  {
    Icon: SparkIcon,
    title: "AI Document Understanding",
    description:
      "AI разпознава документа и ти обяснява на български какво означава и какво трябва да направиш — без да измисля факти, които не пише в документа.",
  },
  {
    Icon: BellIcon,
    title: "Intelligent Alerts",
    description:
      "Важните срокове идват при теб навреме, вместо да ги откриваш след като са минали.",
  },
];

const alertExamples = [
  "След 1 месец трябва да отчетеш електромера.",
  "След 30 дни изтича Preisgarantie по договора ти за газ.",
  "След 14 дни изтича срокът за отговор на това писмо.",
];

const principles = [
  {
    title: "Само за теб",
    description:
      "Личните данни ще са достъпни единствено за твоя профил — без публичен достъп до файлове.",
  },
  {
    title: "Ти решаваш какво се споделя",
    description:
      "Преди данни да отидат към доставчик или услуга, ще виждаш точно какво се изпраща и ще го потвърждаваш.",
  },
  {
    title: "Можеш да си тръгнеш",
    description:
      "Изтегляне и изтриване на данните ти ще бъдат част от продукта, не изключение по заявка.",
  },
];

export default function MeinDeutschlandPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <p className="inline-flex items-center gap-2 rounded-full border border-alert-line bg-alert-bg px-3 py-1 text-xs font-semibold text-alert-ink">
        В подготовка
      </p>

      <h1 className="mt-5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        Mein Deutschland
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-7 text-ink-muted">
        Твоят личен AI център за документи, договори и важни срокове.
      </p>

      <div className="mt-6 rounded-lg border border-alert-line bg-alert-bg p-4 text-sm leading-6 text-alert-ink">
        Тази страница описва какво изграждаме — функциите още не са активни. Няма
        качване на документи, няма съхранение и няма AI анализ на този етап. Ще
        обявим ясно, когато заработят.
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {capabilities.map(({ Icon, title, description }) => (
          <div key={title} className="rounded-lg border border-line bg-surface p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-tint text-brand">
              <Icon className="h-6 w-6" />
            </span>
            <h2 className="mt-4 font-semibold text-ink">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-ink-muted">{description}</p>
          </div>
        ))}
      </div>

      <section className="mt-14 border-t border-line pt-10">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          Как ще изглеждат напомнянията
        </h2>
        <p className="mt-2 text-sm text-ink-muted">
          Примери за срокове, които днес се пропускат най-често.
        </p>
        <ul className="mt-6 space-y-3">
          {alertExamples.map((example) => (
            <li
              key={example}
              className="flex items-start gap-3 rounded-lg border border-line bg-surface px-4 py-3 text-sm text-ink"
            >
              <BellIcon className="mt-0.5 h-4 w-4 shrink-0 text-ink-subtle" />
              {example}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-ink-subtle">
          Илюстративни примери, а не реални напомняния по твой договор.
        </p>
      </section>

      <section className="mt-14 border-t border-line pt-10">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          Принципи, по които го проектираме
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {principles.map((principle) => (
            <div key={principle.title}>
              <h3 className="font-semibold text-ink">{principle.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-muted">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t border-line pt-10">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          Междувременно
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
          Докато Mein Deutschland се изгражда, тези неща вече работят и можеш да ги
          ползваш днес.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/germaniya"
            className="rounded-md border border-line px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-brand"
          >
            Германия от А до Я
          </Link>
          <Link
            href="/produkte"
            className="rounded-md border border-line px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-brand"
          >
            Сравни разходите си
          </Link>
          <Link
            href="/uslugi"
            className="rounded-md border border-line px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-brand"
          >
            Услуги с лична помощ
          </Link>
        </div>
      </section>
    </div>
  );
}
