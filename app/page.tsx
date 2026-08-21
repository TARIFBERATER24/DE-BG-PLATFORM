import Link from "next/link";
import { verticals } from "@/lib/verticals";
import VerticalIcon from "@/components/VerticalIcon";
import { CompassIcon } from "@/components/icons";

export default function Home() {
  return (
    <div>
      <section className="border-b border-black/10 bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Сравнявайте доставчици в Германия — на български
          </h1>
          <p className="mt-4 max-w-xl text-lg text-zinc-600">
            Ток, интернет, застраховки и банкови продукти обяснени разбираемо, с
            директни връзки към официалните сайтове на доставчиците.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <section className="grid gap-6 sm:grid-cols-3">
          {verticals.map((vertical) => (
            <Link
              key={vertical.slug}
              href={`/${vertical.slug}`}
              className="group rounded-xl border border-black/10 p-6 transition-colors hover:border-blue-600 hover:shadow-sm"
            >
              <VerticalIcon
                icon={vertical.icon}
                className="h-8 w-8 text-blue-600"
              />
              <h2 className="mt-4 font-semibold">{vertical.title}</h2>
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

        <section className="mt-8 rounded-xl border border-black/10 bg-zinc-50 p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div className="flex items-start gap-4">
            <CompassIcon className="h-8 w-8 shrink-0 text-blue-600" />
            <div>
              <h2 className="font-semibold">Германия от А до Я</h2>
              <p className="mt-1 max-w-xl text-sm text-zinc-600">
                Anmeldung, SCHUFA, банкова сметка — водач стъпка по стъпка за
                новодошли, който обяснява реда, в който всъщност ви трябват
                тези неща.
              </p>
            </div>
          </div>
          <Link
            href="/germaniya"
            className="mt-4 inline-flex shrink-0 rounded-full border border-blue-600 px-5 py-2.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-600 hover:text-white sm:mt-0"
          >
            Отвори водача →
          </Link>
        </section>

        <section className="mt-8 rounded-xl bg-zinc-50 p-6">
          <h2 className="font-semibold">Как печелим пари</h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600">
            Сравни.де е рекламна платформа, не застрахователен или кредитен
            посредник. Ние ви пренасочваме към официалния сайт на доставчика, а
            при сключен договор през наш линк получаваме комисионна от
            партньора — това не оскъпява офертата за вас.
          </p>
        </section>
      </div>
    </div>
  );
}
