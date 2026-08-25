import Link from "next/link";
import { requestPasswordResetAction } from "@/app/mein-deutschland/actions";

export default async function ForgotPasswordPage({ searchParams }: { searchParams: Promise<{ error?: string; detail?: string; sent?: string }> }) {
  const { error, detail, sent } = await searchParams;
  const errorText = error ? (detail || (error === "invalid" ? "Въведи имейл адрес." : "Не успяхме да изпратим имейла за възстановяване.")) : null;

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Mein Deutschland</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink">Забравена парола</h1>
      <p className="mt-2 text-sm leading-6 text-ink-muted">Въведи имейла си и ще ти изпратим линк за задаване на нова парола.</p>
      {sent ? <p className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">Ако този имейл е регистриран, ще получиш линк за възстановяване. Провери и папка „Спам“.</p> : null}
      {errorText ? <p className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{errorText}</p> : null}
      <form action={requestPasswordResetAction} className="mt-7 space-y-4 rounded-2xl border border-line bg-white p-6 shadow-sm">
        <label className="block text-sm font-medium text-ink">Имейл<input name="email" type="email" required autoComplete="email" className="mt-1.5 w-full rounded-xl border border-line px-3.5 py-2.5 outline-none focus:border-brand" /></label>
        <button className="w-full rounded-xl bg-brand px-4 py-3 text-sm font-bold text-white">Изпрати линк</button>
      </form>
      <p className="mt-5 text-center text-sm text-ink-muted"><Link href="/mein-deutschland/login" className="font-semibold text-brand">Към входа</Link></p>
    </div>
  );
}
