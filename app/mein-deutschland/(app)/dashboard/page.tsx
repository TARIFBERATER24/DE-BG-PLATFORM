import Link from "next/link";
import { currentUser, selectRows } from "@/lib/mein-deutschland/supabase";
import { PageHeader, Panel } from "@/components/mein-deutschland/MdShell";

type Contract = { id: string; provider: string; category: string; monthly_price: number | null; cancellation_deadline: string | null };
type Deadline = { id: string; title: string; deadline_at: string; status: string };
type DocumentRow = { id: string; file_name: string; document_type: string; created_at: string };

export default async function DashboardPage() {
  const user = await currentUser();
  const [profiles, contracts, deadlines, documents] = await Promise.all([
    selectRows<{ first_name?: string }>("profiles", `select=first_name&id=eq.${user!.id}&limit=1`).catch(() => []),
    selectRows<Contract>("contracts", "select=id,provider,category,monthly_price,cancellation_deadline&status=eq.active&order=created_at.desc&limit=3").catch(() => []),
    selectRows<Deadline>("deadlines", "select=id,title,deadline_at,status&status=eq.open&order=deadline_at.asc&limit=4").catch(() => []),
    selectRows<DocumentRow>("documents", "select=id,file_name,document_type,created_at&order=created_at.desc&limit=4").catch(() => []),
  ]);
  const firstName = profiles[0]?.first_name || user?.user_metadata?.first_name || "";

  return (
    <div>
      <PageHeader title={`Здравей${firstName ? `, ${firstName}` : ""} 👋`} description="Всичко важно за договорите, документите и живота ти в Германия — на едно място." />

      <section className="relative overflow-hidden rounded-3xl bg-brand-deep p-6 text-white shadow-lg sm:p-8">
        <div className="relative z-10 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">AI Tarifberater</p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">AI Тарифен Консултант</h2>
          <p className="mt-3 text-sm leading-6 text-white/75 sm:text-base">Разбери дали плащаш повече, отколкото трябва. Започни с текущия си договор или с няколко основни данни.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/mein-deutschland/tarifberater" className="rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-brand-deep">Започни консултация</Link>
            <Link href="/mein-deutschland/dokumente" className="rounded-xl border border-white/30 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10">Качи договор</Link>
          </div>
          <p className="mt-5 text-xs text-white/55">Ток · Газ · Интернет · KFZ · Rechtsschutz · Банки · Кредити</p>
        </div>
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Panel>
          <div className="flex items-center justify-between"><h2 className="font-bold text-ink">Моите договори</h2><Link className="text-sm font-semibold text-brand" href="/mein-deutschland/vertraege">Всички</Link></div>
          <div className="mt-4 space-y-3">
            {contracts.length ? contracts.map((c) => <div key={c.id} className="flex items-center justify-between rounded-xl border border-line p-3"><div><p className="font-semibold text-ink">{c.provider}</p><p className="text-xs text-ink-muted">{c.category}{c.cancellation_deadline ? ` · Kündigung до ${c.cancellation_deadline}` : ""}</p></div><span className="text-sm font-semibold text-ink">{c.monthly_price ? `${c.monthly_price.toFixed(2)} €` : "—"}</span></div>) : <p className="rounded-xl bg-surface p-4 text-sm text-ink-muted">Все още няма добавени договори. <Link href="/mein-deutschland/vertraege" className="font-semibold text-brand">Добави първия си договор →</Link></p>}
          </div>
        </Panel>

        <Panel>
          <div className="flex items-center justify-between"><h2 className="font-bold text-ink">Важни срокове</h2><Link className="text-sm font-semibold text-brand" href="/mein-deutschland/fristen">Управление</Link></div>
          <div className="mt-4 space-y-3">
            {deadlines.length ? deadlines.map((d) => <div key={d.id} className="rounded-xl border border-line p-3"><p className="font-semibold text-ink">{d.title}</p><p className="mt-1 text-xs text-ink-muted">{new Date(d.deadline_at).toLocaleDateString("bg-BG")}</p></div>) : <p className="rounded-xl bg-surface p-4 text-sm text-ink-muted">Нямаш активни срокове.</p>}
          </div>
        </Panel>

        <Panel>
          <div className="flex items-center justify-between"><h2 className="font-bold text-ink">Документи</h2><Link className="text-sm font-semibold text-brand" href="/mein-deutschland/dokumente">Качи документ</Link></div>
          <div className="mt-4 space-y-2">
            {documents.length ? documents.map((d) => <div key={d.id} className="rounded-xl border border-line px-3 py-2.5"><p className="truncate text-sm font-semibold text-ink">{d.file_name}</p><p className="text-xs text-ink-muted">{d.document_type}</p></div>) : <p className="rounded-xl bg-surface p-4 text-sm text-ink-muted">Все още няма качени документи.</p>}
          </div>
        </Panel>

        <Panel>
          <h2 className="font-bold text-ink">Бързи действия</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {[["Провери тарифата ми", "/mein-deutschland/tarifberater"],["Добави договор", "/mein-deutschland/vertraege"],["Качи документ", "/mein-deutschland/dokumente"],["Добави срок", "/mein-deutschland/fristen"]].map(([label, href]) => <Link key={href} href={href} className="rounded-xl border border-line p-3 text-sm font-semibold text-ink transition hover:border-brand hover:text-brand">{label} →</Link>)}
          </div>
        </Panel>
      </div>
    </div>
  );
}
