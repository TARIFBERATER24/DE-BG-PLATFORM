import Link from "next/link";
import { registerAction } from "@/app/mein-deutschland/actions";

const messages: Record<string, string> = {
  invalid: "Попълни всички задължителни полета. Паролата трябва да е поне 8 символа.",
  password: "Паролите не съвпадат.",
  terms: "Трябва да приемеш условията и политиката за поверителност.",
  signup: "Регистрацията не беше успешна. Възможно е имейлът вече да е използван.",
};

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <div className="mx-auto max-w-lg px-6 py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Mein Deutschland</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink">Създай своя личен профил</h1>
      <p className="mt-2 text-sm leading-6 text-ink-muted">Безплатен достъп до AI Тарифен Консултант, договори, документи и важни срокове.</p>
      {error ? <p className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{messages[error] || messages.signup}</p> : null}
      <form action={registerAction} className="mt-7 space-y-4 rounded-2xl border border-line bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-ink">Име<input name="first_name" required autoComplete="given-name" className="mt-1.5 w-full rounded-xl border border-line px-3.5 py-2.5 outline-none focus:border-brand" /></label>
          <label className="text-sm font-medium text-ink">Фамилия<input name="last_name" required autoComplete="family-name" className="mt-1.5 w-full rounded-xl border border-line px-3.5 py-2.5 outline-none focus:border-brand" /></label>
        </div>
        <label className="block text-sm font-medium text-ink">Имейл<input name="email" type="email" required autoComplete="email" className="mt-1.5 w-full rounded-xl border border-line px-3.5 py-2.5 outline-none focus:border-brand" /></label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-ink">Парола<input name="password" type="password" minLength={8} required autoComplete="new-password" className="mt-1.5 w-full rounded-xl border border-line px-3.5 py-2.5 outline-none focus:border-brand" /></label>
          <label className="text-sm font-medium text-ink">Повтори паролата<input name="confirm_password" type="password" minLength={8} required autoComplete="new-password" className="mt-1.5 w-full rounded-xl border border-line px-3.5 py-2.5 outline-none focus:border-brand" /></label>
        </div>
        <label className="flex items-start gap-3 text-xs leading-5 text-ink-muted"><input type="checkbox" name="terms" required className="mt-1" /><span>Приемам <Link href="/poveritelnost" className="font-semibold text-brand">политиката за поверителност</Link> и условията за използване.</span></label>
        <button className="w-full rounded-xl bg-brand px-4 py-3 text-sm font-bold text-white">Създай профил</button>
      </form>
      <p className="mt-5 text-center text-sm text-ink-muted">Вече имаш профил? <Link href="/mein-deutschland/login" className="font-semibold text-brand">Влез</Link></p>
    </div>
  );
}
