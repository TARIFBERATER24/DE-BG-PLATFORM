import Link from "next/link";
import { verticals } from "@/lib/verticals";
import VerticalIcon from "@/components/VerticalIcon";
import { CompassIcon } from "@/components/icons";

export default function Home() {
  return (
    <div>
      <section className="border-b border-line bg-gradient-to-b from-brand-tint to-canvas">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Сравнявайте доставчици в Германия — на български
          </h1>
          <p className="mt-4 max-w-xl text-lg text-ink-muted">
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
              className="group rounded-lg border border-line p-6 transition-colors hover:border-brand hover:shadow-sm"
            >
              <VerticalIcon icon={vertical.icon} className="h-8 w-8 text-brand" />
              <h2 className="mt-4 font-semibold text-ink">{vertical.title}</h2>
              <p className="mt-2 text-sm text-ink-muted">
                {vertical.shortDescription}
              </p>
              {vertical.status === "coming-soon" && (
                <p className="mt-3 text-xs font-medium text-brand">
                  Очаквайте скоро
                </p>
              )}
            </Link>
          ))}
        </section>

        <Link
          href="/germaniya"
          className="mt-8 flex flex-col gap-4 rounded-lg bg-brand-tint p-6 transition-colors hover:bg-brand/10 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-4">
            <CompassIcon className="h-8 w-8 shrink-0 text-brand" />
            <div>
              <h2 className="font-semibold text-ink">Германия от А до Я</h2>
              <p className="mt-1 max-w-xl text-sm text-ink-muted">
                Anmeldung, SCHUFA, банкова сметка — водач стъпка по стъпка за
                новодошли, който обяснява реда, в който всъщност ви трябват
                тези неща.
              </p>
            </div>
          </div>
          <span className="shrink-0 text-sm font-medium text-brand">
            Отвори водача →
          </span>
        </Link>

        <section className="mt-12 border-t border-line pt-8">
          <h2 className="font-semibold text-ink">Как печелим пари</h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-muted">
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
