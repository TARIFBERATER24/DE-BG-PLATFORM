import Link from "next/link";

const items = [
  {
    title: "На български",
    description: "Сложните процеси в Германия са обяснени ясно.",
  },
  {
    title: "Ти избираш",
    description:
      "Платформата ти помага да сравняваш и вземаш информирано решение.",
  },
  {
    title: "Прозрачност",
    description:
      "Партньорските и affiliate отношения са ясно обозначени.",
  },
  {
    title: "Сигурност",
    description:
      "Личните данни и бъдещите документни услуги се проектират с privacy и security by design.",
  },
];

export default function TrustSection() {
  return (
    <section aria-labelledby="trust-title" className="border-t border-line pt-14">
      <h2
        id="trust-title"
        className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
      >
        Разбираемо. Прозрачно. Под твой контрол.
      </h2>

      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.title}>
            <h3 className="font-semibold text-ink">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-ink-muted">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-8 max-w-3xl text-sm leading-6 text-ink-muted">
        При определени партньорски предложения получаваме комисионна, когато сключиш
        договор през наш линк — това не променя цената за теб. Подробности в{" "}
        <Link href="/za-nas" className="font-medium text-brand hover:text-brand-hover">
          За нас
        </Link>{" "}
        и{" "}
        <Link
          href="/poveritelnost"
          className="font-medium text-brand hover:text-brand-hover"
        >
          Поверителност
        </Link>
        .
      </p>
    </section>
  );
}
