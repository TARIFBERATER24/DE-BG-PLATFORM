import Link from "next/link";

type AffiliateLinkProps = {
  network: string;
  slug: string;
  children: React.ReactNode;
  className?: string;
};

export default function AffiliateLink({
  network,
  slug,
  children,
  className,
}: AffiliateLinkProps) {
  return (
    <span className="inline-flex flex-col items-start gap-1.5">
      <Link href={`/go/${network}/${slug}`} className={className}>
        {children}
      </Link>
      <span className="text-xs tracking-wide text-ink-subtle">Реклама</span>
    </span>
  );
}
