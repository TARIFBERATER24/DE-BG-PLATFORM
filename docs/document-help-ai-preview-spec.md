# AI extraction preview — scope and safeguards

## Purpose

This Preview-only stage adds an **operator-triggered extraction draft** for a private document
already stored in the document-help demo. The draft helps the operator find basic facts and
possible deadlines more quickly. It is not an automated decision, a recommendation to the
customer, a legal opinion, or an instruction to take action.

## Processing boundary

The operator must explicitly start extraction from the protected case desk. The application
will then send the selected document only to the approved server-side AI provider. The client
browser never receives a model credential or a direct document URL. No job starts on upload,
no background processing is enabled, and an expired case cannot be sent for extraction.

| Permitted in this stage | Explicitly excluded in this stage |
|---|---|
| Operator-triggered fact extraction | Automatic processing on upload |
| Bulgarian operator-facing summary | Customer-facing legal, financial, or contractual advice |
| Possible dates and urgency flags with uncertainty | Submitting data to Check24, Tarifvergleich, providers, or other third parties |
| Manual operator review, download, and deletion | Email, Telegram, n8n, webhooks, or any external notification |

## Seven-day Preview retention

Every newly uploaded case receives `expiresAt = createdAt + 7 calendar days`. In this
Preview-only choice, expiry is **operator-enforced**, not background-automated: the desk marks
the case as expired, blocks document download and AI extraction, and exposes only an explicit
operator deletion action. The document, case manifest, and any AI draft are deleted together.

> A case marked expired must never be reactivated, analysed, downloaded, or sent elsewhere.

## Minimal extraction schema

The extraction result is a small structured draft stored privately beside the existing case
manifest. The system must not retain full OCR text, a customer name, bank details, IDs, or
unnecessary address information in the draft.

| Field | Description | Retained? |
|---|---|---|
| `summaryBg` | Short Bulgarian description of what the document appears to say | Yes, until case deletion |
| `documentKind` | Inferred non-binding document category | Yes |
| `providerName` | Supplier or issuer, only when clearly present | Yes |
| `serviceType` | Electricity, gas, internet, mobile, insurance, other, or unknown | Yes |
| `amounts` | Up to three clearly labelled totals with currency and source label | Yes |
| `dates` | Up to three dates with label and ISO date only when confident | Yes |
| `urgency` | `none`, `review-soon`, or `urgent-human-review` | Yes |
| `riskFlags` | Limited non-diagnostic tags such as `mahnung`, `kuendigung`, `vollstreckung`, `court-letter`, `police`, or `short-deadline` | Yes |
| `uncertainties` | Missing, ambiguous, or unreadable points | Yes |
| `extractedAt` | Server-side timestamp | Yes |
| `model` | Model identifier for auditability | Yes |

## Mandatory output language and wording

The result must be in Bulgarian, state when information is uncertain, and use phrasing such as
“изглежда, че”, “проверете с човек”, and “възможен срок”. It must never assert that a customer
has a legal obligation, must take a particular legal step, or should sign/cancel/pay anything.
For court, enforcement, seizure, police, termination, or short-deadline indicators, the output
must display: **“Не е правен съвет. Потърсете квалифициран специалист или официалния подател
възможно най-скоро.”**

## Validation before accepting customer documents

Only non-personal fixtures may be used to test the feature. Acceptance requires a valid
structured result, an operator-only display, no result after expiry, no public Blob URL,
successful deletion of the document, case manifest, and AI-draft object as one unit, and no
network action beyond the explicitly approved AI provider.
