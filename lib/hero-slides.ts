export type HeroSlide = {
  id: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  href: string;
  /** Optional 3D render shown beside the copy. Lives in public/hero/. */
  image?: string;
  imageAlt?: string;
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
    title: "Обновихте ли тарифите си след изтичането на ценовата гаранция?",
    subtitle:
      "Направете го сега и намалете годишните си разходи с до 30%.",
    ctaLabel: "Сравни тарифите",
    href: "/energiya-telekom/tok",
    image: "/hero/tok-gaz.png",
    imageAlt: "Електромер и газомер до знак за евро, зелена стрелка надолу и символ -30%",
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
    href: "/go/check24/n26",
    image: "/hero/bankova-smetka.png",
    imageAlt: "Илюстрация на мобилно банкиране: телефон с приложение, карта и икона за 0 евро месечна такса",
  },
];
