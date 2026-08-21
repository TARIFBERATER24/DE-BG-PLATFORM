import Link from "next/link";

export default function SchufaPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm text-ink-subtle">
        <Link href="/germaniya" className="hover:text-brand">
          Германия от А до Я
        </Link>{" "}
        · Стъпка 3
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">
        Какво е SCHUFA
      </h1>

      <div className="mt-6 space-y-4 text-ink">
        <p>
          SCHUFA е най-голямата кредитна агенция в Германия. Тя събира данни
          за финансовото ви поведение — банкови сметки, договори за мобилен
          телефон, лизинги, наеми — и изчислява кредитен рейтинг (Score).
        </p>
        <p>
          Много доставчици проверяват SCHUFA рейтинга ви, преди да ви одобрят:
          наемодатели, мобилни оператори, банки и понякога дори доставчици на
          интернет. Нисък рейтинг може да доведе до по-висок депозит или
          отказ.
        </p>
        <p>
          Като нов жител в Германия обикновено нямате история в SCHUFA —
          рейтингът ви се изгражда постепенно, след първите договори на ваше
          име (например банкова сметка или мобилен план).
        </p>
        <p>
          Всеки има право на една безплатна справка годишно
          (Datenkopie/Selbstauskunft) директно от SCHUFA — полезно е да
          проверявате какви данни се съхраняват за вас.
        </p>
      </div>

      <div className="mt-10 rounded-lg border border-line p-6">
        <h2 className="font-semibold text-ink">Следваща стъпка</h2>
        <p className="mt-2 text-sm text-ink-muted">
          След банкова сметка идва ред на застраховките — и особено на
          Haftpflichtversicherung.
        </p>
        <Link
          href="/zastrahovki"
          className="mt-3 inline-block text-sm font-medium text-brand hover:text-brand-hover"
        >
          Виж застраховки →
        </Link>
      </div>
    </div>
  );
}
