export type Vertical = {
  slug: string;
  title: string;
  shortDescription: string;
  status: "live" | "coming-soon";
};

export const verticals: Vertical[] = [
  {
    slug: "energiya-telekom",
    title: "Енергия и телеком",
    shortDescription: "Ток, газ, интернет и мобилни планове в Германия.",
    status: "live",
  },
  {
    slug: "zastrahovki",
    title: "Застраховки",
    shortDescription: "Автомобилни, здравни и имуществени застраховки.",
    status: "coming-soon",
  },
  {
    slug: "finansi",
    title: "Финансови продукти",
    shortDescription: "Банкови сметки, кредити и кредитни карти.",
    status: "coming-soon",
  },
];
