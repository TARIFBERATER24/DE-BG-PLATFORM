import type { MetadataRoute } from "next";
import { featureFlags } from "@/lib/feature-flags";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

const routes = [
  "",
  "/energiya-telekom",
  "/energiya-telekom/tok",
  "/energiya-telekom/gaz",
  "/energiya-telekom/internet",
  "/energiya-telekom/mobilni-planove",
  "/zastrahovki",
  "/zastrahovki/grazhdanska-otgovornost",
  "/zastrahovki/avto",
  "/zastrahovki/imushtestvo",
  "/zastrahovki/zdravna-doplnitelna",
  "/finansi",
  "/finansi/bankova-smetka",
  "/finansi/krediti",
  "/finansi/kreditna-karta",
  "/germaniya",
  "/germaniya/anmeldung",
  "/germaniya/iban-sepa",
  "/germaniya/schufa",
  "/germaniya/kundigungsfrist",
  "/uslugi",
  "/uslugi/tarifna-konsultaciya",
  "/uslugi/termini",
  ...(featureFlags.autoInsuranceFinder ? ["/uslugi/avtozastrahovka"] : []),
  ...(featureFlags.billCorrection ? ["/uslugi/korekciya-smetki"] : []),
  "/za-nas",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
  }));
}
