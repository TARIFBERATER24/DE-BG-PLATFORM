import { uploadDocumentAction } from "@/app/mein-deutschland/actions";
import { selectRows } from "@/lib/mein-deutschland/supabase";
import { PageHeader, Panel, PrimaryButton } from "@/components/mein-deutschland/MdShell";

type DocumentRow = { id: string; file_name: string; document_type: string; processing_status: string; created_at: string };

export default async function DocumentsPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  const documents = await selectRows<DocumentRow>("documents", "select=*&order=created_at.desc").catch(() => []);
  return (
    <div>
      <PageHeader title="Документи" description="Лична, защитена зона за договори, сметки, писма и други важни документи." />
      {error ? <p className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">Качването не беше успешно. Разрешени са PDF, JPG, PNG и WEBP до 5 MB.</p> : null}
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <Panel>
          <h2 className="font-bold text-ink">Моите документи</h2>
          <div className="mt-4 space-y-3">
            {documents.length ? documents.map((d) => <div key={d.id} className="flex items-center justify-between gap-4 rounded-xl border border-line p-3"><div className="min-w-0"><p className="truncate text-sm font-semibold text-ink">{d.file_name}</p><p className="text-xs text-ink-muted">{d.document_type} · {new Date(d.created_at).toLocaleDateString("bg-BG")}</p></div><span className="rounded-full bg-surface px-2.5 py-1 text-xs font-semibold text-ink-muted">{d.processing_status === "uploaded" ? "Качен" : d.processing_status}</span></div>) : <p className="rounded-xl bg-surface p-4 text-sm text-ink-muted">Все още няма качени документи.</p>}
          </div>
        </Panel>
        <Panel className="h-fit">
          <h2 className="font-bold text-ink">Качи документ</h2>
          <p className="mt-2 text-xs leading-5 text-ink-muted">Файлът се записва в частен Supabase Storage bucket. AI анализ не се стартира автоматично.</p>
          <form action={uploadDocumentAction} className="mt-4 space-y-4">
            <label className="block text-sm font-medium text-ink">Тип<select name="document_type" className="mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-2.5"><option value="contract">Договор</option><option value="annual_bill">Годишна сметка</option><option value="invoice">Фактура</option><option value="kundigung">Kündigung</option><option value="insurance">Застраховка</option><option value="credit">Кредит</option><option value="bank">Банка</option><option value="other">Друг</option></select></label>
            <label className="block text-sm font-medium text-ink">Файл<input name="file" type="file" required accept="application/pdf,image/jpeg,image/png,image/webp" className="mt-1.5 block w-full text-sm text-ink-muted file:mr-3 file:rounded-lg file:border-0 file:bg-brand-tint file:px-3 file:py-2 file:font-semibold file:text-brand-deep" /></label>
            <PrimaryButton>Качи сигурно</PrimaryButton>
          </form>
        </Panel>
      </div>
    </div>
  );
}
