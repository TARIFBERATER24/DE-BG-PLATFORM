// Style reminder: Groq receives only bounded PDF text for a private, operator-only factual draft; it never gives legal advice or triggers external actions.
import "server-only";

import { get } from "@vercel/blob";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.js";
import { isDocumentHelpAIConfigured } from "@/lib/document-help-ai-config";
import {
  getDocumentHelpCase,
  getDocumentHelpStorageAuthOptions,
  isDocumentHelpCaseExpired,
  saveDocumentHelpCaseAnalysis,
  type DocumentHelpAiDraft,
} from "@/lib/document-help-storage";

const GROQ_CHAT_COMPLETIONS_URL = "https://api.groq.com/openai/v1/chat/completions";
const FALLBACK_MODEL = "openai/gpt-oss-120b";
const MAXIMUM_GROQ_INPUT_CHARACTERS = 28_000;

const RISK_FLAGS = ["mahnung", "kuendigung", "vollstreckung", "court-letter", "police", "short-deadline"] as const;
const SERVICE_TYPES = ["electricity", "gas", "internet", "mobile", "insurance", "other", "unknown"] as const;
const URGENCY_LEVELS = ["none", "review-soon", "urgent-human-review"] as const;

function limitedText(value: unknown, maximum: number) {
  return typeof value === "string" ? value.trim().slice(0, maximum) : "";
}

function enumValue<T extends readonly string[]>(value: unknown, allowed: T, fallback: T[number]) {
  return typeof value === "string" && allowed.includes(value) ? value as T[number] : fallback;
}

function arrayOfStrings(value: unknown, maximumItems: number, maximumText: number) {
  return Array.isArray(value)
    ? value.map((item) => limitedText(item, maximumText)).filter(Boolean).slice(0, maximumItems)
    : [];
}

function normalizeDraft(value: unknown, model: string): DocumentHelpAiDraft {
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
      return {
        label: limitedText(amount.label, 80),
        value: limitedText(amount.value, 80),
        currency: limitedText(amount.currency, 8),
      };
    }).filter((item) => item.label && item.value).slice(0, 3),
    dates: rawDates.map((item) => {
      const date = item && typeof item === "object" ? item as Record<string, unknown> : {};
      return {
        label: limitedText(date.label, 80),
        date: limitedText(date.date, 10),
      };
    }).filter((item) => item.label && /^\d{4}-\d{2}-\d{2}$/.test(item.date)).slice(0, 3),
    urgency: enumValue(raw.urgency, URGENCY_LEVELS, "review-soon"),
    riskFlags: rawFlags.filter((item): item is (typeof RISK_FLAGS)[number] => typeof item === "string" && RISK_FLAGS.includes(item as (typeof RISK_FLAGS)[number])).slice(0, 6),
    uncertainties: arrayOfStrings(raw.uncertainties, 6, 220),
  };
}

function promptForExtraction() {
  return `Ти подпомагаш само вътрешен оператор на българска платформа в Германия. Анализирай документа като фактическа чернова на български.
Не давай правен, финансов или договорен съвет. Не препоръчвай плащане, подписване, прекратяване или външно действие. Не измисляй липсващи данни. Не включвай име на клиент, адрес, банкова сметка, личен номер или пълен текст на документа.
При Mahnung, Kündigung, Vollstreckung, съдебно писмо, полиция или кратък срок маркирай riskFlags и urgency, но не давай инструкции.
Върни само JSON по предоставената схема. Използвай YYYY-MM-DD само когато датата е ясна.`;
}

