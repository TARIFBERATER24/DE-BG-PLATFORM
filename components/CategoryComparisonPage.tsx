import AffiliateLink from "@/components/AffiliateLink";
import type { AffiliateNetwork } from "@/lib/affiliate-programs";

type CategoryComparisonPageProps = {
  title: string;
  intro: string;
  ctaLabel: string;
  network: AffiliateNetwork;
  programSlug: string;
  /** Rendered between the intro and the partner CTA -- used for the paid
   *  consultation offer, so the personal path is seen before the self-serve one. */
  children?: React.ReactNode;
};

export default function CategoryComparisonPage({
  title,
  intro,
  ctaLabel,
  network,
  programSlug,
  children,
}: CategoryComparisonPageProps) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">{title}</h1>
      <p className="mt-4 text-ink-muted">{intro}</p>

      {children}

      <div className="mt-10 rounded-lg border border-line p-6">
        <h2 className="font-semibold text-ink">
          {children ? "Или сравнете сами" : ctaLabel}
        </h2>
        <p className="mt-1.5 text-sm text-ink-muted">
          Ще бъдете пренасочени към официалния сравнителен инструмент на нашия
          партньор.
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
          Безплатно за вас — партньорът ни плаща комисионна само при сключен
          договор.
        </p>
      </div>
    </div>
  );
}
