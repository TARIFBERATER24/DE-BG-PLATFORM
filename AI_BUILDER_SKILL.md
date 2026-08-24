# AI_BUILDER_SKILL.md

**Mandatory reading before implementing any feature in this repository.**

## Purpose

This repository contains a modular platform for Bulgarians living in Germany.

The platform is not only a tariff comparison website. Its long-term goal is to become a
digital operating system for life in Germany.

Core areas include:

- AI assistance
- document intelligence
- contract management
- deadlines and reminders
- German administrative assistance
- tariff comparison
- financial products
- insurance
- credit
- tax preparation
- useful tools and workflows

## Mandatory rules

Before implementing any feature:

1. Read this file.
2. Read [`/docs/MASTER_ARCHITECTURE.md`](docs/MASTER_ARCHITECTURE.md).
3. Inspect existing code before creating replacements.
4. Reuse the existing stack.
5. Reuse existing authentication.
6. Reuse existing database infrastructure.
7. Reuse existing design components where appropriate.
8. Never create duplicate auth, document, notification or user-profile systems.
9. Never expose secrets in frontend code.
10. Never modify unrelated functionality unless technically necessary.
11. Develop large features modularly.
12. Preserve backward compatibility where practical.
13. Bulgarian is the primary user-facing language.
14. German terminology may be used where it improves understanding.
15. Mobile-first UX is mandatory.
16. All private user data must remain scoped to the authenticated user.
17. Explicit user consent is required before sharing documents or extracted data with
    external providers.
18. AI must not fabricate missing information.
19. Distinguish extracted facts from generated explanations.
20. Run build/typecheck/lint before declaring work complete.

## Current stack (verified, do not migrate)

| Concern | Actual state |
|---|---|
| Framework | Next.js 16.3.1, App Router, Turbopack |
| Language | TypeScript (`strict: true`), React 19.2.8 |
| Styling | Tailwind v4 via `@theme inline` in `app/globals.css` |
| Package manager | npm |
| Fonts | Inter (`next/font/google`), `latin` + `cyrillic` subsets |
| Icons | `components/icons.tsx` (custom inline SVG) + `lucide-react` |
| Authentication | **Does not exist yet** |
| Database / Supabase | **Does not exist yet** — placeholders only in `.env.example` |
| Analytics provider | **Does not exist yet** — see `lib/analytics.ts` for the neutral event layer |
| API routes | `app/go/[network]/[slug]/route.ts` (affiliate redirect) only |

When a rule above refers to "existing authentication" or "existing database", and the
table says it does not exist, the correct action is to **ask before introducing one** —
not to silently add a new dependency.

## Commands

```bash
npm run build     # production build; also runs TypeScript
npx tsc --noEmit  # typecheck only (no dedicated npm script exists)
npm run lint      # eslint
```

There is no test suite yet. Do not claim tests passed.

## Design authority

[`DESIGN.md`](DESIGN.md) is the visual contract and takes precedence over improvised
styling. Its anti-patterns are binding — in particular: no indigo/violet accent, brand
blue is action-only, cards only for interactive containers or real alerts, no fake
urgency, and **no calculator or AI UI without real logic behind it**.

## Honesty rules for AI-facing surfaces

These are product requirements, not stylistic preferences:

- Never present an unbuilt capability as if it is live.
- A feature that is planned must be visibly labelled as upcoming.
- Never fabricate document facts, savings figures, testimonials or provider data.
- Always separate what was extracted from a document from what was generated as an
  explanation.
- Never claim legal, tax or regulated financial advice. Use "помощ, информация и
  насочване".
