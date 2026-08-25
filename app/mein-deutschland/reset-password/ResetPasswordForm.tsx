"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { updatePasswordAction } from "@/app/mein-deutschland/actions";

export function ResetPasswordForm({ errorText }: { errorText: string | null }) {
  const [ready, setReady] = useState(false);
  const [sessionError, setSessionError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const setErrorLater = (message: string) => {
      window.setTimeout(() => {
        if (!cancelled) setSessionError(message);
      }, 0);
    };
    const params = new URLSearchParams(window.location.hash.slice(1));
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    const errorDescription = params.get("error_description");

    if (errorDescription) {
      setErrorLater(errorDescription);
      return () => {
        cancelled = true;
      };
    }

    if (!accessToken || !refreshToken) {
      setErrorLater("Линкът за възстановяване е невалиден или е изтекъл.");
      return () => {
        cancelled = true;
      };
    }

    fetch("/mein-deutschland/auth/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_in: Number(params.get("expires_in")) || 3600,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          const data = await response.json().catch(() => null) as { error?: string } | null;
          throw new Error(data?.error || "Линкът за възстановяване е невалиден или е изтекъл.");
        }
        if (cancelled) return;
        setReady(true);
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      })
      .catch((error: unknown) => {
        setErrorLater(error instanceof Error ? error.message : "Линкът за възстановяване е невалиден или е изтекъл.");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const visibleError = errorText || sessionError;

  return (
    <>
      {visibleError ? <p className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{visibleError}</p> : null}
      {!ready && !visibleError ? <p className="mt-5 rounded-xl border border-line bg-surface p-3 text-sm text-ink-muted">Проверяваме линка за възстановяване…</p> : null}
      <form action={updatePasswordAction} className="mt-7 space-y-4 rounded-2xl border border-line bg-white p-6 shadow-sm">
        <label className="block text-sm font-medium text-ink">Нова парола<input name="password" type="password" minLength={8} required autoComplete="new-password" disabled={!ready} className="mt-1.5 w-full rounded-xl border border-line px-3.5 py-2.5 outline-none focus:border-brand disabled:cursor-not-allowed disabled:bg-surface" /></label>
        <label className="block text-sm font-medium text-ink">Повтори новата парола<input name="confirm_password" type="password" minLength={8} required autoComplete="new-password" disabled={!ready} className="mt-1.5 w-full rounded-xl border border-line px-3.5 py-2.5 outline-none focus:border-brand disabled:cursor-not-allowed disabled:bg-surface" /></label>
        <button disabled={!ready} className="w-full rounded-xl bg-brand px-4 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">Запази новата парола</button>
      </form>
      <p className="mt-5 text-center text-sm text-ink-muted"><Link href="/mein-deutschland/login" className="font-semibold text-brand">Към входа</Link></p>
    </>
  );
}
