import Link from "next/link";

const categories = [
  { slug: "tok", title: "Ток", description: "Сравнение на доставчици на електроенергия." },
  { slug: "gaz", title: "Газ", description: "Сравнение на доставчици на природен газ." },
  { slug: "internet", title: "Интернет", description: "DSL, кабел и оптика по адрес." },
  {
    slug: "mobilni-planove",
    title: "Мобилни планове",
    description: "Предплатени и абонаментни тарифи.",
  },
];

export default function EnergiyaTelekomPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Енергия и телеком</h1>
      <p className="mt-4 max-w-2xl text-zinc-600">
        Смяната на доставчик на ток, газ, интернет или мобилен план в Германия
        не изисква разрешение или лиценз — можете да го направите сами, а ние
        обясняваме процеса на български.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/energiya-telekom/${category.slug}`}
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
