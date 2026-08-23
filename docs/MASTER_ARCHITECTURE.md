# DE-BG PLATFORM — MASTER ARCHITECTURE

## Product mission

Create a highly useful digital platform that solves recurring problems experienced by
Bulgarians living in Germany.

The platform should help users:

- understand German documents
- manage contracts
- remember deadlines
- navigate German administration
- reduce recurring expenses
- access relevant services
- interact with AI in Bulgarian
- progressively build a trusted personal workspace

---

## CORE LAYERS

### 1. FREE UTILITY LAYER

Primary acquisition layer.

Examples:

- AI document explanation
- German letter generator
- Kündigung assistant
- Germany guides
- calculators
- tariff comparison
- basic AI assistant

**Built today:** Germany guides (`/germaniya/*`), tariff comparison
(`/energiya-telekom/*`, `/zastrahovki/*`, `/finansi/*`), the indicative Kfz estimator
(`components/KfzEstimator.tsx`), and the goal router on the homepage.

### 2. MEIN DEUTSCHLAND

Personal AI workspace.

Future core capabilities:

- AI Intelligence Document Vault
- AI Document Understanding
- Contract Intelligence
- important dates
- alerts
- user profile
- AI assistant
- personal administrative memory

**Built today:** concept page only (`/mein-deutschland`). No storage, no AI, no auth.

### 3. SERVICE LAYER

Individual service workflows can reuse shared user data only after permission.

Future examples:

- Kredit
- Steuer
- Strom
- Gas
- Internet
- Mobilfunk
- Versicherungen
- Banking
- Umzug

Example workflow:

```
USER INTENT
   ↓
AI understands goal
   ↓
Determine required information
   ↓
Check permitted Vault/Profile data
   ↓
Identify missing information
   ↓
Request missing data
   ↓
Show exactly what will be shared
   ↓
USER CONFIRMATION
   ↓
External provider/service
```

### 4. MONETIZATION LAYER

Possible monetization:

- affiliate revenue
- qualified leads
- subscriptions
- paid workflows
- partner services
- human support
- future professional services

**Never sacrifice trust for conversion.**

---

## SHARED PLATFORM INFRASTRUCTURE

Use one shared system for:

- authentication
- user profiles
- document storage
- document metadata
- contracts
- deadlines
- notifications
- consent
- AI orchestration
- analytics
- design system

Never recreate these systems independently for every feature.

**Current reality:** only the design system (`DESIGN.md` + `app/globals.css`) and a
neutral analytics event layer (`lib/analytics.ts`) exist. Everything else in this list is
unbuilt. The first feature that genuinely needs auth or storage should introduce it once,
centrally, and every later feature must reuse it.

---

## AI ARCHITECTURE

Conceptually:

```
                 AI ORCHESTRATOR
                       │
       ┌───────────────┼────────────────┐
       │               │                │
 DOCUMENT         CONTRACT        GERMANY
 INTELLIGENCE     INTELLIGENCE    KNOWLEDGE
       │               │                │
       └───────────────┼────────────────┘
                       │
                 USER CONTEXT
                       │
               SERVICE WORKFLOWS
```

AI outputs must distinguish:

- document facts
- inferred classification
- generated explanation
- recommendations
- uncertainty

**Never invent document facts.**

---

## DATA MODEL PRINCIPLE

Future conceptual entities may include:

```
users
profiles
documents
document_metadata
document_chunks
contracts
deadlines
alerts
service_requests
permissions
provider_connections
audit_events
```

Do not create these automatically unless required. Inspect the existing schema first.

**Current reality:** there is no database and no schema. `lib/click-log.ts` writes
affiliate clicks to the console and is the designated seam for the first real persistence
layer.

---

## SECURITY PRINCIPLES

The platform may handle highly sensitive data.

Mandatory principles:

- authenticated private areas
- secure transport
- protected storage
- user-level authorization
- no public access to private files
- environment variables for secrets
- signed/temporary document access where appropriate
- data deletion capability
- data export capability
- minimal data collection
- explicit third-party sharing consent
- no cross-user data leakage

---

## DEVELOPMENT MODEL

Prefer one primary repository.

Large features should use feature branches such as:

```
feature/new-homepage
feature/mein-deutschland
feature/document-vault
feature/kredit-assistant
```

Development flow:

```
feature branch
→ implementation
→ build
→ typecheck/lint/tests
→ preview
→ review
→ merge
```

---

## MODULE STANDARD

Every feature should define:

- user problem
- entry point
- inputs
- processing
- outputs
- next action
- monetization opportunity
- security implications
- analytics events

Use [`FEATURE_TEMPLATE.md`](FEATURE_TEMPLATE.md) to capture these before writing code.

---

## UX PRINCIPLE

Prefer goal-based interaction.

Examples:

```
"Не разбирам това писмо."
"Искам кредит."
"Искам по-евтин ток."
"Премествам се."
"Намери договора ми с Vodafone."
```

The platform should route the user toward the correct workflow instead of forcing them
through complex menus.

**Implemented as:** `lib/intents.ts` + `components/home/GoalRouter.tsx` — a real
keyword-to-route matcher over pages that actually exist. It routes; it does not pretend to
reason. When a real AI orchestrator ships, it replaces the matcher behind the same entry
point.

---

## ROUTE MAP (current)

| Route | Purpose | State |
|---|---|---|
| `/` | Platform homepage, goal-based entry | live |
| `/produkte` | Full comparison / savings hub (former homepage) | live |
| `/mein-deutschland` | Personal AI workspace | concept page only |
| `/germaniya` + `/germaniya/*` | Germany A–Z guides | live |
| `/uslugi` + `/uslugi/*` | Paid human services | live, flag-gated |
| `/energiya-telekom/*` | Strom, Gas, Internet, Mobilfunk comparison | live |
| `/zastrahovki/*` | Insurance guides + Kfz estimator | live, information mode |
| `/finansi/*` | Girokonto, Kredit, Kreditkarte | live, CTA flag-gated |
| `/go/[network]/[slug]` | Affiliate redirect + click log | live |
| `/impressum`, `/poveritelnost`, `/za-nas` | Legal / disclosure | live |
