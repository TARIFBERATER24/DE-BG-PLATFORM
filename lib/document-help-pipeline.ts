// Style reminder: private, operator-only pipeline records; external delivery is approval-gated and disabled unless explicitly configured.
import "server-only";

import { get, put } from "@vercel/blob";
import { getDocumentHelpStorageAuthOptions } from "@/lib/document-help-storage";

const CASE_ROOT = "document-help/cases/";
const CASE_ID_PATTERN = /^[a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;

export type PilotReview = {
  reviewedAt: string;
  model: string;
  classification: "human-review" | "missing-information" | "urgent-review" | "manual-routing";
  confidence: "low" | "medium" | "high";
  checks: string[];
  conflicts: string[];
  missingInformation: string[];
};

export type PilotDecision = {
  decidedAt: string;
  model: string;
  decision: "operator-review" | "ask-for-information" | "approval-gated-handoff";
  allowedTools: Array<"n8n-webhook" | "crm-record">;
  requiresHumanApproval: true;
  rationale: string;
};

export type DocumentHelpPilotPipeline = {
  caseId: string;
  updatedAt: string;
  qwenState: "completed";
  reviewState: "completed";
  decisionState: "completed";
  review: PilotReview;
  decision: PilotDecision;
  handoff: {
    state: "not-configured" | "awaiting-human-approval";
    externalDeliveryEnabled: false;
    note: string;
  };
};

function pipelinePath(caseId: string) {
  return `${CASE_ROOT}${caseId}/pipeline.json`;
}

export async function getDocumentHelpPilotPipeline(caseId: string): Promise<DocumentHelpPilotPipeline | null> {
  if (!CASE_ID_PATTERN.test(caseId)) return null;
  const auth = getDocumentHelpStorageAuthOptions();
  if (!auth) return null;
  const result = await get(pipelinePath(caseId), { access: "private", useCache: false, ...auth });
  if (!result || result.statusCode !== 200) return null;

  try {
    const parsed = JSON.parse(await new Response(result.stream).text()) as DocumentHelpPilotPipeline;
    return parsed.caseId === caseId && parsed.qwenState === "completed" ? parsed : null;
  } catch {
    return null;
  }
}

export async function saveDocumentHelpPilotPipeline(caseId: string, pipeline: DocumentHelpPilotPipeline) {
  if (!CASE_ID_PATTERN.test(caseId)) throw new Error("Невалиден номер на заявка.");
  const auth = getDocumentHelpStorageAuthOptions();
  if (!auth) throw new Error("Частното хранилище не е налично.");
  await put(pipelinePath(caseId), JSON.stringify(pipeline), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 60,
    ...auth,
  });
}
