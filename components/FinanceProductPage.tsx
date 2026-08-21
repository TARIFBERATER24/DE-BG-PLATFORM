import Link from "next/link";
import AffiliateLink from "@/components/AffiliateLink";
import HelpButton from "@/components/HelpButton";
import { featureFlags } from "@/lib/feature-flags";
import type { AffiliateNetwork } from "@/lib/affiliate-programs";

type FinanceProductPageProps = {
  title: string;
  intro: string;
  paragraphs: string[];
  /** Concrete ways this product helps the client -- not generic marketing lines. */
  helps: string[];
  /** How the online application actually works, step by step. */
  registrationSteps: string[];
  network: AffiliateNetwork;
  programSlug: string;
  ctaLabel: string;
  backHref: string;
  backLabel: string;
};

export default function FinanceProductPage({
  title,
  intro,
  paragraphs,
  helps,
  registrationSteps,
  network,
  programSlug,
  ctaLabel,
  backHref,
  backLabel,
}: FinanceProductPageProps) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">{title}</h1>
      <p className="mt-4 text-ink-muted">{intro}</p>

      <div className="mt-6 space-y-4 text-ink">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-10 rounded-lg border border-line p-6">
        <h2 className="font-semibold text-ink">Как ви помага</h2>
        <ul className="mt-3 space-y-2 text-sm text-ink-muted">
          {helps.map((item) => (
            <li key={item.slice(0, 24)} className="flex gap-2">
              <span aria-hidden="true" className="text-positive">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 rounded-lg border border-line p-6">
        <h2 className="font-semibold text-ink">Как става онлайн регистрацията</h2>
        <ol className="mt-3 space-y-3 text-sm text-ink-muted">
          {registrationSteps.map((step, index) => (
            <li key={step.slice(0, 24)} className="flex gap-3">
              <span
                aria-hidden="true"
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-tint text-xs font-semibold text-brand"
              >
                {index + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      {featureFlags.finansiLive ? (
        <div className="mt-6 rounded-lg border border-line p-6">
          <h2 className="font-semibold text-ink">{ctaLabel}</h2>
          <p className="mt-1.5 text-sm text-ink-muted">
            Ще бъдете пренасочени към официалния сравнителен инструмент на
            нашия партньор.
          </p>
          <div className="mt-5">
            <AffiliateLink
              network={network}
              slug={programSlug}
              className="inline-flex rounded-md bg-brand px-5 py-2.5 text-sm font-medium text-on-brand transition-colors hover:bg-brand-hover"
            >
              {ctaLabel} →
            </AffiliateLink>
          </div>
          <p className="mt-4 border-t border-line pt-4 text-xs text-ink-subtle">
            Безплатно за вас — партньорът ни плаща комисионна само при
            сключен договор.
          </p>
        </div>
      ) : (
        <div className="mt-6 rounded-lg border border-alert-line bg-alert-bg p-6 text-sm text-alert-ink">
          Тази категория все още не приема реален трафик — очаква
          потвърждение от адвокат, че моделът остава реклама, а не кредитно
          посредничество (§34c GewO), преди да добавим сравнение на реални
          оферти.
        </div>
      )}

      <HelpButton topic={title} />

      <Link
        href={backHref}
        className="mt-6 inline-block text-sm font-medium text-brand hover:text-brand-hover"
      >
        ← {backLabel}
      </Link>
    </div>
  );
}
