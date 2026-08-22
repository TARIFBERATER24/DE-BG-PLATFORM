// Style reminder: an explicit, server-side Qwen → GPT OSS operator pipeline; no automatic message, CRM write, legal advice, or external delivery.
import "server-only";

import { get } from "@vercel/blob";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.js";
import { isDocumentHelpAIConfigured } from "@/lib/document-help-ai-config";
import { getDocumentHelpCase, getDocumentHelpStorageAuthOptions, isDocumentHelpCaseExpired, saveDocumentHelpCaseAnalysis, type DocumentHelpAiDraft } from "@/lib/document-help-storage";
import { saveDocumentHelpPilotPipeline, type DocumentHelpPilotPipeline, type PilotDecision, type PilotReview } from "@/lib/document-help-pipeline";

const GROQ_CHAT_COMPLETIONS_URL = "https://api.groq.com/openai/v1/chat/completions";
const QWEN_MODEL = "qwen/qwen3.6-27b";
const REVIEW_MODEL = "openai/gpt-oss-120b";
const DECISION_MODEL = "openai/gpt-oss-20b";
const MAXIMUM_DOCUMENT_TEXT = 28_000;
const RISK_FLAGS = ["mahnung", "kuendigung", "vollstreckung", "court-letter", "police", "short-deadline"] as const;
const SERVICE_TYPES = ["electricity", "gas", "internet", "mobile", "insurance", "other", "unknown"] as const;
const URGENCY_LEVELS = ["none", "review-soon", "urgent-human-review"] as const;

function limitedText(value: unknown, maximum: number) {
  return typeof value === "string" ? value.trim().slice(0, maximum) : "";
}

function enumValue<T extends readonly string[]>(value: unknown, allowed: T, fallback: T[number]) {
  return typeof value === "string" && allowed.includes(value) ? value as T[number] : fallback;
}

function strings(value: unknown, maximumItems: number, maximumLength: number) {
  return Array.isArray(value) ? value.map((item) => limitedText(item, maximumLength)).filter(Boolean).slice(0, maximumItems) : [];
}

function normalizeExtraction(value: unknown, model: string): DocumentHelpAiDraft {
  const raw = value && typeof value === "object" ? value as Record<string, unknown> : {};
  const rawAmounts = Array.isArray(raw.amounts) ? raw.amounts : [];
  const rawDates = Array.isArray(raw.dates) ? raw.dates : [];
  const rawFlags = Array.isArray(raw.riskFlags) ? raw.riskFlags : [];
  return {
    extractedAt: new Date().toISOString(),
    model,
    summaryBg: limitedText(raw.summaryBg, 1200) || "Не беше създадено надеждно резюме. Прегледайте оригиналния файл.",
    documentKind: limitedText(raw.documentKind, 160) || "Неустановен вид документ",
    providerName: limitedText(raw.providerName, 160) || null,
    serviceType: enumValue(raw.serviceType, SERVICE_TYPES, "unknown"),
    amounts: rawAmounts.map((item) => {
      const amount = item && typeof item === "object" ? item as Record<string, unknown> : {};
      return { label: limitedText(amount.label, 80), value: limitedText(amount.value, 80), currency: limitedText(amount.currency, 8) };
    }).filter((item) => item.label && item.value).slice(0, 4),
    dates: rawDates.map((item) => {
      const date = item && typeof item === "object" ? item as Record<string, unknown> : {};
      return { label: limitedText(date.label, 80), date: limitedText(date.date, 10) };
    }).filter((item) => item.label && /^\d{4}-\d{2}-\d{2}$/.test(item.date)).slice(0, 4),
    urgency: enumValue(raw.urgency, URGENCY_LEVELS, "review-soon"),
    riskFlags: rawFlags.filter((item): item is (typeof RISK_FLAGS)[number] => typeof item === "string" && RISK_FLAGS.includes(item as (typeof RISK_FLAGS)[number])).slice(0, 6),
    uncertainties: strings(raw.uncertainties, 6, 220),
  };
}

function normalizeReview(value: unknown, model: string): PilotReview {
  const raw = value && typeof value === "object" ? value as Record<string, unknown> : {};
  return {
    reviewedAt: new Date().toISOString(),
    model,
    classification: enumValue(raw.classification, ["human-review", "missing-information", "urgent-review", "manual-routing"] as const, "human-review"),
    confidence: enumValue(raw.confidence, ["low", "medium", "high"] as const, "low"),
    checks: strings(raw.checks, 6, 180),
    conflicts: strings(raw.conflicts, 5, 180),
    missingInformation: strings(raw.missingInformation, 5, 180),
  };
}

