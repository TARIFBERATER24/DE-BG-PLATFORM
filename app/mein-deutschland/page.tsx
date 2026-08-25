import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mein Deutschland",
  description: "Личният ти дигитален център за договори, документи, срокове и AI помощ в Германия.",
};

const features = [
  ["AI Тарифен Консултант", "Започва с реалните ти данни и не измисля текущи пазарни цени."],
  ["Договори", "Следи доставчик, цена, Vertragsende и Kündigungsfrist."],
  ["Документи", "Частно място за договори, сметки и важни писма."],
  ["Срокове", "Събира важните дати на едно място, за да не ги изпускаш."],
];

export default function MeinDeutschlandPage() {
  return (
    <div className="bg-[#f6f8fb]">
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">Mein Deutschland</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">Твоят дигитален помощник за живота ти в Германия.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-muted">Управлявай договори, документи и срокове на едно място и използвай AI помощ там, където тя носи реална стойност.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/mein-deutschland/register" className="rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white shadow-sm">Създай безплатен профил</Link>
              <Link href="/mein-deutschland/login" className="rounded-xl border border-line bg-white px-5 py-3 text-sm font-semibold text-ink">Вход</Link>
            </div>
          </div>
          <div className="rounded-3xl border border-line bg-brand-deep p-6 text-white shadow-xl sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">Личен workspace</p>
            <div className="mt-5 space-y-3">
              {features.map(([title, body]) => <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4"><h2 className="font-bold">{title}</h2><p className="mt-1 text-sm leading-6 text-white/65">{body}</p></div>)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
