"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { featuredIntents, matchGoal } from "@/lib/intents";
import { SearchIcon } from "@/components/icons";
import { trackEvent } from "@/lib/analytics";

const WHATSAPP_URL = "https://wa.me/message/JXXTA3JHKDX3L1";

/**
 * Goal-based entry point. The user types what they want and we route them to the page
 * that handles it.
 *
 * Deliberately NOT presented as a working AI chat: the matching is a deterministic
 * keyword lookup (lib/intents.ts) over pages that actually exist. When nothing matches
 * we say so and offer real alternatives (guide, comparisons, human help on WhatsApp)
 * instead of inventing an answer. See the honesty rules in AI_BUILDER_SKILL.md.
 */
export default function GoalRouter() {
  const [query, setQuery] = useState("");
  const [missed, setMissed] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const match = matchGoal(query);
    trackEvent("homepage_goal_submitted", { matched: Boolean(match) });

    if (!match) {
      setMissed(true);
      return;
    }

    setMissed(false);
    router.push(match.kind === "intent" ? match.intent.href : match.entry.href);
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="relative">
        <label htmlFor="goal-input" className="sr-only">
          С какво можем да ти помогнем?
        </label>
        {/* Icon is positioned against the input, not the form: on mobile the submit
            button stacks below, so a form-relative icon would land between them. */}
        <div className="relative">
          <SearchIcon
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-subtle sm:left-5"
            aria-hidden="true"
          />
          <input
            id="goal-input"
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              if (missed) setMissed(false);
            }}
            placeholder="С какво можем да ти помогнем?"
            autoComplete="off"
            className="w-full rounded-2xl border border-white/15 bg-white py-4 pl-12 pr-4 text-base text-ink shadow-lg outline-none placeholder:text-ink-subtle sm:rounded-full sm:py-5 sm:pl-14 sm:pr-40 sm:text-lg"
          />
        </div>
        <button
          type="submit"
          className="mt-3 w-full rounded-full bg-brand px-6 py-3.5 text-sm font-bold text-on-brand transition-colors hover:bg-brand-hover sm:absolute sm:right-2 sm:top-1/2 sm:mt-0 sm:w-auto sm:-translate-y-1/2 sm:py-3"
        >
          Насочи ме
        </button>
      </form>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {featuredIntents.map((intent) => (
          <Link
            key={intent.id}
            href={intent.href}
            className="rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-medium text-white/85 transition hover:border-white/40 hover:bg-white/15 sm:text-sm"
          >
            {intent.label}
            {intent.upcoming ? (
              <span className="ml-1.5 text-[0.65rem] uppercase tracking-wide text-white/50">
                скоро
              </span>
            ) : null}
          </Link>
        ))}
      </div>

      {missed ? (
        <p
          role="status"
          className="mt-4 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white/85"
        >
          Не намерихме подходяща страница за това. Опитай с по-конкретна дума
          (например „ток“, „договор“, „Anmeldung“), разгледай{" "}
          <Link href="/germaniya" className="font-semibold underline underline-offset-2">
            водача за Германия
          </Link>{" "}
          или{" "}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-2"
            onClick={() => trackEvent("homepage_help_clicked", { source: "goal_router" })}
          >
            питай човек в WhatsApp
          </a>
          .
        </p>
      ) : null}
    </div>
  );
}
