import Link from "next/link";
import { type CSSProperties } from "react";
import {
  Zap,
  Flame,
  Wifi,
  Smartphone,
  Car,
  ShieldCheck,
  Home as HomeIcon,
  HeartPulse,
  Landmark,
  HandCoins,
  CreditCard,
  Scale,
  type LucideIcon,
} from "lucide-react";

type ServiceItem = {
  href: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  note?: string;
};

type ServiceBoard = {
  tab: string;
  eyebrow: string;
  title: string;
  summary: string;
  Icon: LucideIcon;
  className: string;
  items: ServiceItem[];
};

const serviceBoards: ServiceBoard[] = [
  {
    tab: "ТАБЛА 1",
    eyebrow: "ЕНЕРГИЯ",
    title: "Ток и газ",
    summary: "Основните договори за дома — подредени на едно място.",
    Icon: Zap,
    className: "service-board--energy",
    items: [
      {
        href: "/energiya-telekom/tok",
        title: "Ток",
        description: "Stromvergleich",
        Icon: Zap,
      },
      {
        href: "/energiya-telekom/gaz",
        title: "Газ",
        description: "Gasvergleich",
        Icon: Flame,
      },
    ],
  },
  {
    tab: "ТАБЛА 2",
    eyebrow: "ВРЪЗКА",
    title: "Интернет и мобилни планове",
    summary: "Сигурна връзка за дома, работата и ежедневието.",
    Icon: Wifi,
    className: "service-board--connectivity",
    items: [
      {
        href: "/energiya-telekom/internet",
        title: "Интернет",
        description: "Домашен интернет",
        Icon: Wifi,
      },
      {
        href: "/energiya-telekom/mobilni-planove",
        title: "Мобилни планове",
        description: "Handyvergleich",
        Icon: Smartphone,
      },
    ],
  },
  {
    tab: "ТАБЛА 3",
    eyebrow: "ФИНАНСИ",
    title: "Финанси",
    summary: "Банкиране, финансиране и карти с ясни следващи стъпки.",
    Icon: Landmark,
    className: "service-board--finance",
    items: [
      {
        href: "/finansi/bankova-smetka",
        title: "Банкови сметки",
        description: "Girokonto и ежедневни разплащания",
        Icon: Landmark,
      },
      {
        href: "/finansi/krediti",
        title: "Кредити",
        description: "Финансиране и условия",
        Icon: HandCoins,
      },
      {
        href: "/finansi/kreditna-karta",
        title: "Кредитни карти",
        description: "Карти и разплащания",
        Icon: CreditCard,
      },
    ],
  },
  {
    tab: "ТАБЛА 4",
    eyebrow: "ЗАЩИТА",
    title: "Застраховки",
    summary: "Провери най-важните рискове за теб и твоето семейство.",
    Icon: ShieldCheck,
    className: "service-board--insurance",
    items: [
      {
        href: "/zastrahovki/avto",
        title: "Авто застраховка",
        description: "Kfz и защита на автомобила",
        Icon: Car,
      },
      {
        href: "/zastrahovki/grazhdanska-otgovornost",
        title: "Гражданска",
        description: "Privathaftpflicht",
        Icon: ShieldCheck,
      },
      {
        href: "/zastrahovki/imushtestvo",
        title: "Застраховайте дома си",
        description: "Hausrat",
        Icon: HomeIcon,
      },
      {
        href: "/zastrahovki/zdravna-doplnitelna",
        title: "Здравни застраховки",
        description: "Допълнителна защита",
        Icon: HeartPulse,
      },
      {
        href: "/zastrahovki/pravna-zashtita",
        title: "Адвокатски разходи",
        description: "Rechtsschutzversicherung",
        Icon: Scale,
        note: "Важно за проверка в Германия",
      },
    ],
  },
];

export default function CategoryCardGrid() {
  return (
    <section aria-labelledby="service-dashboard-title" className="service-dashboard scene-3d">
      <div>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
              Услуги
            </p>
            <h2
              id="service-dashboard-title"
              className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
            >
              Подреди най-важните си услуги
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-ink-muted sm:text-base">
              Четири ясни табла, които те водят директно към правилната категория.
            </p>
          </div>
          <span className="w-fit rounded-full border border-line bg-white/80 px-3 py-1.5 text-xs font-semibold text-ink-muted">
            4 табла · 12 категории
          </span>
        </div>

        <div
          className="plane-3d mt-10 grid gap-6 lg:grid-cols-2"
          style={{ "--rx": "7deg", "--ry": "-1deg" } as CSSProperties}
        >
          {serviceBoards.map((board, index) => {
            const BoardIcon = board.Icon;

            return (
              <article
                key={board.tab}
                className={`service-board card-3d ${board.className}`}
                style={{ "--z": `${index % 2 === 0 ? 8 : 0}px` } as CSSProperties}
              >
                <div className="service-board__content">
                  <div className="service-board__tab">
                    <span>{board.tab}</span>
                    <span aria-hidden="true">↗</span>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="service-board__icon" aria-hidden="true">
                      <BoardIcon className="h-6 w-6" strokeWidth={1.8} />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink-subtle">
                        {board.eyebrow}
                      </p>
                      <h3 className="mt-1 text-xl font-semibold tracking-tight text-ink">
                        {board.title}
                      </h3>
                      <p className="mt-1 text-sm leading-5 text-ink-muted">
                        {board.summary}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {board.items.map((item) => {
                      const ItemIcon = item.Icon;

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="service-tile group"
                        >
                          <span className="service-tile__icon" aria-hidden="true">
                            <ItemIcon className="h-5 w-5" strokeWidth={1.8} />
                          </span>
                          <span className="service-tile__copy">
                            <span className="service-tile__title">{item.title}</span>
                            <span className="service-tile__description">
                              {item.description}
                            </span>
                            {item.note ? (
                              <span className="service-tile__note">{item.note}</span>
                            ) : null}
                          </span>
                          <span className="service-tile__arrow" aria-hidden="true">
                            →
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
