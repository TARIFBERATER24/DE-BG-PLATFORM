import { createDeadlineAction, completeDeadlineAction } from "@/app/mein-deutschland/actions";
import { selectRows } from "@/lib/mein-deutschland/supabase";
import { Field, PageHeader, Panel, PrimaryButton } from "@/components/mein-deutschland/MdShell";

type Deadline = { id: string; title: string; description: string | null; deadline_at: string; deadline_type: string; status: string };

function urgency(date: string) {
  const days = Math.ceil((new Date(date).getTime() - Date.now()) / 86400000);
  if (days < 0) return ["Просрочено", "text-red-700 bg-red-50"];
  if (days <= 7) return ["Спешно", "text-red-700 bg-red-50"];
  if (days <= 30) return ["Скоро", "text-amber-700 bg-amber-50"];
  return ["Предстоящо", "text-ink-muted bg-surface"];
}

export default async function DeadlinesPage() {
  const deadlines = await selectRows<Deadline>("deadlines", "select=*&order=deadline_at.asc").catch(() => []);
  return (
    <div>
      <PageHeader title="Важни срокове" description="Kündigungsfrist, Vertragsende, плащания и други дати, които не искаш да изпуснеш." />
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          {deadlines.length ? deadlines.map((d) => { const [label, cls] = urgency(d.deadline_at); return <Panel key={d.id}><div className="flex items-start justify-between gap-4"><div><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${cls}`}>{d.status === "completed" ? "Завършено" : label}</span><h2 className="mt-3 font-bold text-ink">{d.title}</h2><p className="mt-1 text-sm text-ink-muted">{d.description || d.deadline_type}</p></div><p className="shrink-0 text-sm font-bold text-ink">{new Date(d.deadline_at).toLocaleDateString("bg-BG")}</p></div>{d.status !== "completed" ? <form action={completeDeadlineAction} className="mt-4 border-t border-line pt-3"><input type="hidden" name="id" value={d.id} /><button className="text-xs font-semibold text-brand">Маркирай като изпълнено</button></form> : null}</Panel>; }) : <Panel><p className="text-sm text-ink-muted">Нямаш добавени срокове.</p></Panel>}
        </div>
        <Panel className="h-fit"><h2 className="font-bold text-ink">Добави срок</h2><form action={createDeadlineAction} className="mt-4 space-y-4"><Field label="Заглавие" name="title" required placeholder="напр. Kündigung на договора за ток" /><Field label="Описание" name="description" /><Field label="Дата" name="deadline_at" type="date" required /><label className="block text-sm font-medium text-ink">Тип<select name="deadline_type" className="mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-2.5"><option value="cancellation">Kündigungsfrist</option><option value="contract_end">Vertragsende</option><option value="payment">Плащане</option><option value="meter_reading">Zählerstand</option><option value="insurance">Застраховка</option><option value="other">Друг</option></select></label><PrimaryButton>Добави срок</PrimaryButton></form></Panel>
      </div>
    </div>
  );
}
