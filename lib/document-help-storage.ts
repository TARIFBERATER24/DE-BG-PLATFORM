// Style reminder: private, minimal, operator-only storage; never expose document URLs or trigger AI/external delivery from this layer.
import "server-only";

import { del, get, issueSignedToken, list, put, type PutBlobResult } from "@vercel/blob";
import {
  DOCUMENT_HELP_ALLOWED_CONTENT_TYPES,
  DOCUMENT_HELP_MAX_SIZE_BYTES,
  documentHelpDocumentTypes,
  type DocumentHelpCaseStatus,
  type DocumentHelpDocumentType,
  type DocumentHelpUploadPayload,
} from "@/lib/document-help-contract";

const CASE_ROOT = "document-help/cases/";
const CASE_ID_PATTERN = /^[a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function blobAuthOptions() {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    return { token: process.env.BLOB_READ_WRITE_TOKEN };
  }

  if (process.env.BLOB_STORE_ID) {
    return {
      storeId: process.env.BLOB_STORE_ID,
    };
  }

  return null;
}

export function getDocumentHelpStorageAuthOptions() {
  return blobAuthOptions();
}

export type DocumentHelpCaseRecord = {
  caseId: string;
  status: DocumentHelpCaseStatus;
  createdAt: string;
  updatedAt: string;
  documentType: DocumentHelpDocumentType;
  email: string;
  question: string;
  document: {
    originalFileName: string;
    pathname: string;
    url: string;
    contentType: string;
    size: number;
  };
  processing: {
    aiAnalysis: false;
    externalDelivery: false;
    note: string;
  };
};

function caseManifestPath(caseId: string) {
  return `${CASE_ROOT}${caseId}/case.json`;
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isCaseId(value: string) {
  return CASE_ID_PATTERN.test(value);
}

function normalizePayload(rawPayload: string | null): DocumentHelpUploadPayload {
  if (!rawPayload) throw new Error("Липсват данни за заявката.");

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawPayload);
  } catch {
    throw new Error("Невалидни данни за заявката.");
  }

  if (!parsed || typeof parsed !== "object") throw new Error("Невалидни данни за заявката.");
  const candidate = parsed as Record<string, unknown>;
  const caseId = candidate.caseId;
  const documentType = candidate.documentType;
  const email = candidate.email;
  const question = candidate.question;
  const originalFileName = candidate.originalFileName;
  const fileSize = candidate.fileSize;

  if (!isString(caseId) || !isCaseId(caseId)) throw new Error("Невалиден номер на заявка.");
  if (!isString(documentType) || !documentHelpDocumentTypes.includes(documentType as DocumentHelpDocumentType)) {
    throw new Error("Невалиден вид документ.");
  }
  if (!isString(email) || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    throw new Error("Моля, въведете валиден email.");
  }
  if (!isString(question) || question.trim().length < 10 || question.length > 1500) {
    throw new Error("Опишете накратко каква помощ ви е нужна.");
  }
  if (!isString(originalFileName) || originalFileName.length < 1 || originalFileName.length > 160) {
    throw new Error("Невалидно име на файл.");
  }
  if (typeof fileSize !== "number" || !Number.isSafeInteger(fileSize) || fileSize < 1 || fileSize > 10 * 1024 * 1024) {
    throw new Error("Невалиден размер на файл.");
  }

  return {
    caseId,
    documentType: documentType as DocumentHelpDocumentType,
    email: email.trim().toLowerCase(),
    question: question.trim(),
    originalFileName: originalFileName.trim(),
    fileSize,
  };
}

export function isDocumentHelpStorageConfigured() {
  return Boolean(blobAuthOptions());
}

export function validateDocumentHelpUpload(pathname: string, rawPayload: string | null) {
  const payload = normalizePayload(rawPayload);
  const expectedPrefix = `${CASE_ROOT}${payload.caseId}/document.`;
  if (!pathname.startsWith(expectedPrefix) || pathname.includes("..")) {
    throw new Error("Невалиден път на файл.");
  }
  return payload;
}

export async function saveUploadedDocumentCase(blob: PutBlobResult, rawPayload: string | null) {
  const auth = blobAuthOptions();
  if (!auth) throw new Error("Съхранението на demo документи не е конфигурирано.");
  const payload = validateDocumentHelpUpload(blob.pathname, rawPayload);
  const now = new Date().toISOString();
  const record: DocumentHelpCaseRecord = {
    caseId: payload.caseId,
    status: "waiting-review",
    createdAt: now,
    updatedAt: now,
    documentType: payload.documentType,
    email: payload.email,
    question: payload.question,
    document: {
      originalFileName: payload.originalFileName,
      pathname: blob.pathname,
      url: blob.url,
      contentType: blob.contentType,
      size: payload.fileSize,
    },
    processing: {
      aiAnalysis: false,
      externalDelivery: false,
      note: "Файлът е съхранен за ръчен преглед. AI анализ и външно изпращане не са активни.",
    },
  };

  await put(caseManifestPath(record.caseId), JSON.stringify(record), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 60,
    ...auth,
  });

  return record;
}

async function readPrivateCase(caseId: string): Promise<DocumentHelpCaseRecord | null> {
  if (!isCaseId(caseId)) return null;
  const auth = blobAuthOptions();
  if (!auth) return null;
  const result = await get(caseManifestPath(caseId), { access: "private", useCache: false, ...auth });
  if (!result || result.statusCode !== 200) return null;

  try {
    const text = await new Response(result.stream).text();
    const parsed = JSON.parse(text) as DocumentHelpCaseRecord;
    return parsed.caseId === caseId ? parsed : null;
  } catch {
    return null;
  }
}

export async function listDocumentHelpCases() {
  if (!isDocumentHelpStorageConfigured()) return [];
  const auth = blobAuthOptions();
  if (!auth) return [];
  const { blobs } = await list({ prefix: CASE_ROOT, ...auth });
  const manifests = blobs.filter((blob) => blob.pathname.endsWith("/case.json"));
  const cases = await Promise.all(
    manifests.map((blob) => {
      const caseId = blob.pathname.split("/").at(-2) ?? "";
      return readPrivateCase(caseId);
    }),
  );

  return cases
    .filter((record): record is DocumentHelpCaseRecord => Boolean(record))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getDocumentHelpCase(caseId: string) {
  if (!isDocumentHelpStorageConfigured()) return null;
  return readPrivateCase(caseId);
}

export async function deleteDocumentHelpCase(caseId: string) {
  const record = await getDocumentHelpCase(caseId);
  if (!record) return false;
  const auth = blobAuthOptions();
  if (!auth) return false;
  await del([record.document.url, caseManifestPath(caseId)], auth);
  return true;
}

export async function issueDocumentHelpUploadToken(pathname: string, rawPayload: string | null) {
  const auth = blobAuthOptions();
  if (!auth) throw new Error("Съхранението на demo документи не е конфигурирано.");

  validateDocumentHelpUpload(pathname, rawPayload);
  return issueSignedToken({
    pathname,
    operations: ["put"],
    allowedContentTypes: [...DOCUMENT_HELP_ALLOWED_CONTENT_TYPES],
    maximumSizeInBytes: DOCUMENT_HELP_MAX_SIZE_BYTES,
    validUntil: Date.now() + 10 * 60 * 1000,
    ...auth,
  });
}
