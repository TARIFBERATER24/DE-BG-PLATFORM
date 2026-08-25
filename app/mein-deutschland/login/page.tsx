import Link from "next/link";
import { loginAction } from "@/app/mein-deutschland/actions";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Mein Deutschland</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink">Вход в профила</h1>
      <p className="mt-2 text-sm text-ink-muted">Твоите договори, документи и срокове остават в личната ти зона.</p>
      {error ? <p className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">Не успяхме да те впишем. Провери имейла и паролата.</p> : null}
      <form action={loginAction} className="mt-7 space-y-4 rounded-2xl border border-line bg-white p-6 shadow-sm">
        <label className="block text-sm font-medium text-ink">Имейл<input name="email" type="email" required autoComplete="email" className="mt-1.5 w-full rounded-xl border border-line px-3.5 py-2.5 outline-none focus:border-brand" /></label>
        <label className="block text-sm font-medium text-ink">Парола<input name="password" type="password" required autoComplete="current-password" className="mt-1.5 w-full rounded-xl border border-line px-3.5 py-2.5 outline-none focus:border-brand" /></label>
        <button className="w-full rounded-xl bg-brand px-4 py-3 text-sm font-bold text-white">Влез</button>
      </form>
      <p className="mt-5 text-center text-sm text-ink-muted">Нямаш профил? <Link href="/mein-deutschland/register" className="font-semibold text-brand">Създай безплатен профил</Link></p>
    </div>
  );
}
