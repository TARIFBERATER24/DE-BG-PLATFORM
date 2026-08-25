import { startTariffConsultationAction } from "@/app/mein-deutschland/actions";
import { PageHeader, Panel, PrimaryButton } from "@/components/mein-deutschland/MdShell";

const categories = [
  ["strom", "⚡ Ток"], ["gas", "🔥 Газ"], ["internet", "🌐 Интернет"], ["kfz", "🚗 KFZ Versicherung"], ["rechtsschutz", "⚖️ Rechtsschutz"], ["bankkonto", "💳 Банкова сметка"], ["kredit", "💶 Кредит"],
];

export default async function TarifberaterPage({ searchParams }: { searchParams: Promise<{ category?: string; started?: string }> }) {
  const params = await searchParams;
  const category = params.category;
  if (!category) {
    return <div><PageHeader title="AI Тарифен Консултант" description="Избери какво искаш да оптимизираме. Не показваме измислени live цени — реалните оферти ще идват само от проверени източници." /><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{categories.map(([key, label]) => <a key={key} href={`/mein-deutschland/tarifberater?category=${key}`} className="rounded-2xl border border-line bg-white p-5 text-lg font-bold text-ink shadow-sm transition hover:border-brand hover:shadow-md">{label}<p className="mt-2 text-sm font-normal text-ink-muted">Започни Datenaufnahme →</p></a>)}</div></div>;
  }
  const isEnergy = category === "strom" || category === "gas";
  return (
    <div>
      <PageHeader title={`Консултация: ${categories.find(([k]) => k === category)?.[1] || category}`} description="Данните се записват към твоя профил и могат да бъдат допълнени по-късно." />
      {params.started ? <p className="mb-5 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-800">Консултацията е записана. Следващият етап ще използва проверени тарифни източници; не генерираме текущи цени от паметта на AI.</p> : null}
      <Panel className="max-w-3xl">
        <form action={startTariffConsultationAction} className="grid gap-4 sm:grid-cols-2">
          <input type="hidden" name="category" value={category} />
          {isEnergy ? <>
            <label className="block text-sm font-medium text-ink">PLZ<input name="postal_code" required className="mt-1.5 w-full rounded-xl border border-line px-3.5 py-2.5" /></label>
            <label className="block text-sm font-medium text-ink">Годишно потребление (kWh)<input name="annual_consumption_kwh" type="number" required className="mt-1.5 w-full rounded-xl border border-line px-3.5 py-2.5" /></label>
            <label className="block text-sm font-medium text-ink">Текущ доставчик<input name="current_provider" className="mt-1.5 w-full rounded-xl border border-line px-3.5 py-2.5" /></label>
            <label className="block text-sm font-medium text-ink">Текуща тарифа<input name="current_tariff" className="mt-1.5 w-full rounded-xl border border-line px-3.5 py-2.5" /></label>
            <label className="block text-sm font-medium text-ink">Grundpreis €/год.<input name="grundpreis" type="number" step="0.01" className="mt-1.5 w-full rounded-xl border border-line px-3.5 py-2.5" /></label>
            <label className="block text-sm font-medium text-ink">Arbeitspreis ct/kWh<input name="arbeitspreis" type="number" step="0.01" className="mt-1.5 w-full rounded-xl border border-line px-3.5 py-2.5" /></label>
            <label className="block text-sm font-medium text-ink">Месечен Abschlag €<input name="monthly_payment" type="number" step="0.01" className="mt-1.5 w-full rounded-xl border border-line px-3.5 py-2.5" /></label>
            <label className="block text-sm font-medium text-ink">Kündigungsfrist / дата<input name="cancellation_date" type="date" className="mt-1.5 w-full rounded-xl border border-line px-3.5 py-2.5" /></label>
          </> : <>
            <label className="block text-sm font-medium text-ink sm:col-span-2">Какво искаш да подобрим?<textarea name="goal" required rows={4} className="mt-1.5 w-full rounded-xl border border-line px-3.5 py-2.5" placeholder="Опиши текущия продукт, цена и какво търсиш." /></label>
          </>}
          <div className="sm:col-span-2"><PrimaryButton>Запази консултацията</PrimaryButton></div>
        </form>
      </Panel>
    </div>
  );
}
