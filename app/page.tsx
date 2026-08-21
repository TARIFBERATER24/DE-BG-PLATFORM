import Link from "next/link";
import { verticals } from "@/lib/verticals";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <section className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight">
          Сравнявайте доставчици в Германия — на български
        </h1>
        <p className="mt-4 text-lg text-zinc-600">
          Ток, интернет, застраховки и банкови продукти обяснени разбираемо, с
          директни връзки към официалните сайтове на доставчиците.
        </p>
      </section>

      <section className="mt-12 grid gap-6 sm:grid-cols-3">
        {verticals.map((vertical) => (
          <Link
            key={vertical.slug}
            href={`/${vertical.slug}`}
            className="rounded-lg border border-black/10 p-6 transition-colors hover:border-blue-600"
          >
            <h2 className="font-semibold">{vertical.title}</h2>
            <p className="mt-2 text-sm text-zinc-600">
              {vertical.shortDescription}
            </p>
            {vertical.status === "coming-soon" && (
              <p className="mt-3 text-xs font-medium text-blue-600">
                Очаквайте скоро
              </p>
            )}
          </Link>
        ))}
      </section>

      <section className="mt-16 rounded-lg bg-zinc-50 p-6">
        <h2 className="font-semibold">Как печелим пари</h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-600">
          Сравни.де е рекламна платформа, не застрахователен или кредитен
          посредник. Ние ви пренасочваме към официалния сайт на доставчика, а
          при сключен договор през наш линк получаваме комисионна от партньора
          — това не оскъпява офертата за вас.
        </p>
      </section>
    </div>
  );
}
