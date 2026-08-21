import Link from "next/link";

export default function AnmeldungPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm text-ink-subtle">
        <Link href="/germaniya" className="hover:text-brand">
          Германия от А до Я
        </Link>{" "}
        · Стъпка 1
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">
        Какво е Anmeldung
      </h1>

      <div className="mt-6 space-y-4 text-ink">
        <p>
          Anmeldung е регистрация на постоянния ви адрес пред местната
          администрация (Bürgeramt / Einwohnermeldeamt). Задължителна е в
          рамките на около 2 седмици след нанасяне на нов адрес.
        </p>
        <p>
          Нужен ви е попълнен формуляр (Anmeldeformular), документ за
          самоличност и потвърждение от наемодателя (Wohnungsgeberbestätigung)
          — то се издава от собственика или управителя на имота.
        </p>
        <p>
          След регистрацията получавате Meldebescheinigung — документ, който
          ще ви трябва почти навсякъде: банка, застрахователна компания,
          доставчик на интернет, дори мобилен оператор.
        </p>
        <p>
          Без Anmeldung на практика не можете да отворите банкова сметка на
          свое име, а без банкова сметка не можете да платите повечето
          абонаментни договори в Германия — затова е логично първата стъпка.
        </p>
      </div>

      <div className="mt-10 rounded-lg border border-line p-6">
        <h2 className="font-semibold text-ink">Следваща стъпка</h2>
        <p className="mt-2 text-sm text-ink-muted">
          След Anmeldung обикновено следва отваряне на банкова сметка и проверка
          на SCHUFA рейтинга.
        </p>
        <Link
          href="/germaniya/schufa"
          className="mt-3 inline-block text-sm font-medium text-brand hover:text-brand-hover"
        >
          Какво е SCHUFA →
        </Link>
      </div>
    </div>
  );
}
