import AffiliateLink from "@/components/AffiliateLink";
import type { AffiliateNetwork } from "@/lib/affiliate-programs";

type CategoryComparisonPageProps = {
  title: string;
  intro: string;
  ctaLabel: string;
  network: AffiliateNetwork;
  programSlug: string;
};

export default function CategoryComparisonPage({
  title,
  intro,
  ctaLabel,
  network,
  programSlug,
}: CategoryComparisonPageProps) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-4 text-zinc-600">{intro}</p>

      <div className="mt-10 rounded-xl border border-black/10 p-6">
        <h2 className="font-semibold">{ctaLabel}</h2>
        <p className="mt-2 text-sm text-zinc-600">
          Ще бъдете пренасочени към официалния сравнителен инструмент на нашия
          партньор.
        </p>
        <div className="mt-4">
          <AffiliateLink
            network={network}
            slug={programSlug}
            className="inline-flex rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            {ctaLabel} →
          </AffiliateLink>
        </div>
      </div>
    </div>
  );
}
