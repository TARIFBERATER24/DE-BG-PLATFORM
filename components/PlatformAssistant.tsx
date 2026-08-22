// Style reminder: Sravni AI is a premium, human-feeling digital guide — dark-navy glass, electric-blue energy, and a warm avatar balanced with credible Bulgarian clarity.
"use client";

import Link from "next/link";
import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, LoaderCircle, LockKeyhole, MessageCircle, RotateCcw, Send, ShieldAlert, ShieldCheck, Sparkles, X } from "lucide-react";
import { PLATFORM_ASSISTANT_QUICK_PROMPTS, type PlatformAssistantRouteKey } from "@/lib/platform-assistant";

const ILIYA_BRAND_IMAGE_URL = "/manus-storage/iliya-brand-avatar_6d5f9387.png";
const ORBIT_URL = "/manus-storage/sravni-ai-orbit_f92a47b7.png";

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
  content: "Здравейте — аз съм Илия, Вашият дигитален гид за Германия. Кажете ми каква ситуация имате и ще Ви насоча към най-подходящата страница.",
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

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 220);
  }, [open]);

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
    <div className="fixed bottom-4 right-3 z-50 sm:bottom-6 sm:right-6">
      {open && (
        <section id="platform-assistant-panel" aria-label="Сравни AI асистент" className="assistant-panel-rise mb-4 flex h-[min(43rem,calc(100dvh-6.5rem))] w-[min(27.5rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-[1.7rem] border border-white/20 bg-[#f7f9fe] shadow-[0_36px_100px_rgba(3,12,34,0.38)] sm:w-[27.5rem]">
          <header className="relative isolate min-h-52 overflow-hidden bg-[#071b42] px-5 pb-5 pt-4 text-white">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_20%,rgba(41,114,255,.55),transparent_42%),linear-gradient(105deg,#030e29_0%,#071b42_58%,#0c3b91_100%)]" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-[46%] overflow-hidden sm:w-[48%]">
              <Image src={ILIYA_BRAND_IMAGE_URL} alt="" width={250} height={250} unoptimized className="absolute left-0 top-0 h-[15.625rem] w-[15.625rem] max-w-none object-contain object-left-top opacity-95" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#071b42] via-[#071b42]/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#071b42] to-transparent" />
            </div>
            <div className="relative z-10 flex items-start justify-between gap-4">
              <div className="flex max-w-[64%] items-center gap-3">
                <div className="relative h-14 w-14 shrink-0">
                  <Image src={ORBIT_URL} alt="" width={88} height={88} unoptimized className="assistant-orbit absolute -inset-4 h-[5.5rem] w-[5.5rem] max-w-none opacity-90" />
                  <div className="assistant-avatar-frame relative grid h-14 w-14 place-items-center overflow-hidden rounded-full border border-white/50 bg-[#103c94] shadow-[0_0_0_5px_rgba(37,99,235,.25)]">
                    <Image src={ILIYA_BRAND_IMAGE_URL} alt="Портрет на Илия" width={185} height={185} unoptimized className="absolute -left-8 -top-5 h-44 w-44 max-w-none object-contain" />
                  </div>
                  <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[#071b42] bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,.95)]" aria-label="Онлайн" />
                </div>
                <div>
                  <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.19em] text-cyan-200"><Sparkles className="h-3 w-3" aria-hidden="true" />Дигитален гид</p>
                  <h2 className="mt-0.5 text-lg font-semibold tracking-tight">Илия</h2>
                  <p className="mt-0.5 text-xs leading-5 text-blue-100/80">Ориентация за живота в Германия — на български.</p>
                </div>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="relative z-20 rounded-xl border border-white/10 bg-[#071b42]/55 p-2 text-white/85 backdrop-blur-sm transition hover:bg-white/20 hover:text-white" aria-label="Затвори асистента"><X className="h-4 w-4" aria-hidden="true" /></button>
            </div>
            <div className="relative mt-4 flex items-center gap-2 border-t border-white/10 pt-3 text-xs text-blue-100/85"><ShieldCheck className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" /><span>Насочва Ви, но не извършва действия вместо Вас.</span></div>
          </header>

          <div className="flex items-center gap-2 border-b border-amber-200 bg-[#fff8e5] px-4 py-2.5 text-[11px] leading-4 text-[#714900]"><LockKeyhole className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /><span>Не изпращайте IBAN, карта, PIN, TAN или парола. Разговорът не се записва в профил.</span></div>

          <div className="assistant-chat-grid flex-1 space-y-4 overflow-y-auto px-4 py-5" aria-live="polite">
            {messages.map((message) => (
              <div key={message.id} className={message.role === "user" ? "ml-12" : "mr-7"}>
                <div className={`rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${message.role === "user" ? "rounded-br-md bg-[#1455d9] text-white shadow-[0_12px_22px_rgba(20,85,217,.18)]" : "rounded-tl-md border border-slate-200/80 bg-white text-slate-800"}`}>
                  {message.content.split("\n").map((line, index) => <p key={`${message.id}-${index}`} className={index > 0 ? "mt-2" : undefined}>{line}</p>)}
                </div>
                {message.riskLevel === "sensitive" && <p className="mt-2 flex items-start gap-1.5 text-xs leading-4 text-[#8a5600]"><ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />Нужен е човешки преглед; това не е правен съвет.</p>}
                {message.route && <Link href={message.route.href} onClick={() => setOpen(false)} className="mt-2 inline-flex items-center gap-1.5 rounded-xl bg-[#e8f0ff] px-3 py-2 text-xs font-bold text-[#1449b8] transition hover:bg-[#1449b8] hover:text-white">{message.route.label}<ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></Link>}
              </div>
            ))}
            {pending && <div className="mr-7 inline-flex items-center gap-2 rounded-2xl rounded-tl-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm"><LoaderCircle className="h-4 w-4 animate-spin text-[#2563eb]" aria-hidden="true" />Сравни AI подготвя най-подходящия маршрут…</div>}
            {error && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs leading-5 text-rose-700">{error}</p>}
          </div>

          <div className="border-t border-slate-200 bg-white p-3.5">
            {messages.length === 1 && <div className="mb-3 flex gap-2 overflow-x-auto pb-1">{PLATFORM_ASSISTANT_QUICK_PROMPTS.map((prompt) => <button key={prompt} type="button" onClick={() => void sendMessage(prompt)} disabled={pending} className="shrink-0 rounded-full border border-[#cfe0ff] bg-[#f5f8ff] px-3 py-2 text-left text-xs leading-4 text-[#315284] transition hover:border-[#2563eb] hover:bg-[#e7efff] hover:text-[#123b99] disabled:opacity-50">{prompt}</button>)}</div>}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-[#f7f9fe] p-1.5 transition focus-within:border-[#2563eb] focus-within:ring-4 focus-within:ring-[#2563eb]/10">
              <input ref={inputRef} value={draft} onChange={(event) => setDraft(event.target.value)} maxLength={600} disabled={pending} placeholder="Напишете какво Ви трябва…" className="h-10 min-w-0 flex-1 bg-transparent px-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 disabled:opacity-60" aria-label="Вашият въпрос към Илия" />
              <button type="submit" disabled={!draft.trim() || pending} className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1455d9] text-white shadow-[0_7px_16px_rgba(20,85,217,.25)] transition hover:bg-[#0e42b4] active:scale-[.96] disabled:cursor-not-allowed disabled:opacity-45" aria-label="Изпрати"><Send className="h-4 w-4" aria-hidden="true" /></button>
            </form>
            <div className="mt-2.5 flex items-center justify-between gap-2 text-[11px] leading-4 text-slate-400"><span>Само навигация и обща ориентация.</span><button type="button" onClick={resetConversation} className="inline-flex items-center gap-1 font-medium transition hover:text-[#1455d9]"><RotateCcw className="h-3 w-3" aria-hidden="true" />Нова тема</button></div>
          </div>
        </section>
      )}

      <button type="button" onClick={() => setOpen((value) => !value)} className="assistant-launcher group relative flex h-[4.75rem] items-center gap-3 rounded-full border border-white/55 bg-[#061b45] py-2 pl-2 pr-5 text-left text-white shadow-[0_18px_48px_rgba(7,27,66,.38)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(7,27,66,.46)] active:scale-[.98]" aria-expanded={open} aria-controls="platform-assistant-panel">
        <span className="relative grid h-14 w-14 shrink-0 overflow-hidden rounded-full bg-[#103c94] shadow-[0_0_0_6px_rgba(37,99,235,.22)]"><Image src={ORBIT_URL} alt="" width={84} height={84} unoptimized className="assistant-orbit pointer-events-none absolute -inset-4 h-[5.25rem] w-[5.25rem] max-w-none opacity-75" /><Image src={ILIYA_BRAND_IMAGE_URL} alt="" width={185} height={185} unoptimized className="absolute -left-8 -top-5 h-44 w-44 max-w-none object-contain" /><span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[#061b45] bg-emerald-400" /></span>
        <span className="hidden min-w-0 sm:block"><span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-cyan-200"><span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />Илия е онлайн</span><span className="mt-0.5 block text-sm font-semibold">Попитайте Илия</span></span>
        <span className="sm:hidden"><MessageCircle className="h-5 w-5" aria-hidden="true" /></span>
        <ChevronDown className={`ml-0.5 hidden h-4 w-4 text-blue-200 transition sm:block ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
    </div>
  );
}
