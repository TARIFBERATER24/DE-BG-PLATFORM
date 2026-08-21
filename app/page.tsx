import Link from "next/link";
import { verticals } from "@/lib/verticals";
import VerticalIcon from "@/components/VerticalIcon";
import { CompassIcon } from "@/components/icons";

export default function Home() {
  return (
    <div>
      <section className="hero-glow overflow-hidden border-b border-line/70">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center rounded-full border border-brand/15 bg-white/80 px-4 py-2 text-sm font-semibold text-brand shadow-sm">
              За българи в Германия 🇧🇬 🇩🇪
            </div>
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-ink sm:text-5xl lg:text-6xl">
              Сравнявай по-лесно. <span className="text-brand">Спестявай повече.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-muted">
              Ток, интернет, застраховки и финансови продукти в Германия — обяснени ясно на български, за да вземеш по-добро решение без излишно объркване.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/energiya-telekom" className="rounded-md bg-brand px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-brand-hover">
                Започни сравнение →
              </Link>
              <Link href="/germaniya" className="rounded-md border border-line-strong bg-white px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-brand/30 hover:bg-brand-tint">
                Германия от А до Я
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted">
              <span>✓ На български</span><span>✓ Прозрачно</span><span>✓ Безплатно сравнение</span>
            </div>
          </div>

          <div className="premium-card relative rounded-lg p-5 sm:p-7">
            <div className="rounded-md bg-brand-deep p-6 text-white">
              <p className="text-sm font-medium text-white/65">Твоят потенциал за спестяване</p>
              <div className="mt-3 flex items-end gap-2">
                <span className="text-5xl font-bold tracking-tight">420 €</span>
                <span className="pb-1 text-sm text-white/60">/ година</span>
              </div>
              <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full w-3/4 rounded-full bg-white" /></div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-md bg-surface-strong p-4"><p className="text-xs font-semibold uppercase tracking-wide text-ink-subtle">Сега</p><p className="financial-number mt-1 text-xl text-ink">118 € / мес.</p></div>
              <div className="rounded-md bg-positive-bg p-4"><p className="text-xs font-semibold uppercase tracking-wide text-positive">Нова оферта</p><p className="financial-number mt-1 text-xl text-positive">83 € / мес.</p></div>
            </div>
            <p className="mt-4 text-xs leading-5 text-ink-subtle">Илюстративен пример. Реалните резултати зависят от доставчик, адрес и потребление.</p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[.14em] text-brand">Всичко на едно място</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Какво искаш да сравниш?</h2>
          <p className="mt-3 text-ink-muted">Избери категория и виж информацията, която има значение за твоето решение.</p>
        </div>

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {verticals.map((vertical) => (
            <Link key={vertical.slug} href={`/${vertical.slug}`} className="premium-card group rounded-lg p-6 transition duration-300 hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-tint transition group-hover:bg-brand group-hover:text-white">
                <VerticalIcon icon={vertical.icon} className="h-6 w-6 text-brand transition group-hover:text-white" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink">{vertical.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-muted">{vertical.shortDescription}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm font-bold text-brand">Разгледай →</span>
                {vertical.status === "coming-soon" && <span className="rounded-full bg-brand-tint px-2.5 py-1 text-xs font-semibold text-brand">Скоро</span>}
              </div>
            </Link>
          ))}
        </section>

        <Link href="/germaniya" className="mt-8 flex flex-col gap-5 rounded-lg bg-brand-deep p-7 text-white shadow-sm transition hover:-translate-y-0.5 sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <div className="flex items-start gap-4">
            <div className="rounded-md bg-white/10 p-3"><CompassIcon className="h-7 w-7 text-white" /></div>
            <div><p className="text-sm font-semibold text-white/55">ПРАКТИЧЕН ВОДАЧ</p><h2 className="mt-1 text-xl font-bold">Германия от А до Я</h2><p className="mt-2 max-w-xl text-sm leading-6 text-white/65">Anmeldung, SCHUFA, банкова сметка и важните първи стъпки — обяснени разбираемо на български.</p></div>
          </div>
          <span className="shrink-0 rounded-md bg-white px-4 py-2.5 text-sm font-bold text-brand-deep">Отвори водача →</span>
        </Link>

        <section className="mt-16 rounded-lg border border-line bg-white p-6 sm:p-8">
          <h2 className="font-bold text-ink">Прозрачен модел</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-muted">Сравни.де е рекламна платформа. При определени партньорски предложения можем да получим комисионна, когато сключиш договор през наш линк. Това не променя цената за теб.</p>
        </section>
      </div>
    </div>
  );
}
