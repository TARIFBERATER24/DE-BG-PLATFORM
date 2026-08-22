// Style reminder: calm Bulgarian guidance, clear boundaries, and route-first assistance that complements the platform’s light, credible design.
"use client";

import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { ArrowUpRight, Bot, LoaderCircle, LockKeyhole, MessageCircle, RotateCcw, Send, ShieldAlert, X } from "lucide-react";
import { PLATFORM_ASSISTANT_QUICK_PROMPTS, type PlatformAssistantRouteKey } from "@/lib/platform-assistant";

type AssistantMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
  route?: { label: string; href: string };
  riskLevel?: "normal" | "sensitive";
};

const welcomeMessage: AssistantMessage = {
  id: "welcome",
  role: "assistant",
  content: "Здравейте! Аз съм дигиталният асистент на Сравни.de. Мога да Ви помогна да намерите правилната услуга или страница на български.",
};

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function PlatformAssistant() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<AssistantMessage[]>([welcomeMessage]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function sendMessage(value: string) {
    const content = value.trim().slice(0, 600);
    if (!content || pending) return;
    const userMessage: AssistantMessage = { id: makeId(), role: "user", content };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setDraft("");
    setError("");
    setPending(true);

    try {
      const requestMessages = nextMessages.slice(-4).map(({ role, content: messageContent }) => ({ role, content: messageContent }));
      const response = await fetch("/api/platform-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: requestMessages }),
      });
      if (!response.ok) throw new Error("Assistant unavailable");
      const result = await response.json() as {
        reply?: string; followUp?: string; route?: { label?: string; href?: string }; routeKey?: PlatformAssistantRouteKey; riskLevel?: "normal" | "sensitive";
      };
      const assistantContent = [result.reply, result.followUp].filter((item): item is string => typeof item === "string" && item.trim().length > 0).join("\n\n");
      setMessages((current) => [...current, {
        id: makeId(), role: "assistant", content: assistantContent || "Мога да Ви насоча към подходяща страница на Сравни.de.",
        route: result.route?.label && result.route?.href ? { label: result.route.label, href: result.route.href } : undefined,
        riskLevel: result.riskLevel,
      }]);
    } catch {
      setError("Асистентът временно не е наличен. Моля, опитайте отново след малко.");
    } finally {
      setPending(false);
      window.setTimeout(() => inputRef.current?.focus(), 0);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(draft);
  }

  function resetConversation() {
    setMessages([welcomeMessage]);
    setDraft("");
    setError("");
  }

  return (
    <div className="fixed bottom-5 right-4 z-50 sm:bottom-6 sm:right-6">
      {open && (
        <section id="platform-assistant-panel" aria-label="Сравни AI асистент" className="mb-3 flex h-[min(39rem,calc(100dvh-7rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_24px_64px_rgba(16,24,40,0.2)]">
          <header className="flex items-start justify-between gap-3 border-b border-line bg-brand-deep px-4 py-4 text-white">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15"><Bot className="h-5 w-5" aria-hidden="true" /></span>
              <div><p className="text-sm font-semibold">Сравни AI асистент</p><p className="mt-0.5 text-xs leading-5 text-white/75">Навигация и обща ориентация на български</p></div>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="rounded-lg p-2 text-white/85 transition hover:bg-white/10 hover:text-white" aria-label="Затвори асистента"><X className="h-4 w-4" aria-hidden="true" /></button>
          </header>

          <div className="border-b border-alert-line bg-alert-bg px-4 py-2.5 text-xs leading-5 text-alert-ink"><span className="font-semibold">Важно:</span> не въвеждайте IBAN, карта, PIN, TAN или парола. Асистентът не плаща и не изпраща заявки.</div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-canvas px-3 py-4" aria-live="polite">
            {messages.map((message) => (
              <div key={message.id} className={message.role === "user" ? "ml-8" : "mr-5"}>
                <div className={`rounded-2xl px-3.5 py-3 text-sm leading-6 ${message.role === "user" ? "rounded-br-md bg-brand text-on-brand" : "rounded-bl-md border border-line bg-surface text-ink"}`}>
                  {message.content.split("\n").map((line, index) => <p key={`${message.id}-${index}`} className={index > 0 ? "mt-2" : undefined}>{line}</p>)}
                </div>
                {message.riskLevel === "sensitive" && <p className="mt-1.5 flex items-start gap-1.5 text-xs leading-4 text-alert-ink"><ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />Нужен е човешки преглед; това не е правен съвет.</p>}
                {message.route && <Link href={message.route.href} onClick={() => setOpen(false)} className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-brand/25 bg-brand-tint px-3 py-2 text-xs font-semibold text-brand transition hover:bg-brand hover:text-on-brand">{message.route.label}<ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></Link>}
              </div>
            ))}
            {pending && <div className="mr-5 inline-flex items-center gap-2 rounded-2xl rounded-bl-md border border-line bg-surface px-3.5 py-3 text-sm text-ink-muted"><LoaderCircle className="h-4 w-4 animate-spin text-brand" aria-hidden="true" />Мисля върху най-подходящия маршрут…</div>}
            {error && <p role="alert" className="rounded-lg border border-danger-line bg-danger-bg px-3 py-2 text-xs leading-5 text-danger">{error}</p>}
          </div>

          <div className="border-t border-line bg-surface p-3">
            {messages.length === 1 && <div className="mb-3 flex flex-wrap gap-1.5">{PLATFORM_ASSISTANT_QUICK_PROMPTS.map((prompt) => <button key={prompt} type="button" onClick={() => void sendMessage(prompt)} disabled={pending} className="rounded-full border border-line bg-surface px-2.5 py-1.5 text-left text-xs leading-4 text-ink-muted transition hover:border-brand hover:bg-brand-tint hover:text-brand disabled:opacity-50">{prompt}</button>)}</div>}
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input ref={inputRef} value={draft} onChange={(event) => setDraft(event.target.value)} maxLength={600} disabled={pending} placeholder="Напишете въпроса си…" className="h-10 min-w-0 flex-1 rounded-xl border border-line bg-canvas px-3 text-sm text-ink outline-none transition focus:border-brand disabled:opacity-60" aria-label="Вашият въпрос към асистента" />
              <button type="submit" disabled={!draft.trim() || pending} className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-on-brand transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-45" aria-label="Изпрати"><Send className="h-4 w-4" aria-hidden="true" /></button>
            </form>
            <div className="mt-2 flex items-center justify-between gap-2 text-[11px] leading-4 text-ink-subtle"><span className="inline-flex items-center gap-1"><LockKeyhole className="h-3 w-3" aria-hidden="true" />Разговорът не се записва в профил.</span><button type="button" onClick={resetConversation} className="inline-flex items-center gap-1 font-medium hover:text-brand"><RotateCcw className="h-3 w-3" aria-hidden="true" />Нова тема</button></div>
          </div>
        </section>
      )}

      <button type="button" onClick={() => setOpen((value) => !value)} className="group inline-flex items-center gap-2 rounded-full bg-brand px-4 py-3 text-sm font-semibold text-on-brand shadow-[0_14px_30px_rgba(29,78,216,0.28)] transition duration-200 hover:-translate-y-0.5 hover:bg-brand-hover active:scale-[0.97]" aria-expanded={open} aria-controls="platform-assistant-panel">
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        <span>{open ? "Затвори асистента" : "Попитай AI асистента"}</span>
      </button>
    </div>
  );
}
