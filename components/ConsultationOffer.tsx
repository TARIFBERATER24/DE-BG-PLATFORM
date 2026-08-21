const CONTACT_EMAIL = "tarifberatung24@gmail.com";
const CONTACT_PHONE = "+49 157 50171967";

type ConsultationOfferProps = {
  /** Genitive form used in the copy and mail subject, e.g. "ток" or "газ". */
  utility: string;
};

export default function ConsultationOffer({ utility }: ConsultationOfferProps) {
  return (
    <section className="mt-10 rounded-lg border border-line bg-surface p-6">
      <h2 className="text-xl font-semibold tracking-tight text-ink">
        Безплатна консултация и анализ
      </h2>
      <p className="mt-3 text-ink-muted">
        Преглеждаме текущата ви тарифа, реалното потребление и годишните
        сметки — на български — и намираме по-изгоден договор с гаранция на
        цената.
      </p>

      <div className="mt-5 rounded-lg border border-positive-line bg-positive-bg p-4">
        <p className="text-sm leading-6 text-ink">
          Ако още сте на{" "}
          <strong className="font-semibold">Grundversorgung</strong> —
          стандартното снабдяване, в което попадате автоматично при нанасяне —
          разликата до изгоден договор често е{" "}
          <span className="financial-number text-positive">около 30%</span> от
          годишните ви разходи за {utility}.
        </p>
        <p className="mt-2 text-xs leading-5 text-ink-subtle">
          Ориентировъчна стойност за преминаване от стандартно снабдяване.
          Реалната икономия зависи от адрес, потребление и текущия ви договор —
          ще я изчислим конкретно за вашия случай.
        </p>
      </div>

      <ul className="mt-5 space-y-2 text-sm text-ink-muted">
        {[
          "Анализ на текущата ви тарифа и условията по договора",
          "Проверка на реалното потребление спрямо начисленото",
          "Преглед на годишната сметка за неправомерни начисления",
          "Избор на договор с гаранция на цената",
          "Поемаме прекратяването на стария договор",
        ].map((item) => (
          <li key={item.slice(0, 24)} className="flex gap-2">
            <span aria-hidden="true" className="text-positive">
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
            `Безплатна консултация за ${utility}`,
          )}`}
          className="inline-flex rounded-md bg-brand px-5 py-2.5 text-sm font-medium text-on-brand transition-colors hover:bg-brand-hover"
        >
          Заявете безплатна консултация
        </a>
        <a
          href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
          className="inline-flex items-center rounded-md border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-brand"
        >
          {CONTACT_PHONE}
        </a>
      </div>

      <p className="mt-4 border-t border-line pt-4 text-xs leading-5 text-ink-subtle">
        Безплатно за вас — възнаграждението ни идва от доставчика при сключен
        договор, без това да оскъпява тарифата ви.
      </p>
    </section>
  );
}
