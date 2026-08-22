# Document-help pilot verification

## Scope

This record concerns only the deliberately non-personal storage fixture created for Preview validation. No customer document, contact information, or document text is reproduced here.

## Completed check

On 22 August 2026, the protected Preview operator desk completed the explicit, operator-confirmed staged run for fixture case `16b0a4d3-7e63-4595-8d75-6b7d4f5c9a12`.

| Stage | Model | Result |
|---|---|---|
| Factual extraction | `qwen/qwen3.6-27b` | Private operator draft saved |
| Review and classification | `openai/gpt-oss-120b` | Private structured review saved |
| Tool decision | `openai/gpt-oss-20b` | `operator-review` decision saved |
| External handoff | n8n / CRM | Not configured; no webhook, CRM write, message, provider action, or affiliate action ran |

## Safeguards confirmed

The desk showed a seven-day case expiry, the three completed internal stages, and an explicit statement that n8n and CRM are not configured. The pipeline remains operator-triggered and private. The fixture must be explicitly deleted from the operator desk before personal documents are accepted.
