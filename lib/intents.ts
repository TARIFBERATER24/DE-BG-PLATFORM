import { searchIndex, type SearchEntry } from "@/lib/searchIndex";

/**
 * Goal-based routing, per the UX principle in docs/MASTER_ARCHITECTURE.md: the user
 * describes what they want ("не разбирам писмо", "искам по-евтин ток") and the platform
 * sends them to the workflow that handles it.
 *
 * This is a deterministic keyword matcher over pages that genuinely exist -- not an AI
 * model and not presented as one. When a real AI orchestrator ships it replaces the
 * matching function behind this same entry point; call sites do not change.
 */

export type Intent = {
  id: string;
  /** Shown as a suggested chip in the hero. */
  label: string;
  href: string;
  /** Lowercase substrings that route to this intent. Bulgarian + German + Latin. */
  keywords: string[];
  /** Set when the destination is a concept page rather than a working workflow. */
  upcoming?: boolean;
};

export const intents: Intent[] = [
  {
    id: "document",
    label: "Не разбирам писмо",
    href: "/mein-deutschland",
    upcoming: true,
    keywords: [
      "писмо",
      "документ",
      "не разбирам",
      "какво означава",
      "получих",
      "брief",
      "brief",
      "schreiben",
      "mahnung",
      "напомняне",
      "покана",
      "формуляр",
      "превод",
    ],
  },
  {
    id: "strom",
    label: "Искам по-евтин ток",
    href: "/energiya-telekom/tok",
    keywords: [
      "ток",
      "евтин ток",
      "електри",
      "strom",
      "електромер",
      "grundversorgung",
      "енерги",
      "сметка за ток",
    ],
  },
  {
    id: "gas",
    label: "Искам по-евтин газ",
    href: "/energiya-telekom/gaz",
    keywords: ["газ", "gas", "отопление", "парно", "heizung"],
  },
  {
    id: "kuendigung",
    label: "Искам да прекратя договор",
    href: "/germaniya/kundigungsfrist",
    keywords: [
      "прекрат",
      "откажа",
      "отказ",
      "договор",
      "kündig",
      "kundig",
      "kuendig",
      "срок",
      "изтича",
      "анулир",
    ],
  },
  {
    id: "umzug",
    label: "Премествам се",
    href: "/germaniya/anmeldung",
    keywords: [
      "премест",
      "нанас",
      "местя",
      "anmeldung",
      "адрес",
      "регистрация",
      "umzug",
      "нов апартамент",
      "жилище",
    ],
  },
  {
    id: "internet",
    label: "Търся интернет",
    href: "/energiya-telekom/internet",
    keywords: ["интернет", "internet", "dsl", "wifi", "рутер", "оптика", "скорост"],
  },
  {
    id: "mobile",
    label: "Мобилен план",
    href: "/energiya-telekom/mobilni-planove",
    keywords: ["мобил", "телефон", "handy", "сим", "sim", "тарифа за телефон"],
  },
  {
    id: "kredit",
    label: "Искам кредит",
    href: "/finansi/krediti",
    keywords: ["кредит", "заем", "kredit", "финансиране", "разсрочено"],
  },
  {
    id: "konto",
    label: "Банкова сметка",
    href: "/finansi/bankova-smetka",
    keywords: ["сметка", "банка", "girokonto", "konto", "iban", "банкова"],
  },
  {
    id: "kfz",
    label: "Автозастраховка",
    href: "/zastrahovki/avto",
    keywords: ["кола", "автомобил", "автозастрах", "kfz", "haftpflicht", "kasko"],
  },
  {
    id: "schufa",
    label: "Какво е SCHUFA",
    href: "/germaniya/schufa",
    keywords: ["schufa", "шуфа", "кредитен рейтинг", "рейтинг"],
  },
  {
    id: "service",
    label: "Търся услуга",
    href: "/uslugi",
    keywords: ["услуга", "помощ", "консултация", "термин", "termin", "bürgeramt", "burgeramt"],
  },
];

/** The chips shown under the hero input. Deliberately short. */
export const featuredIntents: Intent[] = intents.filter((intent) =>
  ["document", "strom", "kuendigung", "umzug", "service"].includes(intent.id),
);

export type GoalMatch =
  | { kind: "intent"; intent: Intent }
  | { kind: "page"; entry: SearchEntry };

/**
 * Best-effort match for free-text input. Intents win over raw page-title matches
 * because they encode the user's *goal*, not just a word that appears on a page.
 * Returns null when nothing matches -- the UI then says so honestly instead of
 * guessing.
 */
export function matchGoal(query: string): GoalMatch | null {
  const q = query.trim().toLowerCase();
  if (!q) return null;

  const intent = intents.find((candidate) =>
    candidate.keywords.some((keyword) => q.includes(keyword)),
  );
  if (intent) return { kind: "intent", intent };

  const entry = searchIndex.find((candidate) => {
    const title = candidate.title.toLowerCase();
    return title.includes(q) || q.includes(title);
  });
  if (entry) return { kind: "page", entry };

  return null;
}
