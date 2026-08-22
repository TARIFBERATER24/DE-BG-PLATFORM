# Qwen first-contact document-help pilot

## Goal

The pilot uses Groq-hosted `qwen/qwen3.6-27b` to assist an operator with a **first-contact factual draft** after a customer has uploaded a document and written an inquiry. The output is not a customer-facing reply, legal advice, a price comparison, a contract action, or an external submission.

## Operator-controlled workflow

1. A customer voluntarily submits an allowed PDF, JPEG, or PNG and a question through the existing private intake form.
2. The case stays private and is visible only in the protected operator desk.
3. The operator checks the retention deadline and selects **Create first-contact draft** for one non-expired case.
4. The server sends only that operator-confirmed case's document and inquiry to Qwen, with a fixed extraction prompt and structured-output schema.
5. Qwen returns a private draft that the operator must check against the source document before deciding whether to respond.
6. No messaging, workflow trigger, affiliate action, provider contact, contract submission, or legal conclusion is available from the desk.
7. At the seven-day expiry time, download and AI processing stay blocked until the operator explicitly deletes the case and its analysis.

## Minimal input and output

| Item | Included in model request | Stored in private draft | Excluded from model request/output |
|---|---|---|---|
| Customer inquiry | Yes, only when explicitly selected by the operator | Short factual restatement | Inferred personal profile or recommendation |
| Text PDF | Yes, in memory | Document type, dates, amounts, deadlines, uncertainties | Raw text, full document copy |
| JPEG/PNG or scanned PDF | Future Qwen vision pilot only after separate non-personal test | Structured facts only | Raw image or OCR transcript in the case draft |
| Contact data | No | No | Email, address, phone, bank details, identity numbers |

## Required draft fields

The structured draft may include a document classification, a neutral summary, quoted dates and amounts, possible deadlines marked as **requires operator verification**, risk flags for court, seizure, police, termination, or short deadlines, missing information, and a concise list of factual questions for the operator.

The draft must not include instructions to the customer, legal judgments, probability claims, contract recommendations, price comparisons, provider-specific actions, or an action message.

## Security and privacy controls

The model is called only from the server using `GROQ_API_KEY` scoped as a Sensitive Preview-only branch variable. Groq Inference APIs Zero Data Retention must remain enabled. The browser never receives the key and neither document bytes, inquiry text, nor model output are logged by the application.

The current model is a Groq Preview model. It may be evaluated inside this isolated pilot but is not the sole production dependency until the user explicitly accepts that lifecycle risk and the model is suitable for production use.

## Excluded pilot capabilities

The following remain disabled: automatic analysis after upload, n8n, Telegram, email, provider contact, Check24, Tarifvergleich, affiliate submission, scheduling, payment, identity verification, contract signing, and automatic customer replies.
