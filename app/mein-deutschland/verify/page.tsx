import Link from "next/link";

export default async function VerifyPage({ searchParams }: { searchParams: Promise<{ email?: string }> }) {
  const { email } = await searchParams;
  return (
    <div className="mx-auto max-w-lg px-6 py-20 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-tint text-2xl">✉️</div>
      <h1 className="mt-5 text-3xl font-bold tracking-tight text-ink">Потвърди имейла си</h1>
      <p className="mt-3 text-sm leading-6 text-ink-muted">Изпратихме линк за потвърждение{email ? <> на <strong>{email}</strong></> : null}. След потвърждението се върни и влез в профила си.</p>
      <Link href="/mein-deutschland/login" className="mt-7 inline-flex rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white">Към входа</Link>
    </div>
  );
}
