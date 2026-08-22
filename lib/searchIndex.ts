import { homeCategories } from "@/lib/categories";

export type SearchEntry = {
  href: string;
  title: string;
};

/**
 * Real, working search over actual pages -- not a decorative input. Built
 * from homeCategories plus the few standalone pages a visitor would
 * plausibly type ("Германия", "услуги" etc). No fabricated results.
 */
export const searchIndex: SearchEntry[] = [
  ...homeCategories,
  { href: "/germaniya", title: "Германия от А до Я" },
  { href: "/germaniya/anmeldung", title: "Anmeldung — адресна регистрация" },
  { href: "/germaniya/schufa", title: "SCHUFA — кредитен рейтинг" },
  { href: "/germaniya/iban-sepa", title: "IBAN и SEPA" },
  { href: "/germaniya/kundigungsfrist", title: "Kündigungsfrist — прекратяване на договор" },
  { href: "/uslugi", title: "Платени услуги" },
  { href: "/uslugi/tarifna-konsultaciya", title: "Консултация при смяна на тарифи" },
  { href: "/uslugi/termini", title: "Запазване и отказване на термини" },
];

export function searchPages(query: string, limit = 6): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return searchIndex
    .filter((entry) => entry.title.toLowerCase().includes(q))
    .slice(0, limit);
}
