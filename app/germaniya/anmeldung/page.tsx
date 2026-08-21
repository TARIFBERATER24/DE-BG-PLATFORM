import Link from "next/link";

export default function AnmeldungPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm text-zinc-500">
        <Link href="/germaniya">Германия от А до Я</Link> · Стъпка 1
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        Какво е Anmeldung
      </h1>

      <div className="mt-6 space-y-4 text-zinc-700">
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

      <div className="mt-10 rounded-xl border border-black/10 p-6">
        <h2 className="font-semibold">Следваща стъпка</h2>
        <p className="mt-2 text-sm text-zinc-600">
          След Anmeldung обикновено следва отваряне на банкова сметка и проверка
          на SCHUFA рейтинга.
        </p>
        <Link
          href="/germaniya/schufa"
          className="mt-3 inline-block text-sm font-medium text-blue-600"
        >
          Какво е SCHUFA →
        </Link>
      </div>
    </div>
  );
}
