import type { Metadata } from "next";
import CategoryGuidePage from "@/components/CategoryGuidePage";

export const metadata: Metadata = {
  title: "Банкова сметка в Германия (Girokonto)",
  description:
    "Как да отворите Girokonto в Германия, какви документи ви трябват и разликата с Kreditkarte — обяснено на български.",
};

export default function BankovaSmetkaPage() {
  return (
    <CategoryGuidePage
      title="Банкова сметка (Girokonto)"
      intro="Girokonto е обикновената разплащателна сметка, през която минават заплата, наем и повечето абонаментни договори в Германия."
      paragraphs={[
        "За да отворите сметка, обичайно ви трябват Meldebescheinigung (потвърждение от Anmeldung) и документ за самоличност — някои онлайн банки приемат и видео-легитимация вместо посещение на клон.",
        "Повечето директни/онлайн банки предлагат безплатна основна сметка без месечна такса, докато класическите филиални банки по-често таксуват поддръжка.",
        "Girocard (дебитна карта) е основното платежно средство в Германия — не бива да се бърка с кредитна карта, която е отделен продукт с различен модел на разплащане.",
      ]}
      backHref="/finansi"
      backLabel="Всички финансови продукти"
    />
  );
}
