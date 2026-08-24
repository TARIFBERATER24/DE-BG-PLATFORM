import TrackedLink from "@/components/home/TrackedLink";
import { ChatIcon } from "@/components/icons";

const WHATSAPP_URL = "https://wa.me/message/JXXTA3JHKDX3L1";

const examples = [
  "„Получих писмо от Vodafone. Какво означава?“",
  "„Искам кредит.“",
  "„Премествам се в друг град.“",
  "„Кога ми изтича договорът за газ?“",
];

export default function AssistantConcept() {
  return (
    <section aria-labelledby="assistant-title" className="border-t border-line pt-14">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-tint text-brand">
            <ChatIcon className="h-6 w-6" />
          </span>
          <h2
            id="assistant-title"
            className="mt-4 text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
          >
            Един въпрос вместо десет търсения
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-ink-muted sm:text-base">
            Вместо да отгатваш коя немска дума да напишеш в Google, опиши целта си
            с твои думи. Платформата те насочва към стъпката, която върши работа —
            обяснение, сравнение или човек, който да помогне.
          </p>

          <div className="mt-6 rounded-lg border border-alert-line bg-alert-bg p-4 text-sm leading-6 text-alert-ink">
            AI асистентът още се изгражда. Днес търсенето в началото на страницата
            те насочва към готовите страници, а на конкретни въпроси отговаря човек.
          </div>

          <TrackedLink
            href={WHATSAPP_URL}
            external
            event="homepage_assistant_clicked"
            payload={{ source: "assistant_section" }}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3 text-sm font-bold text-on-brand transition-colors hover:bg-brand-hover"
          >
            Попитай AI
            <span aria-hidden="true">→</span>
          </TrackedLink>
        </div>

        <ul className="space-y-3">
          {examples.map((example) => (
            <li
              key={example}
              className="rounded-lg border border-line bg-surface px-5 py-4 text-sm leading-6 text-ink"
            >
              {example}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
