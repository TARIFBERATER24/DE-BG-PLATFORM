export type AffiliateNetwork =
  | "check24"
  | "tarifcheck"
  | "financeads"
  | "awin"
  | "belboon";

export type AffiliateProgram = {
  network: AffiliateNetwork;
  slug: string;
  label: string;
  vertical: string;
  /**
   * Page on the partner's site this link should land on. Paste this into the
   * network's deeplink/link generator to produce `trackingUrl`. Kept here so a
   * link can be regenerated later without guessing where it pointed.
   */
  target: string;
  /**
   * The generated tracking URL, containing our partner ID. `null` means the
   * link is not live yet -- `/go/` sends those to the homepage instead of a
   * broken redirect. Never fill this in with a URL that isn't ours.
   */
  trackingUrl: string | null;
};

const programs: AffiliateProgram[] = [
  // --- Energy / telecom: license-free, live vertical. CHECK24 direct program.
  {
    network: "check24",
    slug: "stromvergleich",
    label: "Сравнение на ток",
    vertical: "energiya-telekom",
    target: "https://www.check24.de/strom/",
    trackingUrl:
      "https://a.check24.net/misc/click.php?pid=1174585&aid=18&deep=stromanbieter-wechseln&cat=1&tid=stromvergleich",
  },
  {
    network: "check24",
    slug: "gasvergleich",
    label: "Сравнение на газ",
    vertical: "energiya-telekom",
    target: "https://www.check24.de/gas/",
    trackingUrl:
      "https://a.check24.net/misc/click.php?pid=1174585&aid=18&deep=gasanbieter-wechseln&cat=3&tid=gasvergleich",
  },
  {
    network: "check24",
    slug: "internetvergleich",
    label: "Сравнение на интернет",
    vertical: "energiya-telekom",
    target: "https://www.check24.de/dsl/",
    trackingUrl:
      "https://a.check24.net/misc/click.php?pid=1174585&aid=18&deep=dsl-anbieterwechsel&cat=4&tid=internetvergleich",
  },
  {
    network: "check24",
    slug: "handyvergleich",
    label: "Сравнение на мобилни планове",
    vertical: "energiya-telekom",
    target: "https://www.check24.de/handytarife/",
    trackingUrl:
      "https://a.check24.net/misc/click.php?pid=1174585&aid=18&deep=handytarife&cat=7&tid=handyvergleich",
  },

  // --- Insurance: TarifCheck24 specialises here. These pages are still behind
  // the legal-review notice, so nothing links to them yet.
  {
    network: "tarifcheck",
    slug: "haftpflichtvergleich",
    label: "Сравнение на гражданска отговорност",
    vertical: "zastrahovki",
    target: "https://www.tarifcheck.de/haftpflichtversicherung/",
    trackingUrl: null,
  },
  {
    network: "tarifcheck",
    slug: "kfzvergleich",
    label: "Сравнение на автомобилна застраховка",
    vertical: "zastrahovki",
    target: "https://www.tarifcheck.de/kfz-versicherung/",
    trackingUrl: null,
  },
  {
    network: "tarifcheck",
    slug: "hausratvergleich",
    label: "Сравнение на застраховка на имущество",
    vertical: "zastrahovki",
    target: "https://www.tarifcheck.de/hausratversicherung/",
    trackingUrl: null,
  },

  // --- Finance: CHECK24 covers Konto & Kredit directly. CTA stays behind
  // featureFlags.finansiLive until a real tracking link + legal sign-off
  // both land -- see components/FinanceProductPage.tsx.
  {
    network: "check24",
    slug: "girokontovergleich",
    label: "Сравнение на банкови сметки",
    vertical: "finansi",
    target: "https://www.check24.de/girokonto/",
    trackingUrl: null,
  },
  {
    network: "check24",
    slug: "kreditvergleich",
    label: "Сравнение на кредити",
    vertical: "finansi",
    target: "https://www.check24.de/kredit/",
    trackingUrl: null,
  },
  {
    network: "check24",
    slug: "n26",
    label: "N26 банкова сметка",
    vertical: "finansi",
    target: "https://www.c24.de/",
    trackingUrl:
      "https://www.c24.de/?source=tarifcheck&cid=1174585_18_stromvergleich",
  },
  {
    network: "check24",
    slug: "kreditkartevergleich",
    label: "Сравнение на кредитни карти",
    vertical: "finansi",
    target: "https://www.check24.de/kreditkarte/",
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

/** Programs still waiting on a tracking URL -- used to sanity-check before launch. */
export function getPendingPrograms(): AffiliateProgram[] {
  return programs.filter((p) => p.trackingUrl === null);
}
