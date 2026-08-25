import Link from "next/link";
import { logoutAction } from "@/app/mein-deutschland/actions";

const items = [
  ["Начало", "/mein-deutschland/dashboard"],
  ["AI Тарифен Консултант", "/mein-deutschland/tarifberater"],
  ["Договори", "/mein-deutschland/vertraege"],
  ["Документи", "/mein-deutschland/dokumente"],
  ["Срокове", "/mein-deutschland/fristen"],
  ["Известия", "/mein-deutschland/benachrichtigungen"],
  ["Профил", "/mein-deutschland/profil"],
];

export function MdShell({ children, name }: { children: React.ReactNode; name?: string }) {
  return (
    <div className="bg-[#f5f7fb] min-h-[80vh]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[240px_1fr] lg:px-6">
        <aside className="rounded-2xl border border-line bg-white p-4 lg:sticky lg:top-24 lg:h-fit">
          <div className="mb-5 px-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Mein Deutschland</p>
            <p className="mt-1 text-sm text-ink-muted">{name ? `Здравей, ${name}` : "Личният ти център"}</p>
          </div>
          <nav className="grid grid-cols-2 gap-1 sm:grid-cols-4 lg:grid-cols-1">
            {items.map(([label, href]) => (
              <Link key={href} href={href} className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink transition hover:bg-brand-tint hover:text-brand-deep">
                {label}
              </Link>
            ))}
          </nav>
          <form action={logoutAction} className="mt-4 border-t border-line pt-4">
            <button className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-ink-muted hover:bg-surface">Изход</button>
          </form>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}

export function PageHeader({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">{title}</h1>
        {description ? <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-2xl border border-line bg-white p-5 shadow-sm ${className}`}>{children}</section>;
}

export function Field({ label, name, type = "text", required, placeholder, defaultValue }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string; defaultValue?: string | number | null }) {
  return (
    <label className="block text-sm font-medium text-ink">
      {label}
      <input name={name} type={type} required={required} placeholder={placeholder} defaultValue={defaultValue ?? ""} className="mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand-tint" />
    </label>
  );
}

export function PrimaryButton({ children }: { children: React.ReactNode }) {
  return <button className="rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-95">{children}</button>;
}
