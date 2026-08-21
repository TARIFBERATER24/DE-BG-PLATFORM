import Link from "next/link";
import VerticalIcon from "@/components/VerticalIcon";
import HeroCarousel from "@/components/HeroCarousel";
import { CompassIcon } from "@/components/icons";
import { homeCategories, heroPills } from "@/lib/categories";

export default function Home() {
  return (
    <div>
      <section className="bg-brand-deep">
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-8 sm:pb-20">
          <nav className="flex flex-wrap justify-center gap-2">
            {heroPills.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="rounded-full border border-white/25 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                {category.title}
              </Link>
            ))}
          </nav>

          <HeroCarousel />

          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/60">
            <span>✓ На български</span>
            <span>✓ Безплатно</span>
            <span>✓ Прозрачно</span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-2xl font-bold tracking-tight text-ink">
          Какво искаш да сравниш?
        </h2>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {homeCategories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="premium-card group flex items-center gap-3 rounded-lg p-4 transition duration-200 hover:-translate-y-0.5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-tint transition group-hover:bg-brand">
                <VerticalIcon
                  icon={category.icon}
                  className="h-5 w-5 text-brand transition group-hover:text-white"
                />
              </span>
              <span className="font-semibold text-ink">{category.title}</span>
            </Link>
          ))}
        </section>

        <div className="premium-card mt-10 grid gap-6 rounded-lg p-6 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <p className="text-sm font-medium text-ink-muted">
              Твоят потенциал за спестяване
            </p>
            <p className="financial-number mt-1 text-4xl text-positive">
              420 € <span className="text-base font-normal text-ink-subtle">/ година</span>
            </p>
            <p className="mt-2 text-xs text-ink-subtle">
              Илюстративен пример. Реалните резултати зависят от доставчик, адрес и потребление.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:w-64">
            <div className="rounded-md bg-surface-strong p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-subtle">Сега</p>
              <p className="financial-number mt-1 text-lg text-ink">118 €</p>
            </div>
            <div className="rounded-md bg-positive-bg p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-positive">Нова</p>
              <p className="financial-number mt-1 text-lg text-positive">83 €</p>
            </div>
          </div>
        </div>

        <Link
          href="/germaniya"
          className="mt-6 flex flex-col gap-4 rounded-lg bg-brand-deep p-6 text-white shadow-sm transition hover:-translate-y-0.5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-md bg-white/10 p-3">
              <CompassIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Германия от А до Я</h2>
              <p className="mt-1 max-w-xl text-sm text-white/65">
                Anmeldung, SCHUFA, банкова сметка — първите стъпки.
              </p>
            </div>
          </div>
          <span className="shrink-0 rounded-md bg-white px-4 py-2.5 text-sm font-bold text-brand-deep">
            Отвори водача →
          </span>
        </Link>

        <section className="mt-10 rounded-lg border border-line bg-white p-6">
          <h2 className="font-bold text-ink">Прозрачен модел</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-muted">
            При определени партньорски предложения получаваме комисионна, когато
            сключиш договор през наш линк. Това не променя цената за теб.
          </p>
        </section>
      </div>
    </div>
  );
}
