import { featureFlags } from "@/lib/feature-flags";

export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  enabled: boolean;
  regulatorNote?: string;
};

export const services: Service[] = [
  {
    slug: "tarifna-konsultaciya",
    title: "Консултация при смяна на тарифи",
    shortDescription: "Помощ при избор и смяна на доставчик на ток и газ.",
    enabled: true,
  },
  {
    slug: "termini",
    title: "Запазване и отказване на термини",
    shortDescription: "Bürgeramt и други официални термини — за частни лица и фирми.",
    enabled: true,
  },
  {
    slug: "avtozastrahovka",
    title: "Намиране на автомобилна застраховка",
    shortDescription: "Търсим и предлагаме няколко подходящи полици вместо вас.",
    enabled: featureFlags.autoInsuranceFinder,
    regulatorNote:
      "Изисква §34d или §34e GewO регистрация (Versicherungsmakler/-berater) — IHK разрешение, Vermögensschadenhaftpflicht, Vermittlerregister номер. Не активирайте без потвърдена регистрация.",
  },
  {
    slug: "korekciya-smetki",
    title: "Корекция на годишни сметки",
    shortDescription: "Проверка на сметки за ток/газ и възстановяване на надплатени суми.",
    enabled: featureFlags.billCorrection,
    regulatorNote:
      "Изисква §10 RDG регистрация (Inkassodienstleister) или партньорство с адвокат за успешен хонорар модел. Не активирайте без потвърдена регистрация/партньорство.",
  },
];

export const visibleServices = services.filter((service) => service.enabled);
