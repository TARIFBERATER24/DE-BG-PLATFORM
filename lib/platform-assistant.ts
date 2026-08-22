// Assistant scope: a Bulgarian navigation guide for the platform; it can route and explain, never pay, submit, contract, or contact third parties.

export const PLATFORM_ASSISTANT_ROUTES = {
  electricity: { label: "Ток в Германия", href: "/energiya-telekom/tok" },
  gas: { label: "Газ в Германия", href: "/energiya-telekom/gaz" },
  internet: { label: "Интернет", href: "/energiya-telekom/internet" },
  mobile: { label: "Мобилни планове", href: "/energiya-telekom/mobilni-planove" },
  insurance: { label: "Застраховки", href: "/zastrahovki" },
  bank: { label: "Банкова сметка", href: "/finansi/bankova-smetka" },
  germany: { label: "Германия от А до Я", href: "/germaniya" },
  documents: { label: "Помощ с документи", href: "/demo/pomosh-s-dokumenti" },
  consultation: { label: "Консултация за тарифи", href: "/uslugi/tarifna-konsultaciya" },
  appointments: { label: "Термини и Bürgeramt", href: "/uslugi/termini" },
  services: { label: "Услуги", href: "/uslugi" },
  home: { label: "Начална страница", href: "/" },
} as const;

export type PlatformAssistantRouteKey = keyof typeof PLATFORM_ASSISTANT_ROUTES;

export const PLATFORM_ASSISTANT_ROUTE_KEYS = Object.keys(PLATFORM_ASSISTANT_ROUTES) as PlatformAssistantRouteKey[];

export const PLATFORM_ASSISTANT_QUICK_PROMPTS = [
  "Искам да намаля сметката си за ток",
  "Търся интернет за нов адрес",
  "Получих немско писмо и не го разбирам",
  "Кое ми трябва първо при преместване в Германия?",
] as const;

export function isPlatformAssistantConfigured() {
  return Boolean(process.env.GROQ_API_KEY?.trim());
}
