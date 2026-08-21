export type AffiliateNetwork = "financeads" | "awin" | "belboon";

export type AffiliateProgram = {
  network: AffiliateNetwork;
  slug: string;
  label: string;
  vertical: string;
  trackingUrl: string | null;
};

const programs: AffiliateProgram[] = [
  {
    network: "financeads",
    slug: "stromvergleich",
    label: "Сравнение на ток",
    vertical: "energiya-telekom",
    trackingUrl: null,
  },
];

export function getAffiliateProgram(
  network: string,
  slug: string,
): AffiliateProgram | undefined {
  return programs.find((p) => p.network === network && p.slug === slug);
}

export function getProgramsForVertical(vertical: string): AffiliateProgram[] {
  return programs.filter((p) => p.vertical === vertical);
}
