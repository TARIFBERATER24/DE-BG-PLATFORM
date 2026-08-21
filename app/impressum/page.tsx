import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false, follow: false },
};

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">Impressum</h1>

      <div className="mt-6 rounded-lg border border-alert-line bg-alert-bg p-4 text-sm text-alert-ink">
        Тази страница е плейсхолдър и не е готова за реална експлоатация.
        Съдържанието по-долу трябва да се попълни с реални данни след
        Gewerbeanmeldung и да се провери от адвокат, преди сайтът да приема
        реален трафик или да кандидатства пред affiliate мрежи.
      </div>

      <dl className="mt-8 space-y-4 text-sm text-ink">
        <div>
          <dt className="font-semibold">Ангажирано лице / фирма (§5 DDG)</dt>
          <dd>[Име и правна форма]</dd>
        </div>
        <div>
          <dt className="font-semibold">Адрес</dt>
          <dd>[Улица, номер, пощенски код, град, Германия]</dd>
        </div>
        <div>
          <dt className="font-semibold">Контакт</dt>
          <dd>[Имейл] · [Телефон]</dd>
        </div>
        <div>
          <dt className="font-semibold">Данъчен номер / ДДС номер</dt>
          <dd>[Steuernummer / USt-IdNr.]</dd>
        </div>
        <div>
          <dt className="font-semibold">
            Отговорен за съдържанието (§18 MStV)
          </dt>
          <dd>[Име]</dd>
        </div>
      </dl>
    </div>
  );
}
