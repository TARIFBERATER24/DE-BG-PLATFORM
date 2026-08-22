// Style reminder: a plain operator desk with factual status, protected download, and no automated interpretation or external delivery.
import Link from "next/link";
import { Download, FileText, LockKeyhole, ShieldCheck } from "lucide-react";
import type { DocumentHelpCaseRecord } from "@/lib/document-help-storage";
import { documentHelpStatusLabels } from "@/lib/document-help-contract";
import DocumentHelpCaseDeleteButton from "@/components/DocumentHelpCaseDeleteButton";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("bg-BG", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

function formatSize(bytes: number) {
  return `${(bytes / 1024 / 1024).toFixed(bytes >= 1024 * 1024 ? 1 : 2)} MB`;
}

export default function DocumentHelpCaseDesk({ cases }: { cases: DocumentHelpCaseRecord[] }) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10 sm:py-14">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-7">
        <div>
          <p className="text-xs font-medium tracking-[0.12em] text-brand">ОПЕРАТОРСКИ ПРЕГЛЕД</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">Demo заявки с документи</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
            Файловете са в частно хранилище. AI анализ, n8n обработка и изпращане към външни системи са изключени.
          </p>
        </div>
        <Link href="/demo/pomosh-s-dokumenti" className="rounded-md border border-brand px-4 py-2.5 text-sm font-medium text-brand transition-colors hover:bg-brand-tint">
          Към upload страницата
        </Link>
      </div>

      <div className="mt-6 grid gap-3 border-y border-line py-5 text-sm text-ink-muted sm:grid-cols-3">
        <div className="flex items-center gap-3"><LockKeyhole className="h-5 w-5 text-brand" aria-hidden="true" /><span>Private storage</span></div>
        <div className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-brand" aria-hidden="true" /><span>Само ръчен преглед</span></div>
        <div className="font-medium text-ink">{cases.length} {cases.length === 1 ? "заявка" : "заявки"}</div>
      </div>

      {cases.length === 0 ? (
        <div className="mt-10 border-t border-line pt-8 text-sm leading-6 text-ink-muted">
          Все още няма съхранени demo заявки.
        </div>
      ) : (
        <div className="mt-8 space-y-5">
          {cases.map((item) => (
            <article key={item.caseId} className="rounded-lg border border-line bg-surface p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium tracking-wide text-ink-subtle">ЗАЯВКА {item.caseId.slice(0, 8).toUpperCase()}</p>
                  <h2 className="mt-2 text-lg font-semibold text-ink">{item.documentType}</h2>
                  <p className="mt-1 text-sm text-ink-muted">Получена: {formatDate(item.createdAt)}</p>
                </div>
                <span className="rounded-full bg-alert-bg px-3 py-1 text-xs font-medium text-alert-ink">
                  {documentHelpStatusLabels[item.status]}
                </span>
              </div>

              <dl className="mt-5 grid gap-4 border-t border-line pt-5 text-sm sm:grid-cols-2">
                <div><dt className="text-xs font-medium tracking-wide text-ink-subtle">EMAIL</dt><dd className="mt-1 text-ink">{item.email}</dd></div>
                <div><dt className="text-xs font-medium tracking-wide text-ink-subtle">ФАЙЛ</dt><dd className="mt-1 flex items-center gap-2 text-ink"><FileText className="h-4 w-4 text-brand" aria-hidden="true" />{item.document.originalFileName} · {formatSize(item.document.size)}</dd></div>
                <div className="sm:col-span-2"><dt className="text-xs font-medium tracking-wide text-ink-subtle">ВЪПРОС</dt><dd className="mt-1 whitespace-pre-wrap leading-6 text-ink-muted">{item.question}</dd></div>
              </dl>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
                <p className="max-w-2xl text-xs leading-5 text-ink-subtle">{item.processing.note}</p>
                <div className="flex gap-2">
                  <a
                    href={`/api/demo/document-help/operator/document?case=${encodeURIComponent(item.caseId)}`}
                    className="inline-flex items-center gap-2 rounded-md bg-brand px-3 py-2 text-xs font-medium text-on-brand transition-colors hover:bg-brand-hover"
                  >
                    <Download className="h-3.5 w-3.5" aria-hidden="true" />
                    Изтегли файл
                  </a>
                  <DocumentHelpCaseDeleteButton caseId={item.caseId} />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
