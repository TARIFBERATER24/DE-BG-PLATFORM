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
      <h1 className="text-3xl font-semibold tracking-tight">Застраховки</h1>

      <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        Съдържанието по-долу е подготвено предварително. Тази секция очаква
        правен преглед (§34d GewO), преди да пуснем реални оферти на живо.
      </div>

      <p className="mt-6 max-w-2xl text-zinc-600">
        Кратък, разбираем поглед върху най-честите застраховки в Германия —{" "}
        <Link href="/germaniya" className="font-medium text-blue-600">
          вижте и целия водач Германия от А до Я
        </Link>
        .
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/zastrahovki/${category.slug}`}
            className="rounded-xl border border-black/10 p-6 transition-colors hover:border-blue-600 hover:shadow-sm"
          >
            <h2 className="font-semibold">{category.title}</h2>
            <p className="mt-2 text-sm text-zinc-600">{category.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
