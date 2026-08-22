// Style reminder: Сравни.де makes German bureaucracy simple in Bulgarian—calm, credible, light, and never salesy.
"use client";

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
  X,
} from "lucide-react";

const documentTypes = [
  "Сметка или Jahresabrechnung",
  "Писмо за промяна на цена",
  "Предупреждение / Mahnung",
  "Прекратяване на договор / Kündigung",
  "Друго писмо от доставчик",
];

const reviewSteps = [
  "Превеждаме най-важното на разбираем български.",
  "Отбелязваме суми, срокове и важни условия.",
  "Подготвяме следващи стъпки за човешки преглед.",
];

export default function DocumentHelpDemo() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    setFileName(selectedFile?.name ?? null);
  }

  function removeFile() {
    setFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent) return;
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 sm:py-16">
      <div className="mb-8 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand transition-colors hover:text-brand-hover"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Към началната страница
        </Link>
        <span className="rounded-full bg-alert-bg px-3 py-1 text-xs font-medium tracking-wide text-alert-ink">
          ДЕМО ВЕРСИЯ
        </span>
      </div>

      <section className="border-b border-line pb-10 sm:pb-12">
        <div className="max-w-3xl">
          <p className="text-xs font-medium tracking-[0.12em] text-brand">
            ПОМОЩ С ДОКУМЕНТИ
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Получили сте писмо, сметка или предупреждение от доставчик?
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-muted">
            Качете PDF или ясна снимка. Ще подготвим разбираемо обяснение на
            български и ще прегледаме какво изисква внимание.
          </p>
        </div>

        <div className="mt-8 grid gap-4 border-y border-line py-5 text-sm text-ink-muted sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
            <span>На български</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
            <span>С човешки преглед</span>
          </div>
          <div className="flex items-center gap-3">
            <LockKeyhole className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
            <span>Без автоматично изпращане</span>
          </div>
        </div>
      </section>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <form onSubmit={handleSubmit} className="min-w-0">
          <div className="flex items-center gap-3 border-b border-line pb-4">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs font-semibold text-on-brand">
              1
            </span>
            <div>
              <h2 className="font-semibold text-ink">Качете документа</h2>
              <p className="text-sm text-ink-muted">PDF, JPG или PNG, до 10 MB</p>
            </div>
          </div>

          <div className="mt-5">
            {fileName ? (
              <div className="flex items-center justify-between gap-3 rounded-lg border border-positive-line bg-positive-bg p-4">
                <div className="flex min-w-0 items-center gap-3">
                  <FileText className="h-5 w-5 shrink-0 text-positive" aria-hidden="true" />
                  <span className="truncate text-sm font-medium text-ink">{fileName}</span>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-ink-muted transition-colors hover:bg-white hover:text-ink"
                  aria-label="Премахни избрания файл"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            ) : (
              <label className="group flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-line-strong bg-surface px-6 py-8 text-center transition-colors hover:border-brand hover:bg-brand-tint">
                <FileUp className="h-7 w-7 text-brand" aria-hidden="true" />
                <span className="mt-3 text-sm font-medium text-ink">Изберете файл от устройството си</span>
                <span className="mt-1 text-xs text-ink-subtle">или направете ясна снимка на всяка страница</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf,image/jpeg,image/png"
                  onChange={handleFileChange}
                  className="sr-only"
                  aria-describedby="file-guidance"
                />
              </label>
            )}
            <p id="file-guidance" className="mt-3 text-xs leading-5 text-ink-subtle">
              В тази demo страница файлът остава само във вашия браузър и не се качва, не се анализира и не се изпраща.
            </p>
          </div>

          <div className="mt-10 flex items-center gap-3 border-b border-line pb-4">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs font-semibold text-on-brand">
              2
            </span>
            <div>
              <h2 className="font-semibold text-ink">Кажете ни какво е нужно</h2>
              <p className="text-sm text-ink-muted">Само информацията, необходима за първи преглед</p>
            </div>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="document-type" className="text-sm font-medium text-ink">
                Какъв документ получихте? <span className="text-danger">*</span>
              </label>
              <select
                id="document-type"
                name="document-type"
                required
                defaultValue=""
                className="mt-2 h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none transition-colors focus:border-brand"
              >
                <option value="" disabled>Изберете вид документ</option>
                {documentTypes.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-ink">
                Email за отговор <span className="text-danger">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="ime@email.com"
                className="mt-2 h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink placeholder:text-ink-subtle outline-none transition-colors focus:border-brand"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="question" className="text-sm font-medium text-ink">
                Какво не разбирате или каква помощ ви е нужна? <span className="text-danger">*</span>
              </label>
              <textarea
                id="question"
                name="question"
                required
                rows={5}
                placeholder="Например: Не разбирам защо сумата е по-висока и до кога трябва да отговоря."
                className="mt-2 w-full resize-y rounded-md border border-line bg-surface px-3 py-2.5 text-sm leading-6 text-ink placeholder:text-ink-subtle outline-none transition-colors focus:border-brand"
              />
            </div>
          </div>

          <div className="mt-10 flex items-center gap-3 border-b border-line pb-4">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs font-semibold text-on-brand">
              3
            </span>
            <div>
              <h2 className="font-semibold text-ink">Потвърдете изпращането</h2>
              <p className="text-sm text-ink-muted">Няма да изпратим нищо към доставчик или друга платформа</p>
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-alert-line bg-alert-bg p-4">
            <div className="flex gap-3">
              <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-alert-ink" aria-hidden="true" />
              <div className="text-sm leading-6 text-alert-ink">
                <p className="font-semibold">Важно при писма със срок</p>
                <p className="mt-1">
                  При съд, Vollstreckung, запор, полиция или кратък срок за възражение
                  потърсете квалифицирана професионална помощ своевременно. Тази услуга
                  не дава автоматични правни инструкции.
                </p>
              </div>
            </div>
          </div>

          <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm leading-6 text-ink-muted">
            <input
              type="checkbox"
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
              required
              className="mt-1 h-4 w-4 rounded border-line text-brand accent-brand"
            />
            <span>
              Съгласен/съгласна съм документът и посочените данни да бъдат използвани
              единствено за първоначален преглед и отговор на моето запитване.
            </span>
          </label>

          <button
            type="submit"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-medium text-on-brand transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!consent}
          >
            Изпрати за преглед
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <p className="mt-3 text-xs text-ink-subtle">
            Demo режим: бутонът показва единствено примерния екран за потвърждение.
          </p>
        </form>

        <aside className="h-fit border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <p className="text-xs font-medium tracking-[0.12em] text-ink-subtle">КАКВО СЛЕДВА</p>
          <ol className="mt-4 space-y-5">
            {reviewSteps.map((step, index) => (
              <li key={step} className="flex gap-3 text-sm leading-6 text-ink-muted">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-strong text-xs font-semibold text-ink">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <div className="mt-8 border-t border-line pt-6">
            <div className="flex gap-3">
              <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
              <p className="text-sm leading-6 text-ink-muted">
                В бъдещата версия ще показваме срок за отговор след ръчен преглед — без фиктивни обещания за време.
              </p>
            </div>
            <div className="mt-5 flex gap-3">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
              <p className="text-sm leading-6 text-ink-muted">
                Няма директен контакт с доставчик, CHECK24 или Tarifvergleich от тази страница.
              </p>
            </div>
          </div>
        </aside>
      </div>

      {submitted && (
        <div className="fixed inset-0 z-50 flex items-end bg-ink/25 p-4 sm:items-center sm:justify-center">
          <div role="dialog" aria-modal="true" aria-labelledby="demo-success-title" className="w-full max-w-md rounded-lg bg-surface p-6 shadow-xl">
            <CheckCircle2 className="h-8 w-8 text-positive" aria-hidden="true" />
            <h2 id="demo-success-title" className="mt-4 text-xl font-semibold text-ink">Това беше тестово изпращане</h2>
            <p className="mt-2 text-sm leading-6 text-ink-muted">
              Не са записани данни, не е качен файл и не е изпратено съобщение. В реалната версия тук ще се създава защитен номер на заявка за твой преглед.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-6 rounded-md bg-brand px-4 py-2.5 text-sm font-medium text-on-brand transition-colors hover:bg-brand-hover"
            >
              Продължи теста
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