function normalizeDecision(value: unknown, model: string): PilotDecision {
  const raw = value && typeof value === "object" ? value as Record<string, unknown> : {};
  const allowedTools = Array.isArray(raw.allowedTools)
    ? raw.allowedTools.filter((tool): tool is "n8n-webhook" | "crm-record" => tool === "n8n-webhook" || tool === "crm-record").slice(0, 2)
    : [];
  return {
    decidedAt: new Date().toISOString(),
    model,
    decision: enumValue(raw.decision, ["operator-review", "ask-for-information", "approval-gated-handoff"] as const, "operator-review"),
    allowedTools,
    requiresHumanApproval: true,
    rationale: limitedText(raw.rationale, 320) || "Изисква се човешки преглед преди следваща стъпка.",
  };
}

const extractionSchema = {
  type: "object", properties: {
    summaryBg: { type: "string" }, documentKind: { type: "string" }, providerName: { type: "string" },
    serviceType: { type: "string", enum: [...SERVICE_TYPES] },
    amounts: { type: "array", items: { type: "object", properties: { label: { type: "string" }, value: { type: "string" }, currency: { type: "string" } }, required: ["label", "value", "currency"], additionalProperties: false } },
    dates: { type: "array", items: { type: "object", properties: { label: { type: "string" }, date: { type: "string" } }, required: ["label", "date"], additionalProperties: false } },
    urgency: { type: "string", enum: [...URGENCY_LEVELS] }, riskFlags: { type: "array", items: { type: "string", enum: [...RISK_FLAGS] } }, uncertainties: { type: "array", items: { type: "string" } },
  },
  required: ["summaryBg", "documentKind", "providerName", "serviceType", "amounts", "dates", "urgency", "riskFlags", "uncertainties"], additionalProperties: false,
} as const;

const reviewSchema = {
  type: "object", properties: {
    classification: { type: "string", enum: ["human-review", "missing-information", "urgent-review", "manual-routing"] },
    confidence: { type: "string", enum: ["low", "medium", "high"] }, checks: { type: "array", items: { type: "string" } }, conflicts: { type: "array", items: { type: "string" } }, missingInformation: { type: "array", items: { type: "string" } },
  }, required: ["classification", "confidence", "checks", "conflicts", "missingInformation"], additionalProperties: false,
} as const;

const decisionSchema = {
  type: "object", properties: {
    decision: { type: "string", enum: ["operator-review", "ask-for-information", "approval-gated-handoff"] },
    allowedTools: { type: "array", items: { type: "string", enum: ["n8n-webhook", "crm-record"] } },
    rationale: { type: "string" },
  }, required: ["decision", "allowedTools", "rationale"], additionalProperties: false,
} as const;

function extractionPrompt() {
  return "Ти си Qwen в частен операторски пилот за българска платформа в Германия. Извлечи само проверими факти от документа и въпроса на клиента. Пиши на български. Не давай правен, финансов, договорен или потребителски съвет; не препоръчвай действие; не измисляй данни; не повтаряй имена, email, адреси, банкови данни или целия документ. Маркирай рискови думи и неясноти. Върни единствено JSON по схемата.";
}

function reviewPrompt() {
  return "Ти си GPT OSS 120B за вътрешна проверка на структурирани факти. Сравни Qwen извличането с въпроса на клиента. Класифицирай само нуждата от човешки преглед, липсваща информация, спешност или ръчно насочване. Не давай правен съвет, отговор до клиент, препоръка или външно действие. Върни единствено JSON.";
}

function decisionPrompt() {
  return "Ти си GPT OSS 20B за решение за инструмент в безопасен вътрешен pipeline. Разрешени са само операторски преглед, заявка за допълнителна информация или handoff, който задължително чака човек. Никога не изпращай нищо и никога не активирай n8n или CRM самостоятелно. Върни единствено JSON.";
}

function outputText(body: unknown) {
  const raw = body && typeof body === "object" ? body as Record<string, unknown> : {};
  const choices = Array.isArray(raw.choices) ? raw.choices : [];
  const choice = choices[0] && typeof choices[0] === "object" ? choices[0] as Record<string, unknown> : {};
  const message = choice.message && typeof choice.message === "object" ? choice.message as Record<string, unknown> : {};
  if (typeof message.content !== "string" || !message.content.trim()) throw new Error("Groq не върна структурирани данни.");
  return message.content;
}

