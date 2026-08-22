// Style reminder: this contract supports a calm Bulgarian-first document-help service with explicit limits and no automated advice.
export const DOCUMENT_HELP_MAX_SIZE_BYTES = 10 * 1024 * 1024;

export const DOCUMENT_HELP_ALLOWED_CONTENT_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
] as const;

export const documentHelpDocumentTypes = [
  "Сметка или Jahresabrechnung",
  "Писмо за промяна на цена",
  "Предупреждение / Mahnung",
  "Прекратяване на договор / Kündigung",
  "Друго писмо от доставчик",
] as const;

export type DocumentHelpDocumentType = (typeof documentHelpDocumentTypes)[number];
export type DocumentHelpCaseStatus = "received" | "waiting-review" | "expired";

export type DocumentHelpUploadPayload = {
  caseId: string;
  documentType: DocumentHelpDocumentType;
  email: string;
  question: string;
  originalFileName: string;
  fileSize: number;
};

export const documentHelpStatusLabels: Record<DocumentHelpCaseStatus, string> = {
  received: "Получен документ",
  "waiting-review": "Чака човешки преглед",
  expired: "Изтекъл срок за изтриване",
};
