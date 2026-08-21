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
          <dd>Tarifberater24</dd>
        </div>
        <div>
          <dt className="font-semibold">Представлявано от</dt>
          <dd>Svetlozar Gitsov</dd>
        </div>
        <div>
          <dt className="font-semibold">Адрес</dt>
          <dd>[Улица и номер], 66798 Wallerfangen, Deutschland</dd>
        </div>
        <div>
          <dt className="font-semibold">Контакт</dt>
          <dd>tarifberatung24@gmail.com · +49 157 50171967</dd>
        </div>
        <div>
          <dt className="font-semibold">Данъчен номер / ДДС номер</dt>
          <dd>USt-IdNr. (§27a UStG): DE460450930</dd>
        </div>
        <div>
          <dt className="font-semibold">
            Отговорен за съдържанието (§18 MStV)
          </dt>
          <dd>Svetlozar Gitsov</dd>
        </div>
      </dl>
    </div>
  );
}