async function requestGroq(model: string, system: string, user: unknown, schema: object, schemaName: string, outputMode: "json-object" | "strict-schema" = "strict-schema") {
  const responseFormat = outputMode === "json-object"
    ? { type: "json_object" }
    : { type: "json_schema", json_schema: { name: schemaName, strict: true, schema } };
  const response = await fetch(GROQ_CHAT_COMPLETIONS_URL, {
    method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.GROQ_API_KEY!}` },
    body: JSON.stringify({ model, messages: [{ role: "system", content: system }, { role: "user", content: user }], response_format: responseFormat }), cache: "no-store",
  });
  if (!response.ok) {
    const responseText = await response.text();
    let providerMessage = "";
    try {
      const providerError = JSON.parse(responseText) as { error?: { message?: unknown; code?: unknown; type?: unknown } };
      const error = providerError.error;
      providerMessage = [error?.type, error?.code, typeof error?.message === "string" ? error.message.slice(0, 240) : ""].filter(Boolean).join(" | ");
    } catch {
      providerMessage = responseText.slice(0, 240);
    }
    console.error("Document-help Groq request failed", { status: response.status, model, providerMessage });
    throw new Error("Groq анализът не е наличен. Проверете отделния Preview ключ.");
  }
  return JSON.parse(outputText(await response.json())) as unknown;
}

async function extractPdfText(bytes: Buffer) {
  const document = await pdfjs.getDocument({ data: new Uint8Array(bytes) }).promise;
  try {
    const pages: string[] = [];
    for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
      const page = await document.getPage(pageNumber);
      const content = await page.getTextContent();
      pages.push(content.items.map((item) => "str" in item ? item.str : "").join(" "));
    }
    const text = pages.join(" ").replace(/\s+/g, " ").trim();
    if (!text) throw new Error("Този PDF няма извличаем текст. Сканиран PDF се обработва след отделен vision тест.");
    return text.slice(0, MAXIMUM_DOCUMENT_TEXT);
  } finally { await document.destroy(); }
}

export async function runDocumentHelpPilotPipeline(caseId: string) {
  if (!isDocumentHelpAIConfigured()) throw new Error("Groq анализът не е конфигуриран за Preview.");
  const record = await getDocumentHelpCase(caseId);
  if (!record) throw new Error("Заявката не е намерена.");
  if (isDocumentHelpCaseExpired(record)) throw new Error("Срокът за съхранение е изтекъл. Изтрийте заявката.");
  const auth = getDocumentHelpStorageAuthOptions();
  if (!auth) throw new Error("Частното хранилище не е налично.");
  const stored = await get(record.document.pathname, { access: "private", useCache: false, ...auth });
  if (!stored || stored.statusCode !== 200) throw new Error("Документът не е намерен.");
  const bytes = Buffer.from(await new Response(stored.stream).arrayBuffer());
  if (bytes.length === 0 || bytes.length > 10 * 1024 * 1024) throw new Error("Невалиден размер на документ за анализ.");

  const qwenModel = process.env.DOCUMENT_HELP_QWEN_MODEL?.trim() || QWEN_MODEL;
  const reviewModel = process.env.DOCUMENT_HELP_REVIEW_MODEL?.trim() || REVIEW_MODEL;
  const decisionModel = process.env.DOCUMENT_HELP_DECISION_MODEL?.trim() || DECISION_MODEL;
  const documentContent = record.document.contentType === "application/pdf"
    ? `Текст от документа:\n${await extractPdfText(bytes)}`
    : [{ type: "text", text: "Извлечи факти само от изображението." }, { type: "image_url", image_url: { url: `data:${record.document.contentType};base64,${bytes.toString("base64")}` } }];
  const extractionRaw = await requestGroq(qwenModel, extractionPrompt(), record.document.contentType === "application/pdf"
    ? `${documentContent}\n\nВъпрос на клиента:\n${record.question}`
    : [{ type: "text", text: `Въпрос на клиента:\n${record.question}` }, ...documentContent], extractionSchema, "qwen_first_contact_extraction", "json-object");
  const extraction = normalizeExtraction(extractionRaw, qwenModel);
  const reviewRaw = await requestGroq(reviewModel, reviewPrompt(), JSON.stringify({ customerQuestion: record.question, qwenExtraction: extraction }), reviewSchema, "gpt_oss_review");
  const review = normalizeReview(reviewRaw, reviewModel);
  const decisionRaw = await requestGroq(decisionModel, decisionPrompt(), JSON.stringify({ qwenExtraction: extraction, review }), decisionSchema, "gpt_oss_tool_decision");
  const decision = normalizeDecision(decisionRaw, decisionModel);
  const pipeline: DocumentHelpPilotPipeline = {
    caseId, updatedAt: new Date().toISOString(), qwenState: "completed", reviewState: "completed", decisionState: "completed", review, decision,
    handoff: { state: process.env.N8N_PILOT_WEBHOOK_URL ? "awaiting-human-approval" : "not-configured", externalDeliveryEnabled: false, note: process.env.N8N_PILOT_WEBHOOK_URL ? "Handoff е наличен само след отделно човешко потвърждение." : "n8n/CRM не са конфигурирани; не се изпращат данни." },
  };
  await saveDocumentHelpCaseAnalysis(caseId, extraction);
  await saveDocumentHelpPilotPipeline(caseId, pipeline);
  return { extraction, pipeline };
}

export async function createDocumentHelpAIDraft(caseId: string) {
  return (await runDocumentHelpPilotPipeline(caseId)).extraction;
}
