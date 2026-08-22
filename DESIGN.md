# DESIGN.md

Visual contract for Сравни.де. Built via the `refero-design` methodology (bundled craft
references + direct research, since live Refero MCP was unavailable this session — see
"Refero Reference Lock" below for exactly what was researched). This file is the source
of truth for design decisions; update it when a decision changes, don't let code drift
from it silently.

## 1. Product Design Philosophy

**Complex German market. Simple Bulgarian experience.**

Сравни.де is not an online shop and not a generic SaaS product. It is a comparison
platform that must feel as trustworthy as a German neobank while reading entirely in
Bulgarian. The interface's job is to make German tariff bureaucracy legible to someone
who didn't grow up with it — without infantilizing the content or resorting to
salesy/urgency tactics that would undermine the trust the product depends on.

Identity in one line: *feels like your own bank's comparison tool, not like an affiliate
lead-gen site.*

Non-negotiables carried from the skill:
- Every design decision must trace to a reference, this document, or a stated
  constraint — nothing from "vibe memory."
- No fabricated numbers. If we don't have real savings data, we don't show a savings
  figure — see [Comparison Components](#12-comparison-components).
- No dark patterns: no calculator UI without a real calculation behind it, no fake
  urgency, no fake scarcity.

## 2. Refero Reference Lock

Live Refero MCP (`refero_search_styles` / `_screens` / `_flows`) was not connected this
session. Research substitute: direct fetch of real product pages, extracting structure
and UX patterns (not pixels/screenshots).

**Researched:** N26, Wise, Klarna, Linear (fintech/craft angle) · Check24, Verivox
(utility-comparison domain) · Stripe (pricing-card structure).

| Role | Source | What it owns |
|---|---|---|
| **Primary** | N26 | Trust-through-plain-compliance-language (state license/protection facts, don't badge-wall them), tiered pricing ladder, conversational-professional voice, alternating narrative sections instead of generic hero→features→pricing→FAQ |
| **Secondary** | Wise | Inline calculator pattern: input → immediate result in place, no page navigation. Model for the future comparison-results screen |
| **Secondary** | Linear | Cards reserved for discrete structured data only (never narrative); macro-to-micro type scale for hierarchy |
| **Rejected** | Klarna | B2B-merchant framing — not relevant, we're consumer-only |
| **Rejected** | Check24 / Verivox | Badge-wall trust (too many competing certifications, reads as lead-gen aggregator, not "your own bank") |
| **Rejected** | — | Averaging all sources into one generic "fintech template" look |

**Role rules (do not violate):**
- Brand accent (blue) is CTA/action-only. Never a decorative fill or background wash
  outside of the `brand-tint` callout role.
- Savings figures get their own visual role (`positive` green, Display/financial-number
  scale) — never buried inline like N26 treats regulated interest-rate fine print.
- Cards exist only for (a) a clickable interactive container or (b) a real alert/callout.
  Default is no card — see [Cards](#11-cards).

## 3. Typography

**Font:** Inter (`next/font/google`, `subsets: ["latin", "cyrillic"]`). Verified
Cyrillic-capable — mandatory, see [§18](#18-bulgarian-cyrillic-requirements). One font
family only, per the one-font-rule (multiple weights, no second family without a
justified reason).

**Roles:**

| Role | Size | Weight | Usage |
|---|---|---|---|
| Display | `--text-5xl` (48px) | 600 | Savings hero numbers, top-level marketing hero only |
| H1 | `--text-3xl`/`--text-4xl` (33–40px) | 600 | Page title |
| H2 | `--text-xl`/`--text-2xl` (23–28px) | 600 | Section heading |
| H3 | `--text-lg` (19px) | 600 | Card/subsection heading |
| Body | `--text-base` (16px) | 400 | Paragraph text |
| Small | `--text-sm` (13px) | 400 | Secondary copy, captions |
| Label | `--text-xs` (11px) | 500, `tracking-wide` | Micro-tags ("Реклама"), ALL CAPS if ever used must carry `0.06em+` tracking |
| Financial number | contextual | 600, `.financial-number` util (tabular-nums) | Prices, kWh, contract months — anything that must scan/align instantly |
| Button | `--text-sm` | 500 | CTA label |

Headings use `text-wrap: balance` globally (`globals.css`); body prose uses
`text-wrap: pretty`. Max 6–8 distinct sizes in production — do not introduce a 9th.

## 4. Colors

Purpose-named tokens, wired into Tailwind v4 via `@theme inline` in `globals.css`.
Never hardcode a hex value in a component — use the utility class.

| Token | Utility | Role |
|---|---|---|
| `--canvas` | `bg-canvas` | Page background (white) |
| `--surface` / `--surface-strong` | `bg-surface[-strong]` | Elevated/hover surfaces |
| `--line` / `--line-strong` | `border-line[-strong]` | Borders, dividers |
| `--ink` / `--ink-muted` / `--ink-subtle` | `text-ink[-muted/-subtle]` | Text hierarchy, 3 levels only |
| `--brand` / `-hover` / `-active` / `-tint` | `bg-brand` etc. | **Action-only.** Primary CTA, links |
| `--alert-*` (amber) | `bg-alert-bg`, `border-alert-line`, `text-alert-ink` | Real callouts only (legal-pending notices) |
| `--positive-*` (green) | `bg-positive-bg`, `text-positive` | **Savings figures only.** Not decorative |
| `--danger-*` (red) | `bg-danger-bg`, `text-danger` | Real errors only — not yet used anywhere, reserved |

Rules:
- Never indigo/violet (the universal AI-generated-design tell).
- One primary accent. Semantic colors work in pairs (ink + bg), not solo.
- Light mode only — dark mode was never requested; do not add it speculatively.
- Neutrals are 70–90% of any screen. Accent color stays rare and purposeful.

## 5. Spacing

Derived from the 24px body line-height, per the typography guide's vertical-rhythm rule:

```
--space-xs: 12px   (0.5 × line-height)
--space-sm: 24px   (1 × line-height)
--space-md: 48px   (2 × line-height)
--space-lg: 72px   (3 × line-height)
```

Use Tailwind's standard spacing scale for everything finer-grained than this (padding,
gaps); reach for these tokens specifically for section-level vertical rhythm.

## 6. Grid

Content max-width: `max-w-3xl` (article/single-column pages: category detail, guide,
legal) or `max-w-5xl` (index/grid pages: homepage, vertical listings). Category tile
grids: `grid-cols-1 sm:grid-cols-2` (verticals index) or `sm:grid-cols-3` (homepage
vertical picker). Don't introduce a third max-width without a reason.

## 7. Radius

One scale, used by role, not by whim:

- **Marketing/promotional CTA** (homepage-level, standalone call to action): `rounded-full`.
- **Product/in-content CTA** (tariff comparison button, anything inside a content flow):
  `rounded-md`. This was a correction made in this pass — the site previously used
  `rounded-full` everywhere, which none of N26/Wise/Linear actually do; pill-everywhere
  is a flagged anti-pattern.
- **Cards, notice boxes, containers:** `rounded-lg`.
- **Circular badges** (step numbers, avatars): `rounded-full` — correct use, not a button.

## 8. Shadows

Minimal. `hover:shadow-sm` only, only on interactive card tiles, only on hover — never a
resting-state shadow, never a colored/glowing shadow.

## 9. Buttons

Three tiers, consistently applied:

- **Primary** — `bg-brand text-on-brand`, radius per [§7](#7-radius) role. One per view
  for the main action.
- **Secondary** — outline (`border border-brand text-brand`), same radius rules.
- **Text action** — plain link styling (`text-brand hover:text-brand-hover`), no
  container. Used for "Прочети →", "Виж всички →" navigational links.

No fourth tier. No gradient buttons, no colored shadows on buttons (see [Color
anti-patterns](#20-anti-patterns)).

## 10. Inputs

Not yet built — the site has no live form (see [§12](#12-comparison-components) on why).
When a real form ships (financeAds Tier-B embed or a genuine lead-capture form), it must
follow `references/craft-details.md`: correct `type`/`inputmode`/`autocomplete`, visible
labels sharing the input's hit target, no paste-blocking, inline errors with
`aria-describedby`, `:focus-visible` not `:focus`.

## 11. Cards

**Default is no card.** A card is only justified when it is either:
1. A clickable interactive container (vertical/category tiles), or
2. A real alert/callout (legal-pending notice, `alert-*` tokens).

Non-interactive informational sections (e.g. "Как печелим пари") get a `border-t`
divider and generous spacing instead of a bordered box. This was a correction made in
this pass — see commit history for the before/after.

Consistent card recipe: `rounded-lg border border-line p-6`, `hover:border-brand
hover:shadow-sm` only if clickable.

## 12. Comparison Components

**This is the highest-stakes screen in the product and is not yet built.** The site is
currently Tier A (curated editorial content + outbound affiliate link, no live rate
engine) for energy/telecom, and pending-legal-review for insurance/finance. The
component spec below is forward guidance for when a real Tier-B calculator (financeAds
widget) or first-party comparison exists — do not build a fake version of this now.

**Tariff card fields**, primary-vs-secondary split:

*Always visible:* Provider · Tariff name · Monthly payment · **Estimated savings**
(dominant, Display/financial-number scale, `positive` color) · primary CTA.

*Progressive disclosure (collapsed by default):* Annual cost, bonus, contract duration,
price guarantee, cancellation period, full conditions.

Savings framing: factual, not salesy —

```
СПЕСТЯВАТЕ
420 €
на година
```

— large, tabular, `positive` color, but plain typographic treatment (no starbursts, no
"LIMITED TIME," no aggressive scale beyond what Display-tier already gives it).

**Current-state honesty rule:** never show a "compare now" calculator UI unless there is
a real calculation behind it. A fake form with nowhere real to submit is a dark pattern
this document forbids.

## 13. Navigation

Two-tier: persistent top nav (verticals + guide + about, desktop) collapsing to a
hamburger sheet below `sm:` (640px) — implemented in `Header`/`MobileNav`. Footer repeats
primary links plus the transparency statement. No deep mega-menus; the site's IA doesn't
need them yet.

## 14. Icons

Custom inline SVG (`components/icons.tsx`), stroke-based, 1.6 stroke-width, no filled
icon set mixed in. Never emoji. One icon per vertical (bolt/shield/wallet), reused
consistently between homepage and section headers via `VerticalIcon`.

## 15. Motion

Minimal: `transition-colors` on hover states only (borders, backgrounds, link colors).
No entrance animations, no scroll-triggered reveals — nothing that would read as
"marketing site" over "utility tool." Revisit only if a specific interaction (e.g.
progressive-disclosure expand/collapse in a future tariff card) needs a motion cue for
comprehension, not decoration.

## 16. Responsive Behavior

Mobile-first. Breakpoint: `sm:` (640px) is the only breakpoint currently in use — nav
collapses, grids go from 1 to 2/3 columns. `touch-action: manipulation` is set globally
to kill tap delay. Forward guidance for the future comparison-results screen: stacked
cards, sticky CTA, collapsible detail sections, large touch targets — not needed until
that screen exists.

## 17. Accessibility

- `:focus-visible` (not `:focus`) with a visible outline ring — set globally.
- Semantic elements throughout (`<Link>`/`<a>` for navigation, real `<button>` where
  needed — currently none, all actions are navigational).
- Heading hierarchy respected per page (single `h1`, nested `h2`/`h3`).
- `color-scheme: light` + `theme-color` meta set for correct native control rendering.
- WCAG AA contrast target for all text tokens (3-level ink scale was chosen to hold this
  at every level, including `ink-subtle`).

## 18. Bulgarian Cyrillic Requirements

Mandatory, non-negotiable. Inter's `cyrillic` subset is loaded explicitly
(`app/layout.tsx`). `<html lang="bg">` is set. Any future font change must verify
full Cyrillic coverage (`А Б В Г Д Е Ж З И Й К Л М Н О П Р С Т У Ф Х Ц Ч Ш Щ Ъ Ь Ю Я`)
before adoption — do not trust a font's Latin quality as a proxy for its Cyrillic
quality.

## 19. Financial-Number Formatting

`.financial-number` utility class (`globals.css`): `font-variant-numeric: tabular-nums`,
weight 600, slight negative tracking. Apply to any price, consumption figure, or
duration that needs to scan instantly or align in a list/table (`89,90 €`, `420 €`,
`1.240 kWh`, `24 Monate`). Not yet used anywhere live — reserved for
[§12](#12-comparison-components) when real figures exist. Use `Intl.NumberFormat`/
`Intl.DateTimeFormat` for locale-correct formatting when dynamic values are introduced,
not hand-built string interpolation.

## 20. Anti-Patterns

Do not reintroduce these — each was either caught in this design pass or is explicitly
flagged by the brief:

- Indigo/violet accent color.
- Cards used as default containers instead of sections/dividers.
- Dark mode by default (not requested; light is the baseline).
- Pill-shaped buttons outside the marketing-CTA role ([§7](#7-radius), [§9](#9-buttons)).
- Emoji as icons.
- Decorative left accent stripes without semantic meaning.
- Badge-wall trust signals (Check24/Verivox-style certification overload) — state facts
  plainly instead (N26 pattern).
- Fake urgency, fake scarcity, casino-like visual patterns.
- A calculator/comparison UI with no real calculation behind it.
- Fabricated savings figures not backed by real data.
- Averaging distinct references into one safe, generic "fintech template" look.

## 21. Approved 3D Enhancement Direction — Preview Branch

**Direction name:** *Calm Dimensional Finance.* The interface keeps its white and navy
neobank foundation, but its high-value entry points gain the physical hierarchy of a
well-made financial tool: product tiles rest on shallow plinths, hero imagery appears on
a softly lit stage, and verified information panels lift with restrained depth.

This is deliberately **not** a neon, glassmorphism, or gaming treatment. The existing
Inter typeface, Bulgarian copy, blue action color, actual category links, affiliate paths,
and light-mode policy are preserved. Depth is allowed only on the hero media, clickable
category tiles, and honest data/guide panels. It must remain static on small screens and
for people who prefer reduced motion. The copy layer stays flat and highly legible; 3D is
used to establish navigational hierarchy, not to decorate text.

**Visibility rule:** depth must be immediately legible at rest in the desktop homepage
preview, rather than appearing only after hover. The hero may use a blue perspective grid,
two orbital lines, and a small number of purpose-led floating chips. Cards and data panels
may retain a clear shallow base and neutral cast shadow. These elements must never obscure
the copy or invent data, and the static mobile/reduced-motion fallback remains mandatory.
