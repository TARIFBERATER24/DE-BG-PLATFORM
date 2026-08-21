export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
};

export const services: Service[] = [
  {
    slug: "tarifna-konsultaciya",
    title: "Консултация при смяна на тарифи",
    shortDescription: "Помощ при избор и смяна на доставчик на ток и газ.",
  },
  {
    slug: "termini",
    title: "Запазване и отказване на термини",
    shortDescription: "Bürgeramt и други официални термини — за частни лица и фирми.",
  },
];
