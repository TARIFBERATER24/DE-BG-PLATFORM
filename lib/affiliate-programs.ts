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
  {
    network: "financeads",
    slug: "gasvergleich",
    label: "Сравнение на газ",
    vertical: "energiya-telekom",
    trackingUrl: null,
  },
  {
    network: "awin",
    slug: "internetvergleich",
    label: "Сравнение на интернет",
    vertical: "energiya-telekom",
    trackingUrl: null,
  },
  {
    network: "awin",
    slug: "handyvergleich",
    label: "Сравнение на мобилни планове",
    vertical: "energiya-telekom",
    trackingUrl: null,
  },
  {
    network: "financeads",
    slug: "haftpflichtvergleich",
    label: "Сравнение на гражданска отговорност",
    vertical: "zastrahovki",
    trackingUrl: null,
  },
  {
    network: "financeads",
    slug: "kfzvergleich",
    label: "Сравнение на автомобилна застраховка",
    vertical: "zastrahovki",
    trackingUrl: null,
  },
  {
    network: "financeads",
    slug: "hausratvergleich",
    label: "Сравнение на застраховка на имущество",
    vertical: "zastrahovki",
    trackingUrl: null,
  },
  {
    network: "financeads",
    slug: "zusatzversicherung",
    label: "Сравнение на допълнителна здравна застраховка",
    vertical: "zastrahovki",
    trackingUrl: null,
  },
  {
    network: "financeads",
    slug: "girokontovergleich",
    label: "Сравнение на банкови сметки",
    vertical: "finansi",
    trackingUrl: null,
  },
  {
    network: "financeads",
    slug: "kreditvergleich",
    label: "Сравнение на кредити",
    vertical: "finansi",
    trackingUrl: null,
  },
  {
    network: "awin",
    slug: "kreditkartevergleich",
    label: "Сравнение на кредитни карти",
    vertical: "finansi",
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
