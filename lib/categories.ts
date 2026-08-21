import type { VerticalIcon } from "@/lib/verticals";

export type HomeCategory = {
  href: string;
  title: string;
  icon: VerticalIcon;
};

/**
 * Every comparison category, flat, for the homepage. Deliberately not grouped
 * by vertical here -- the homepage sells individual products the way a visitor
 * thinks about them ("ток", "автозастраховка"), while /energiya-telekom and
 * friends keep the vertical grouping.
 */
export const homeCategories: HomeCategory[] = [
  { href: "/energiya-telekom/tok", title: "Ток", icon: "bolt" },
  { href: "/energiya-telekom/gaz", title: "Газ", icon: "bolt" },
  { href: "/energiya-telekom/internet", title: "Интернет", icon: "bolt" },
  { href: "/energiya-telekom/mobilni-planove", title: "Мобилни планове", icon: "bolt" },
  { href: "/zastrahovki/avto", title: "Автозастраховка", icon: "shield" },
  { href: "/zastrahovki/grazhdanska-otgovornost", title: "Гражданска отговорност", icon: "shield" },
  { href: "/zastrahovki/imushtestvo", title: "Домашно имущество", icon: "shield" },
  { href: "/zastrahovki/zdravna-doplnitelna", title: "Допълнителна здравна", icon: "shield" },
  { href: "/finansi/bankova-smetka", title: "Банкова сметка", icon: "wallet" },
  { href: "/finansi/krediti", title: "Кредити", icon: "wallet" },
  { href: "/finansi/kreditna-karta", title: "Кредитни карти", icon: "wallet" },
];

/** Shown as pills in the hero -- the ones people search for most. */
export const heroPills: HomeCategory[] = homeCategories.filter((c) =>
  [
    "/energiya-telekom/tok",
    "/energiya-telekom/gaz",
    "/energiya-telekom/internet",
    "/energiya-telekom/mobilni-planove",
    "/zastrahovki/avto",
    "/finansi/bankova-smetka",
    "/finansi/krediti",
    "/finansi/kreditna-karta",
  ].includes(c.href),
);
