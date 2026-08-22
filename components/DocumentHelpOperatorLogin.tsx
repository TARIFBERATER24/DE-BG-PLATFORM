// Style reminder: calm, practical operator access with no client-side persistence of the access code.
"use client";

import { useState, type FormEvent } from "react";
import { KeyRound, LockKeyhole } from "lucide-react";

export default function DocumentHelpOperatorLogin({ configured }: { configured: boolean }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/demo/document-help/operator-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(payload.error ?? "Неуспешен достъп.");
      window.location.reload();
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Неуспешен достъп.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <div className="rounded-lg border border-line bg-surface p-6 shadow-sm">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-tint text-brand">
          <LockKeyhole className="h-5 w-5" aria-hidden="true" />
        </div>
        <h1 className="mt-5 text-2xl font-semibold text-ink">Преглед на demo заявки</h1>
        <p className="mt-2 text-sm leading-6 text-ink-muted">
          Само операторът може да вижда съхранените документи, email адреси и статуси.
        </p>

        {configured ? (
          <form onSubmit={submit} className="mt-6">
            <label htmlFor="operator-code" className="text-sm font-medium text-ink">Код за достъп</label>
            <div className="relative mt-2">
              <KeyRound className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-ink-subtle" aria-hidden="true" />
              <input
                id="operator-code"
                type="password"
                autoComplete="current-password"
                required
                value={code}
                onChange={(event) => setCode(event.target.value)}
                className="h-10 w-full rounded-md border border-line bg-surface pl-10 pr-3 text-sm text-ink outline-none transition-colors focus:border-brand"
              />
            </div>
            {error && <p className="mt-3 text-sm text-danger" role="alert">{error}</p>}
            <button
              type="submit"
              disabled={pending}
              className="mt-5 w-full rounded-md bg-brand px-4 py-2.5 text-sm font-medium text-on-brand transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending ? "Проверяваме…" : "Отвори заявките"}
            </button>
          </form>
        ) : (
          <div className="mt-6 rounded-md border border-alert-line bg-alert-bg p-4 text-sm leading-6 text-alert-ink">
            Операторският достъп ще се активира, след като бъдат добавени нужните защитени настройки във Vercel.
          </div>
        )}
      </div>
    </div>
  );
}
