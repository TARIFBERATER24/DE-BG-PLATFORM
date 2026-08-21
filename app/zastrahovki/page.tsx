import Link from "next/link";

const categories = [
  {
    slug: "grazhdanska-otgovornost",
    title: "Гражданска отговорност",
    description: "Privathaftpflicht — почти стандарт в Германия.",
  },
  {
    slug: "avto",
    title: "Автомобилна застраховка",
    description: "Kfz-Haftpflicht, Teilkasko, Vollkasko.",
  },
  {
    slug: "imushtestvo",
    title: "Домашно имущество",
    description: "Hausrat — за наематели и собственици.",
  },
  {
    slug: "zdravna-doplnitelna",
    title: "Допълнителна здравна",
    description: "Zusatzversicherung върху основната осигуровка.",
  },
];

export default function ZastrahovkiPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">Застраховки</h1>

      <div className="mt-6 rounded-lg border border-alert-line bg-alert-bg p-4 text-sm text-alert-ink">
        Съдържанието по-долу е подготвено предварително. Тази секция очаква
        правен преглед (§34d GewO), преди да пуснем реални оферти на живо.
      </div>

      <p className="mt-6 max-w-2xl text-ink-muted">
        Кратък, разбираем поглед върху най-честите застраховки в Германия —{" "}
        <Link href="/germaniya" className="font-medium text-brand hover:text-brand-hover">
          вижте и целия водач Германия от А до Я
        </Link>
        .
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/zastrahovki/${category.slug}`}
            className="rounded-lg border border-line p-6 transition-colors hover:border-brand hover:shadow-sm"
          >
            <h2 className="font-semibold text-ink">{category.title}</h2>
            <p className="mt-2 text-sm text-ink-muted">{category.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
