export type HeroSlide = {
  id: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  href: string;
  /** Short white caption line shown directly under the title. */
  tagline?: string;
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
    title: "Намалете годишните си разходи",
    tagline: "ТОК* ГАЗ* ОТОПЛЕНИЕ",
    subtitle:
      "Често с около 30%, а дори и повече ако имате Базова тарифа.",
    ctaLabel: "Сравни тарифите",
    href: "/energiya-telekom/tok#power-iframe-widget",
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
    image: "/hero/internet.png",
    imageAlt: "Рутер, скоростомер на 928 Mbps и оптичен кабел до карти за DSL, кабел и оптика с надпис Наличност",
  },
  {
    id: "avto",
    title: "Автозастраховка, обяснена на български",
    subtitle:
      "Haftpflicht, Teilkasko и Vollkasko — какво покрива всяко и кое ви трябва.",
    ctaLabel: "Изчисли ориентировъчна цена",
    href: "/zastrahovki/avto#kfz-estimator",
    image: "/hero/avtozastrahovka.png",
    imageAlt: "Автомобил до светещ щит с отметка и застрахователна полица, с етикети Haftpflicht, Teilkasko и Vollkasko",
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
