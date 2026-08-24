import TrackedLink from "@/components/home/TrackedLink";
import { DocumentIcon, PiggyIcon, PenIcon, CompassIcon } from "@/components/icons";
import type { AnalyticsEvent } from "@/lib/analytics";

type ActionCard = {
  Icon: typeof DocumentIcon;
  title: string;
  description: string;
  cta: string;
  href: string;
  event: AnalyticsEvent;
  upcoming?: boolean;
};

const cards: ActionCard[] = [
  {
    Icon: DocumentIcon,
    title: "Разбери документ",
    description:
      "Качи немски документ и получи ясно обяснение на български.",
    cta: "Качи документ",
    href: "/mein-deutschland",
    event: "homepage_document_clicked",
    upcoming: true,
  },
  {
    Icon: PiggyIcon,
    title: "Намали разходите си",
    description:
      "Провери ток, газ, интернет, мобилни планове, финанси и застраховки.",
    cta: "Провери разходите",
    href: "/produkte",
    event: "homepage_products_clicked",
  },
  {
    Icon: PenIcon,
    title: "Създай писмо",
    description:
      "Подготви немско писмо за често срещани административни и договорни ситуации.",
    cta: "Създай писмо",
    href: "/mein-deutschland",
    event: "homepage_document_clicked",
    upcoming: true,
  },
  {
    Icon: CompassIcon,
    title: "Германия от А до Я",
    description:
      "Практична информация за институции, договори, SCHUFA, Anmeldung, банки и ежедневието в Германия.",
    cta: "Отвори водача",
    href: "/germaniya",
    event: "homepage_germany_guide_clicked",
  },
];

export default function ActionCards() {
  return (
    <section aria-labelledby="actions-title">
      <h2
        id="actions-title"
        className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
      >
        Какво искаш да направиш?
      </h2>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {cards.map((card) => (
          <TrackedLink
            key={card.title}
            href={card.href}
            event={card.event}
            payload={{ card: card.title }}
            className="group flex flex-col rounded-lg border border-line bg-surface p-6 transition-colors hover:border-brand hover:shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-tint text-brand">
                <card.Icon className="h-6 w-6" />
              </span>
              {card.upcoming ? (
                <span className="rounded-full border border-alert-line bg-alert-bg px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-alert-ink">
                  Скоро
                </span>
              ) : null}
            </div>

            <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink">
              {card.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-6 text-ink-muted">
              {card.description}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
              {card.cta}
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </TrackedLink>
        ))}
      </div>

      <p className="mt-4 text-xs text-ink-subtle">
        Функциите, отбелязани със „скоро“, още не са активни — страницата обяснява
        какво предстои.
      </p>
    </section>
  );
}
