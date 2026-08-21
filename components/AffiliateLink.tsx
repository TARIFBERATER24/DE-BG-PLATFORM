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
    <span className="inline-flex flex-col items-start gap-1">
      <Link href={`/go/${network}/${slug}`} className={className}>
        {children}
      </Link>
      <span className="text-xs text-zinc-500">Реклама</span>
    </span>
  );
}
