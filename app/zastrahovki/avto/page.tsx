import CategoryGuidePage from "@/components/CategoryGuidePage";

export default function AvtoPage() {
  return (
    <CategoryGuidePage
      title="Автомобилна застраховка (Kfz-Versicherung)"
      intro="За да регистрирате кола в Германия, ви трябва поне задължителна застраховка гражданска отговорност за МПС (Kfz-Haftpflicht)."
      paragraphs={[
        "Има три нива на покритие: Kfz-Haftpflicht (задължителна, покрива щети на трети лица), Teilkasko (добавя кражба, пожар, счупено стъкло) и Vollkasko (добавя и щети по собствената кола, дори по ваша вина).",
        "Цената зависи основно от Schadenfreiheitsklasse (клас безрискова история — колкото по-дълго карате без щети, толкова по-евтина е застраховката) и Regionalklasse (район на регистрация).",
        "Като нов шофьор в Германия без немска история обикновено стартирате от най-високия рисков клас — с времето класът се подобрява годишно без щети.",
      ]}
      backHref="/zastrahovki"
      backLabel="Всички застраховки"
    />
  );
}
