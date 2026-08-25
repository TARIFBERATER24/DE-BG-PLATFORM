import { ResetPasswordForm } from "./ResetPasswordForm";

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ error?: string; detail?: string }> }) {
  const { error, detail } = await searchParams;
  const errorText = error ? (detail || (error === "password" ? "Паролите не съвпадат." : error === "invalid" ? "Новата парола трябва да е поне 8 символа." : "Новата парола не беше запазена.")) : null;

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Mein Deutschland</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink">Задай нова парола</h1>
      <p className="mt-2 text-sm leading-6 text-ink-muted">Избери нова парола за своя профил. Тя трябва да съдържа поне 8 символа.</p>
      <ResetPasswordForm errorText={errorText} />
    </div>
  );
}
