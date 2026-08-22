// Style reminder: Сравни.де makes German bureaucracy simple in Bulgarian—calm, credible, light, and never salesy.
"use client";

import { upload } from "@vercel/blob/client";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Clock3,
  FileText,
  FileUp,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UploadCloud,
  X,
} from "lucide-react";
import {
  DOCUMENT_HELP_ALLOWED_CONTENT_TYPES,
  DOCUMENT_HELP_MAX_SIZE_BYTES,
  documentHelpDocumentTypes,
  documentHelpStatusLabels,
  type DocumentHelpUploadPayload,
} from "@/lib/document-help-contract";

const reviewSteps = [
  "Документът се съхранява в защитено demo хранилище.",
  "Отбелязваме заявката за ръчен преглед.",
  "AI анализ, n8n и външно изпращане остават изключени.",
];

type SubmittedCase = { caseId: string; fileName: string };

function extensionFor(file: File) {
  if (file.type === "application/pdf") return "pdf";
  if (file.type === "image/jpeg") return "jpg";
  return "png";
}

function isAllowedFile(file: File) {
  return (DOCUMENT_HELP_ALLOWED_CONTENT_TYPES as readonly string[]).includes(file.type);
}

export default function DocumentHelpDemo() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [submittedCase, setSubmittedCase] = useState<SubmittedCase | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setUploadError("");
    if (!file) {
      setSelectedFile(null);
      return;
    }
    if (!isAllowedFile(file)) {
      setUploadError("Позволени са само PDF, JPG и PNG файлове.");
      event.target.value = "";
      return;
    }
    if (file.size > DOCUMENT_HELP_MAX_SIZE_BYTES) {
      setUploadError("Файлът е по-голям от 10 MB.");
      event.target.value = "";
      return;
    }
    setSelectedFile(file);
  }

  function removeFile() {
    setSelectedFile(null);
    setUploadError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedFile || !consent || isUploading) return;

    const formData = new FormData(event.currentTarget);
    const payload: DocumentHelpUploadPayload = {
      caseId: crypto.randomUUID(),
      documentType: String(formData.get("document-type")),
      email: String(formData.get("email")),
      question: String(formData.get("question")),
      originalFileName: selectedFile.name,
      fileSize: selectedFile.size,
    } as DocumentHelpUploadPayload;

    setUploadError("");
    setIsUploading(true);
    setUploadProgress(0);
    try {
      await upload(`document-help/cases/${payload.caseId}/document.${extensionFor(selectedFile)}`, selectedFile, {
        access: "private",
        contentType: selectedFile.type,
        handleUploadUrl: "/api/demo/document-help/upload",
        clientPayload: JSON.stringify(payload),
        onUploadProgress: ({ percentage }) => setUploadProgress(Math.round(percentage)),
      });
      setSubmittedCase({ caseId: payload.caseId, fileName: selectedFile.name });
      formRef.current?.reset();
      setSelectedFile(null);
      setConsent(false);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Неуспешно качване на файл.");
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 sm:py-16">
      <div className="mb-8 flex items-center justify-between gap-4">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-brand transition-colors hover:text-brand-hover">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Към началната страница
        </Link>
        <span className="rounded-full bg-alert-bg px-3 py-1 text-xs font-medium tracking-wide text-alert-ink">ДЕМО ВЕРСИЯ</span>
      </div>

      <section className="border-b border-line pb-10 sm:pb-12">
        <div className="max-w-3xl">
          <p className="text-xs font-medium tracking-[0.12em] text-brand">ПОМОЩ С ДОКУМЕНТИ</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Получили сте писмо, сметка или предупреждение от доставчик?</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-muted">Качете PDF или ясна снимка. Документът ще се съхрани за ръчен преглед; AI анализ и външно изпращане не са активни.</p>
        </div>

        <div className="mt-8 grid gap-4 border-y border-line py-5 text-sm text-ink-muted sm:grid-cols-3">
          <div className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" /><span>На български</span></div>
          <div className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" /><span>С човешки преглед</span></div>
          <div className="flex items-center gap-3"><LockKeyhole className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" /><span>Частно съхранение</span></div>
        </div>
      </section>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <form ref={formRef} onSubmit={handleSubmit} className="min-w-0">
          <div className="flex items-center gap-3 border-b border-line pb-4">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs font-semibold text-on-brand">1</span>
            <div><h2 className="font-semibold text-ink">Качете документа</h2><p className="text-sm text-ink-muted">PDF, JPG или PNG, до 10 MB</p></div>
          </div>

          <div className="mt-5">
            {selectedFile ? (
              <div className="flex items-center justify-between gap-3 rounded-lg border border-positive-line bg-positive-bg p-4">
                <div className="flex min-w-0 items-center gap-3"><FileText className="h-5 w-5 shrink-0 text-positive" aria-hidden="true" /><span className="truncate text-sm font-medium text-ink">{selectedFile.name}</span></div>
                <button type="button" onClick={removeFile} disabled={isUploading} className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-ink-muted transition-colors hover:bg-white hover:text-ink disabled:opacity-50" aria-label="Премахни избрания файл"><X className="h-4 w-4" aria-hidden="true" /></button>
              </div>
            ) : (
              <label className="group flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-line-strong bg-surface px-6 py-8 text-center transition-colors hover:border-brand hover:bg-brand-tint">
                <FileUp className="h-7 w-7 text-brand" aria-hidden="true" />
                <span className="mt-3 text-sm font-medium text-ink">Изберете файл от устройството си</span>
                <span className="mt-1 text-xs text-ink-subtle">или направете ясна снимка на всяка страница</span>
                <input ref={fileInputRef} type="file" accept="application/pdf,image/jpeg,image/png" onChange={handleFileChange} className="sr-only" aria-describedby="file-guidance" />
              </label>
            )}
            <p id="file-guidance" className="mt-3 text-xs leading-5 text-ink-subtle">Файлът се качва само в частно demo хранилище за човешки преглед. Не се публикува, не се анализира от AI и не се изпраща към доставчик.</p>
            {uploadError && <p className="mt-3 text-sm text-danger" role="alert">{uploadError}</p>}
            {uploadProgress !== null && <p className="mt-3 text-sm text-ink-muted" aria-live="polite">Качване: {uploadProgress}%</p>}
          </div>

          <div className="mt-10 flex items-center gap-3 border-b border-line pb-4">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs font-semibold text-on-brand">2</span>
            <div><h2 className="font-semibold text-ink">Кажете ни какво е нужно</h2><p className="text-sm text-ink-muted">Само информацията, необходима за първи преглед</p></div>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="document-type" className="text-sm font-medium text-ink">Какъв документ получихте? <span className="text-danger">*</span></label>
              <select id="document-type" name="document-type" required defaultValue="" className="mt-2 h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none transition-colors focus:border-brand">
                <option value="" disabled>Изберете вид документ</option>
                {documentHelpDocumentTypes.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-ink">Email за отговор <span className="text-danger">*</span></label>
              <input id="email" name="email" type="email" autoComplete="email" required placeholder="ime@email.com" className="mt-2 h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink placeholder:text-ink-subtle outline-none transition-colors focus:border-brand" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="question" className="text-sm font-medium text-ink">Какво не разбирате или каква помощ ви е нужна? <span className="text-danger">*</span></label>
              <textarea id="question" name="question" required minLength={10} maxLength={1500} rows={5} placeholder="Например: Не разбирам защо сумата е по-висока и до кога трябва да отговоря." className="mt-2 w-full resize-y rounded-md border border-line bg-surface px-3 py-2.5 text-sm leading-6 text-ink placeholder:text-ink-subtle outline-none transition-colors focus:border-brand" />
            </div>
          </div>

          <div className="mt-10 flex items-center gap-3 border-b border-line pb-4">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs font-semibold text-on-brand">3</span>
            <div><h2 className="font-semibold text-ink">Потвърдете изпращането</h2><p className="text-sm text-ink-muted">Няма да изпратим нищо към доставчик или друга платформа</p></div>
          </div>

          <div className="mt-5 rounded-lg border border-alert-line bg-alert-bg p-4">
            <div className="flex gap-3"><CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-alert-ink" aria-hidden="true" /><div className="text-sm leading-6 text-alert-ink"><p className="font-semibold">Важно при писма със срок</p><p className="mt-1">При съд, Vollstreckung, запор, полиция или кратък срок за възражение потърсете квалифицирана професионална помощ своевременно. Тази услуга не дава автоматични правни инструкции.</p></div></div>
          </div>

          <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm leading-6 text-ink-muted">
            <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required className="mt-1 h-4 w-4 rounded border-line text-brand accent-brand" />
            <span>Съгласен/съгласна съм документът и посочените данни да бъдат съхранени единствено за първоначален ръчен преглед и отговор на моето запитване.</span>
          </label>

          <button type="submit" disabled={!consent || !selectedFile || isUploading} className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-medium text-on-brand transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50">
            <UploadCloud className="h-4 w-4" aria-hidden="true" />
            {isUploading ? "Качваме защитено…" : "Качи за ръчен преглед"}
            {!isUploading && <ChevronRight className="h-4 w-4" aria-hidden="true" />}
          </button>
        </form>

        <aside className="h-fit border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <p className="text-xs font-medium tracking-[0.12em] text-ink-subtle">КАКВО СЛЕДВА</p>
          <ol className="mt-4 space-y-5">{reviewSteps.map((step, index) => <li key={step} className="flex gap-3 text-sm leading-6 text-ink-muted"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-strong text-xs font-semibold text-ink">{index + 1}</span><span>{step}</span></li>)}</ol>
          <div className="mt-8 border-t border-line pt-6"><div className="flex gap-3"><Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" /><p className="text-sm leading-6 text-ink-muted">Ще покажем номер на заявка и статус „чака човешки преглед“ след успешно качване.</p></div><div className="mt-5 flex gap-3"><Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" /><p className="text-sm leading-6 text-ink-muted">Няма директен контакт с доставчик, CHECK24 или Tarifvergleich от тази страница.</p></div></div>
        </aside>
      </div>

      {submittedCase && (
        <div className="fixed inset-0 z-50 flex items-end bg-ink/25 p-4 sm:items-center sm:justify-center">
          <div role="dialog" aria-modal="true" aria-labelledby="demo-success-title" className="w-full max-w-md rounded-lg bg-surface p-6 shadow-xl">
            <CheckCircle2 className="h-8 w-8 text-positive" aria-hidden="true" />
            <h2 id="demo-success-title" className="mt-4 text-xl font-semibold text-ink">Документът е получен</h2>
            <p className="mt-2 text-sm leading-6 text-ink-muted">Номер на заявка: <span className="font-semibold text-ink">{submittedCase.caseId.slice(0, 8).toUpperCase()}</span>. Статус: <span className="font-semibold text-ink">{documentHelpStatusLabels["waiting-review"]}</span>.</p>
            <p className="mt-3 text-sm leading-6 text-ink-muted">{submittedCase.fileName} е в частно demo хранилище. Не е изпратен към външна платформа и не е обработен от AI.</p>
            <button type="button" onClick={() => setSubmittedCase(null)} className="mt-6 rounded-md bg-brand px-4 py-2.5 text-sm font-medium text-on-brand transition-colors hover:bg-brand-hover">Готово</button>
          </div>
        </div>
      )}
    </div>
  );
}
