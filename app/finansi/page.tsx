import Link from "next/link";

const categories = [
  {
    slug: "bankova-smetka",
    title: "Банкова сметка",
    description: "Girokonto — първата стъпка след Anmeldung.",
  },
  {
    slug: "krediti",
    title: "Потребителски кредит",
    description: "Ratenkredit и какво е effektiver Jahreszins.",
  },
  {
    slug: "kreditna-karta",
    title: "Кредитна карта",
    description: "Kreditkarte срещу дебитна Girocard.",
  },
];

export default function FinansiPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        Финансови продукти
      </h1>

      <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        Съдържанието по-долу е подготвено предварително. Тази секция очаква
        правен преглед (§34c GewO), преди да пуснем реални оферти на живо.
      </div>

      <p className="mt-6 max-w-2xl text-zinc-600">
        Вижте и{" "}
        <Link href="/germaniya/schufa" className="font-medium text-blue-600">
          какво е SCHUFA
        </Link>{" "}
        — тя влияе на одобрението за почти всеки продукт тук.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/finansi/${category.slug}`}
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
