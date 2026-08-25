import { createContractAction, deleteContractAction } from "@/app/mein-deutschland/actions";
import { selectRows } from "@/lib/mein-deutschland/supabase";
import { Field, PageHeader, Panel, PrimaryButton } from "@/components/mein-deutschland/MdShell";

type Contract = { id: string; category: string; provider: string; product_name: string | null; contract_number: string | null; monthly_price: number | null; end_date: string | null; cancellation_deadline: string | null; status: string };

export default async function ContractsPage() {
  const contracts = await selectRows<Contract>("contracts", "select=*&order=created_at.desc").catch(() => []);
  return (
    <div>
      <PageHeader title="Договори" description="Следи доставчик, цена, край на договора и Kündigungsfrist от едно място." />
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          {contracts.length ? contracts.map((c) => (
            <Panel key={c.id}>
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div><p className="text-xs font-semibold uppercase tracking-wide text-brand">{c.category}</p><h2 className="mt-1 text-lg font-bold text-ink">{c.provider}</h2><p className="text-sm text-ink-muted">{c.product_name || c.contract_number || "Без допълнителни данни"}</p></div>
                <div className="text-left sm:text-right"><p className="font-bold text-ink">{c.monthly_price ? `${Number(c.monthly_price).toFixed(2)} €/мес.` : "Цена не е въведена"}</p><p className="text-xs text-ink-muted">{c.cancellation_deadline ? `Kündigung до ${c.cancellation_deadline}` : c.end_date ? `Край: ${c.end_date}` : "Няма въведен срок"}</p></div>
              </div>
              <form action={deleteContractAction} className="mt-4 border-t border-line pt-3"><input type="hidden" name="id" value={c.id} /><button className="text-xs font-semibold text-red-600">Изтрий договора</button></form>
            </Panel>
          )) : <Panel><p className="text-sm text-ink-muted">Нямаш добавени договори. Използвай формата вдясно, за да добавиш първия.</p></Panel>}
        </div>
        <Panel className="h-fit">
          <h2 className="font-bold text-ink">Добави договор</h2>
          <form action={createContractAction} className="mt-4 space-y-4">
            <label className="block text-sm font-medium text-ink">Категория<select name="category" required className="mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-2.5"><option value="strom">Ток</option><option value="gas">Газ</option><option value="internet">Интернет</option><option value="mobilfunk">Мобилен план</option><option value="kfz">KFZ Versicherung</option><option value="rechtsschutz">Rechtsschutz</option><option value="kredit">Кредит</option><option value="bankkonto">Банкова сметка</option><option value="other">Друг</option></select></label>
            <Field label="Доставчик" name="provider" required placeholder="напр. E.ON" />
            <Field label="Тарифа / продукт" name="product_name" />
            <Field label="Договор №" name="contract_number" />
            <Field label="Месечна цена (€)" name="monthly_price" type="number" />
            <Field label="Край на договора" name="end_date" type="date" />
            <Field label="Kündigungsfrist" name="cancellation_deadline" type="date" />
            <PrimaryButton>Добави договор</PrimaryButton>
          </form>
        </Panel>
      </div>
    </div>
  );
}
