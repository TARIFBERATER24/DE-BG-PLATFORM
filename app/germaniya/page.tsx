import Link from "next/link";

const steps = [
  {
    title: "Anmeldung — адресна регистрация",
    description:
      "Първата стъпка след нанасяне — без нея не можете да отворите банкова сметка, да сключите застраховка или да пуснете интернет.",
    href: "/germaniya/anmeldung",
    cta: "Прочети обяснението",
  },
  {
    title: "Банкова сметка",
    description:
      "Girokonto ви трябва за наем, заплата и повечето договори за услуги.",
    href: "/finansi",
    cta: "Виж финансови продукти",
  },
  {
    title: "SCHUFA — кредитен рейтинг",
    description:
      "Влияе на банкова сметка, мобилен договор, дори наем на жилище. Ето какво е и как да проверите вашата.",
    href: "/germaniya/schufa",
    cta: "Прочети обяснението",
  },
  {
    title: "Застраховки",
    description: "Haftpflicht и другите застраховки, с които повечето хора в Германия започват.",
    href: "/zastrahovki",
    cta: "Виж застраховки",
  },
  {
    title: "Ток, газ и интернет",
    description: "След Anmeldung можете да сключите договори за комунални услуги на свое име.",
    href: "/energiya-telekom",
    cta: "Сравни доставчици",
  },
];

export default function GermaniyaGuidePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">
        Германия от А до Я
      </h1>
      <p className="mt-4 text-ink-muted">
        Реалният ред, в който новодошъл в Германия обикновено урежда нещата —
        всяка стъпка отваря вратата към следващата.
      </p>

      <ol className="mt-10 space-y-6">
        {steps.map((step, index) => (
          <li
            key={step.href}
            className="flex gap-4 rounded-lg border border-line p-6"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-on-brand">
              {index + 1}
            </span>
            <div>
              <h2 className="font-semibold text-ink">{step.title}</h2>
              <p className="mt-1 text-sm text-ink-muted">{step.description}</p>
              <Link
                href={step.href}
                className="mt-3 inline-block text-sm font-medium text-brand hover:text-brand-hover"
              >
                {step.cta} →
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
