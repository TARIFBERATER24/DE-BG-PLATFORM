export default function PoveritelnostPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">
        Политика за поверителност
      </h1>

      <div className="mt-6 rounded-lg border border-alert-line bg-alert-bg p-4 text-sm text-alert-ink">
        Тази страница е плейсхолдър. Пълна Datenschutzerklärung (съгласно
        DSGVO и TDDDG §25) трябва да се изготви от адвокат преди реално
        пускане на сайта — тя трябва да изброи всички affiliate мрежи,
        аналитични инструменти и доставчици на хостинг като получатели на
        данни.
      </div>

      <div className="mt-8 space-y-4 text-sm text-ink">
        <p>
          При посещение на сайта обработваме ограничени данни, необходими за
          неговата работа: технически логове и, при съгласие, анонимизирана
          статистика за посещенията.
        </p>
        <p>
          При клик върху партньорски линк записваме факта на клика (без лични
          данни) с цел разпределение на комисионни между нас и партньорската
          мрежа.
        </p>
        <p>
          Проследяващи бисквитки и аналитика се задействат само след изрично
          съгласие през банера за бисквитки.
        </p>
      </div>
    </div>
  );
}
