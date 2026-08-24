import TrackedLink from "@/components/home/TrackedLink";
import { WhatsAppIcon } from "@/components/icons";

const WHATSAPP_URL = "https://wa.me/message/JXXTA3JHKDX3L1";
const CONTACT_PHONE = "+49 157 50171967";

const topics = [
  "договори",
  "услуги",
  "документи",
  "ток и газ",
  "интернет",
  "финанси",
  "застраховки",
  "работа с платформата",
];

export default function HelpSection() {
  return (
    <section
      aria-labelledby="help-title"
      className="rounded-2xl border border-line bg-surface p-6 sm:p-10"
    >
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <h2
            id="help-title"
            className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
          >
            Помощ на български
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-ink-muted sm:text-base">
            Ако нещо не е ясно — попитай. Помагаме с информация и насочване, на
            разбираем език, без да те пращаме да четеш немски условия сам.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {topics.map((topic) => (
              <li
                key={topic}
                className="rounded-full border border-line bg-canvas px-3 py-1.5 text-xs font-medium text-ink-muted"
              >
                {topic}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-xs leading-5 text-ink-subtle">
            Предоставяме помощ, информация и насочване. Това не е правен, данъчен
            или регулиран финансов съвет.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <TrackedLink
            href={WHATSAPP_URL}
            external
            event="homepage_help_clicked"
            payload={{ source: "help_section" }}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-brand px-6 py-3 text-sm font-bold text-on-brand transition-colors hover:bg-brand-hover"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Имам нужда от помощ
          </TrackedLink>
          <a
            href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
            className="inline-flex items-center justify-center rounded-md border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-brand"
          >
            {CONTACT_PHONE}
          </a>
          <TrackedLink
            href="/uslugi"
            event="homepage_help_clicked"
            payload={{ source: "help_section_services" }}
            className="text-center text-sm font-semibold text-brand transition-colors hover:text-brand-hover"
          >
            Виж платените услуги →
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
