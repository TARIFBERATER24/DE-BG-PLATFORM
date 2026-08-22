// Style reminder: an operator-only factual desk with explicit, reviewable AI drafts and no automated advice or external delivery.
import Link from "next/link";
import { Clock3, Download, FileText, LockKeyhole, ShieldCheck, Sparkles, TriangleAlert, Workflow } from "lucide-react";
import { isDocumentHelpCaseExpired, type DocumentHelpCaseWithAnalysis } from "@/lib/document-help-storage";
import type { DocumentHelpPilotPipeline } from "@/lib/document-help-pipeline";
import { documentHelpStatusLabels } from "@/lib/document-help-contract";
import DocumentHelpCaseAnalyzeButton from "@/components/DocumentHelpCaseAnalyzeButton";
import DocumentHelpCaseDeleteButton from "@/components/DocumentHelpCaseDeleteButton";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("bg-BG", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

function formatSize(bytes: number) {
  return `${(bytes / 1024 / 1024).toFixed(bytes >= 1024 * 1024 ? 1 : 2)} MB`;
}

function urgencyLabel(value: "none" | "review-soon" | "urgent-human-review") {
  if (value === "urgent-human-review") return "Спешен човешки преглед";
  if (value === "review-soon") return "Прегледайте скоро";
  return "Няма разпозната спешност";
}

type DeskCase = DocumentHelpCaseWithAnalysis & { pipeline: DocumentHelpPilotPipeline | null };

export default function DocumentHelpCaseDesk({ cases, aiConfigured }: { cases: DeskCase[]; aiConfigured: boolean }) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10 sm:py-14">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-7">
        <div>
          <p className="text-xs font-medium tracking-[0.12em] text-brand">ОПЕРАТОРСКИ ПРЕГЛЕД</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">Demo заявки с документи</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
            Частен pilot: Qwen извличане → GPT OSS проверка → GPT OSS решение. Външният handoff изисква отделно одобрение; n8n и CRM са изключени, докато не бъдат конфигурирани.
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
              {(() => {
                const expired = isDocumentHelpCaseExpired(item);
                const status = expired ? "expired" : item.status;
                return <>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium tracking-wide text-ink-subtle">ЗАЯВКА {item.caseId.slice(0, 8).toUpperCase()}</p>
                  <h2 className="mt-2 text-lg font-semibold text-ink">{item.documentType}</h2>
                  <p className="mt-1 text-sm text-ink-muted">Получена: {formatDate(item.createdAt)}</p>
                </div>
                <span className="rounded-full bg-alert-bg px-3 py-1 text-xs font-medium text-alert-ink">
                  {documentHelpStatusLabels[status]}
                </span>
              </div>

              <dl className="mt-5 grid gap-4 border-t border-line pt-5 text-sm sm:grid-cols-2">
                <div><dt className="text-xs font-medium tracking-wide text-ink-subtle">EMAIL</dt><dd className="mt-1 text-ink">{item.email}</dd></div>
                <div><dt className="text-xs font-medium tracking-wide text-ink-subtle">ФАЙЛ</dt><dd className="mt-1 flex items-center gap-2 text-ink"><FileText className="h-4 w-4 text-brand" aria-hidden="true" />{item.document.originalFileName} · {formatSize(item.document.size)}</dd></div>
                <div className="sm:col-span-2"><dt className="text-xs font-medium tracking-wide text-ink-subtle">ВЪПРОС</dt><dd className="mt-1 whitespace-pre-wrap leading-6 text-ink-muted">{item.question}</dd></div>
                <div className="sm:col-span-2"><dt className="text-xs font-medium tracking-wide text-ink-subtle">СЪХРАНЕНИЕ</dt><dd className="mt-1 flex items-center gap-2 text-ink-muted"><Clock3 className="h-4 w-4 text-brand" aria-hidden="true" />Изтича: {formatDate(item.expiresAt)} · След изтичане свалянето и AI черновата са блокирани.</dd></div>
              </dl>

              {item.analysis && (
                <section className="mt-5 rounded-md border border-brand/20 bg-brand-tint p-4" aria-label="AI чернова за операторски преглед">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="inline-flex items-center gap-2 text-sm font-semibold text-ink"><Sparkles className="h-4 w-4 text-brand" aria-hidden="true" />AI чернова — само за операторски преглед</p>
                    <span className="text-xs text-ink-muted">{formatDate(item.analysis.extractedAt)}</span>
                  </div>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-ink">{item.analysis.summaryBg}</p>
                  <div className="mt-3 grid gap-3 text-xs text-ink-muted sm:grid-cols-2">
                    <p><span className="font-medium text-ink">Вид:</span> {item.analysis.documentKind}</p>
                    <p><span className="font-medium text-ink">Спешност:</span> {urgencyLabel(item.analysis.urgency)}</p>
                    {item.analysis.providerName && <p><span className="font-medium text-ink">Издател:</span> {item.analysis.providerName}</p>}
                    {item.analysis.dates.length > 0 && <p><span className="font-medium text-ink">Дати:</span> {item.analysis.dates.map((date) => `${date.label}: ${date.date}`).join(" · ")}</p>}
                  </div>
                  {(item.analysis.riskFlags.length > 0 || item.analysis.uncertainties.length > 0) && <div className="mt-3 flex gap-2 rounded border border-alert-line bg-alert-bg p-3 text-xs leading-5 text-alert-ink"><TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /><p>Не е правен съвет. Потърсете квалифициран специалист или официалния подател възможно най-скоро. {item.analysis.uncertainties.join(" ")}</p></div>}
                </section>
              )}

              <section className="mt-5 rounded-md border border-line bg-surface-alt p-4" aria-label="Pilot pipeline">
                <div className="flex items-center gap-2 text-sm font-semibold text-ink"><Workflow className="h-4 w-4 text-brand" aria-hidden="true" />Pilot pipeline</div>
                <div className="mt-3 grid gap-2 text-xs sm:grid-cols-4">
                  <div className={`rounded border p-3 ${item.analysis ? "border-brand/30 bg-brand-tint" : "border-line"}`}><p className="font-medium text-ink">1. Qwen 3.6 27B</p><p className="mt-1 text-ink-muted">OCR / extraction</p></div>
                  <div className={`rounded border p-3 ${item.pipeline ? "border-brand/30 bg-brand-tint" : "border-line"}`}><p className="font-medium text-ink">2. GPT OSS 120B</p><p className="mt-1 text-ink-muted">Проверка / класификация</p></div>
                  <div className={`rounded border p-3 ${item.pipeline ? "border-brand/30 bg-brand-tint" : "border-line"}`}><p className="font-medium text-ink">3. GPT OSS 20B</p><p className="mt-1 text-ink-muted">Tool decision</p></div>
                  <div className="rounded border border-dashed border-line p-3"><p className="font-medium text-ink">4. n8n → CRM</p><p className="mt-1 text-ink-muted">{item.pipeline?.handoff.note ?? "Изключено до човек + настройка"}</p></div>
                </div>
                {item.pipeline && <div className="mt-3 grid gap-2 text-xs text-ink-muted sm:grid-cols-3"><p><span className="font-medium text-ink">Класификация:</span> {item.pipeline.review.classification}</p><p><span className="font-medium text-ink">Увереност:</span> {item.pipeline.review.confidence}</p><p><span className="font-medium text-ink">Решение:</span> {item.pipeline.decision.decision}</p></div>}
              </section>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
                <p className="max-w-2xl text-xs leading-5 text-ink-subtle">{expired ? "Срокът за съхранение е изтекъл. Изтрийте заявката; сваляне и AI чернова са блокирани." : item.processing.note}</p>
                <div className="flex gap-2">
                  {expired ? <span className="inline-flex items-center rounded-md bg-ink-subtle/10 px-3 py-2 text-xs font-medium text-ink-muted">Свалянето е блокирано</span> : <a href={`/api/demo/document-help/operator/document?case=${encodeURIComponent(item.caseId)}`} className="inline-flex items-center gap-2 rounded-md bg-brand px-3 py-2 text-xs font-medium text-on-brand transition-colors hover:bg-brand-hover"><Download className="h-3.5 w-3.5" aria-hidden="true" />Изтегли файл</a>}
                  {!expired && !item.analysis && aiConfigured && <DocumentHelpCaseAnalyzeButton caseId={item.caseId} />}
                  <DocumentHelpCaseDeleteButton caseId={item.caseId} />
                </div>
              </div>
                </>;
              })()}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
