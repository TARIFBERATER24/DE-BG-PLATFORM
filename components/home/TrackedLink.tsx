"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackEvent, type AnalyticsEvent, type AnalyticsPayload } from "@/lib/analytics";

type TrackedLinkProps = {
  href: string;
  event: AnalyticsEvent;
  payload?: AnalyticsPayload;
  className?: string;
  external?: boolean;
  children: ReactNode;
};

/**
 * Thin analytics wrapper so section components can stay server components. Navigation
 * happens through the normal <Link>/<a> -- tracking never gates the click.
 */
export default function TrackedLink({
  href,
  event,
  payload,
  className,
  external,
  children,
}: TrackedLinkProps) {
  const onClick = () => trackEvent(event, payload);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
