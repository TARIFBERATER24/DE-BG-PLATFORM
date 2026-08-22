# Groq-backed document-help Preview specification

## Purpose and boundary

This Preview-only implementation produces a factual **operator draft** from an explicitly selected, unexpired demo case. It is not legal, tax, financial, insurance, or contractual advice. It does not send email, Telegram, n8n events, provider enquiries, affiliate submissions, Check24 or Tarifvergleich requests, or any automatic customer response.

The selected model is `openai/gpt-oss-120b` through the server-side Groq Chat Completions endpoint. Groq supports strict JSON-schema output for this model, enabling a bounded case-draft shape rather than free-form workflow instructions.[1]

## Data minimization

The Vercel server reads the private document only after the operator session has been verified and the seven-day expiry check has passed. For this first Groq stage, it extracts **text only in memory** from a text-based PDF. The original PDF, image bytes, case email, and customer question are never included in the Groq request.

Scanned PDFs, JPEG, and PNG uploads remain available for manual operator review only. They are intentionally not routed to Groq until a separate, explicitly approved OCR design is added.

The request includes only the extracted document text plus a fixed Bulgarian safety instruction. The response is stored as the existing private case-analysis manifest, with a model label, factual summary, document type, non-sensitive provider name, bounded amounts and dates, urgency, predefined risk flags, and uncertainties. The response never includes raw document text, names, addresses, bank data, identification data, or automated recommended actions.

## Retention and provider controls

The case record has a seven-day `expiresAt` timestamp. The protected download endpoint and the Groq draft endpoint both reject expired cases. The operator desk displays the deadline and offers explicit irreversible deletion of the document, case manifest, and analysis manifest.

Groq **Inference APIs Zero Data Retention** is enabled for the organization before this path is used. The design uses only the inference chat-completions endpoint, never batch processing or fine-tuning. Groq documents that Zero Data Retention prevents inference inputs and outputs from being retained for reliability and abuse monitoring; usage metadata remains separate.[2]

## Required Preview-only configuration

| Variable | Scope | Purpose |
|---|---|---|
| `GROQ_API_KEY` | Sensitive; Preview; `demo/document-help-intake` only | Server-side key for the direct Groq request. Never exposed to the browser, source code, or chat. |
| `DOCUMENT_HELP_AI_MODEL` | Preview; `demo/document-help-intake` only; optional | Defaults to `openai/gpt-oss-120b`. |

`GEMINI_API_KEY` is not used by this flow. It may remain stored for a separately approved experiment, but must not be read by the document-help code.

## Operator workflow

1. A user uploads an allowed document and creates a private case.
2. The operator opens the protected desk and checks the case and retention deadline.
3. For a non-expired, text-based PDF, the operator selects **Create AI draft** and confirms the disclosure.
4. The server sends only in-memory extracted text to Groq and writes the structured private draft.
5. The operator reviews the original document and draft; no external action becomes available.
6. The operator deletes the case manually, or the case stays blocked after expiry pending operator deletion in this Preview retention mode.

## References

[1] [Groq Structured Outputs](https://console.groq.com/docs/structured-outputs)

[2] [Your Data in GroqCloud](https://console.groq.com/docs/your-data)
