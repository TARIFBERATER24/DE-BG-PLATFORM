// Style reminder: Сравни.де makes German bureaucracy simple in Bulgarian—calm, credible, light, and never salesy.
import type { Metadata } from "next";
import DocumentHelpDemo from "@/components/DocumentHelpDemo";

export const metadata: Metadata = {
  title: "Демо: помощ с документи | Сравни.де",
  description:
    "Тестова страница за преглед на писмо, сметка или предупреждение от доставчик.",
  robots: { index: false, follow: false },
};

export default function DocumentHelpDemoPage() {
  return <DocumentHelpDemo />;
}
