export type HeroSlide = {
  id: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  href: string;
};

/**
 * Rotating hero offers. Keep each title to one line on desktop and the
 * subtitle to a single sentence -- the slide swaps every few seconds, so
 * anything longer doesn't get read.
 *
 * Savings figures stay anchored to the case where they actually hold
 * (leaving Grundversorgung), never stated as a flat promise.
 */
export const heroSlides: HeroSlide[] = [
  {
    id: "tok-gaz",
    title: "Обновихте ли тарифите си след ценовата гаранция?",
    subtitle:
      "При Grundversorgung разликата до изгоден договор често е около 30% от годишната сметка.",
    ctaLabel: "Сравни тарифите",
    href: "/energiya-telekom/tok",
  },
  {
    id: "internet",
    title: "Плащате ли за скорост, която не получавате?",
    subtitle:
      "DSL, кабел и оптика — вижте какво реално е налично на вашия адрес.",
    ctaLabel: "Сравни интернет",
    href: "/energiya-telekom/internet",
  },
  {
    id: "avto",
    title: "Автозастраховка, обяснена на български",
    subtitle:
      "Haftpflicht, Teilkasko и Vollkasko — какво покрива всяко и кое ви трябва.",
    ctaLabel: "Виж автозастраховки",
    href: "/zastrahovki/avto",
  },
  {
    id: "girokonto",
    title: "Банкова сметка без месечна такса",
    subtitle:
      "Първата стъпка след Anmeldung — с видео-легитимация, без ходене до клон.",
    ctaLabel: "Сравни сметки",
    href: "/finansi/bankova-smetka",
  },
];
