import CategoryGuidePage from "@/components/CategoryGuidePage";

export default function KreditiPage() {
  return (
    <CategoryGuidePage
      title="Потребителски кредит (Ratenkredit)"
      intro="Стандартен вноски кредит за по-голяма покупка или консолидация на разходи, изплащан на равни месечни вноски за фиксиран срок."
      paragraphs={[
        "Ключовият показател за сравнение е effektiver Jahreszins (реален годишен лихвен процент) — той включва всички такси, за разлика от номиналната лихва.",
        "Одобрението и лихвата зависят силно от вашия SCHUFA рейтинг и доказан стабилен доход в Германия.",
      ]}
      backHref="/finansi"
      backLabel="Всички финансови продукти"
    />
  );
}
