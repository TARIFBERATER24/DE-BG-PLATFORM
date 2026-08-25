import { selectRows } from "@/lib/mein-deutschland/supabase";
import { PageHeader, Panel } from "@/components/mein-deutschland/MdShell";

type Notification = { id: string; title: string; body: string | null; read: boolean; created_at: string };

export default async function NotificationsPage() {
  const notifications = await selectRows<Notification>("notifications", "select=*&order=created_at.desc&limit=50").catch(() => []);
  return (
    <div><PageHeader title="Известия" description="Напомняния и важни промени по твоите договори, документи и срокове." />
      <div className="space-y-3">{notifications.length ? notifications.map((n) => <Panel key={n.id}><div className="flex items-start gap-3"><span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${n.read ? "bg-line" : "bg-brand"}`} /><div><h2 className="font-semibold text-ink">{n.title}</h2>{n.body ? <p className="mt-1 text-sm leading-6 text-ink-muted">{n.body}</p> : null}<p className="mt-2 text-xs text-ink-subtle">{new Date(n.created_at).toLocaleString("bg-BG")}</p></div></div></Panel>) : <Panel><p className="text-sm text-ink-muted">Нямаш нови известия.</p></Panel>}</div>
    </div>
  );
}