const extractionSchema = {
  type: "object",
  properties: {
    summaryBg: { type: "string" },
    documentKind: { type: "string" },
    providerName: { type: "string" },
    serviceType: { type: "string", enum: [...SERVICE_TYPES] },
    amounts: { type: "array", items: { type: "object", properties: { label: { type: "string" }, value: { type: "string" }, currency: { type: "string" } }, required: ["label", "value", "currency"], additionalProperties: false } },
    dates: { type: "array", items: { type: "object", properties: { label: { type: "string" }, date: { type: "string" } }, required: ["label", "date"], additionalProperties: false } },
    urgency: { type: "string", enum: [...URGENCY_LEVELS] },
    riskFlags: { type: "array", items: { type: "string", enum: [...RISK_FLAGS] } },
    uncertainties: { type: "array", items: { type: "string" } },
  },
  required: ["summaryBg", "documentKind", "providerName", "serviceType", "amounts", "dates", "urgency", "riskFlags", "uncertainties"],
  additionalProperties: false,
} as const;

function getGroqOutputText(body: unknown) {
  const raw = body && typeof body === "object" ? body as Record<string, unknown> : {};
  const choices = Array.isArray(raw.choices) ? raw.choices : [];
  const firstChoice = choices[0] && typeof choices[0] === "object" ? choices[0] as Record<string, unknown> : {};
  const message = firstChoice.message && typeof firstChoice.message === "object" ? firstChoice.message as Record<string, unknown> : {};
  if (typeof message.content !== "string" || !message.content.trim()) {
    throw new Error("Groq не върна използваема чернова.");
  }
  return message.content;
}

async function extractPdfText(bytes: Buffer) {
  const document = await pdfjs.getDocument({ data: new Uint8Array(bytes) }).promise;
  try {
    const pages: string[] = [];
    for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
      const page = await document.getPage(pageNumber);
      const content = await page.getTextContent();
      const pageText = content.items
        .map((item) => "str" in item ? item.str : "")
        .join(" ");
      pages.push(pageText);
    }

    const normalized = pages.join(" ").replace(/\s+/g, " ").trim();
    if (!normalized) {
      throw new Error("Този PDF няма извличаем текст. Прегледайте го ръчно; OCR не е активиран.");
    }
    return normalized.slice(0, MAXIMUM_GROQ_INPUT_CHARACTERS);
  } finally {
    await document.destroy();
  }
}

export async function createDocumentHelpAIDraft(caseId: string) {
  if (!isDocumentHelpAIConfigured()) throw new Error("Groq анализът не е конфигуриран за Preview.");
  const record = await getDocumentHelpCase(caseId);
  if (!record) throw new Error("Заявката не е намерена.");
  if (isDocumentHelpCaseExpired(record)) throw new Error("Срокът за съхранение е изтекъл. Изтрийте заявката.");
  if (record.document.contentType !== "application/pdf") {
    throw new Error("Groq Preview поддържа само PDF с извличаем текст. Снимките и сканираните файлове остават за ръчен преглед.");
  }

  const auth = getDocumentHelpStorageAuthOptions();
  if (!auth) throw new Error("Частното хранилище не е налично.");
  const stored = await get(record.document.pathname, { access: "private", useCache: false, ...auth });
  if (!stored || stored.statusCode !== 200) throw new Error("Документът не е намерен.");

  const bytes = Buffer.from(await new Response(stored.stream).arrayBuffer());
  if (bytes.length === 0 || bytes.length > 10 * 1024 * 1024) throw new Error("Невалиден размер на документ за анализ.");

  const extractedText = await extractPdfText(bytes);
  const model = process.env.DOCUMENT_HELP_AI_MODEL?.trim() || FALLBACK_MODEL;
  const response = await fetch(GROQ_CHAT_COMPLETIONS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY!}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: promptForExtraction() },
        { role: "user", content: `Текст от документа за фактическа чернова:\n\n${extractedText}` },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "document_help_operator_draft",
          strict: true,
          schema: extractionSchema,
        },
      },
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("Document-help Groq request failed", { status: response.status, caseId });
    throw new Error("Groq анализът не е наличен. Опитайте по-късно.");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(getGroqOutputText(await response.json()));
  } catch {
    throw new Error("Groq анализът върна невалидна чернова. Опитайте отново.");
  }

  const draft = normalizeDraft(parsed, model);
  await saveDocumentHelpCaseAnalysis(caseId, draft);
  return draft;
}
