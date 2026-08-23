import GoalRouter from "@/components/home/GoalRouter";
import TrackedLink from "@/components/home/TrackedLink";
import { WhatsAppIcon } from "@/components/icons";

const WHATSAPP_URL = "https://wa.me/message/JXXTA3JHKDX3L1";

export default function HomeHero() {
  return (
    <section className="hero-3d-bg overflow-hidden">
      <div className="mx-auto max-w-4xl px-6 py-16 text-center sm:py-24">
        <h1 className="text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl">
          Германия е сложна.
          <br />
          Ние я правим по-лесна.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
          Документи, договори, разходи и ежедневни въпроси — разбираемо на български
          и събрани на едно място.
        </p>

        <div className="mt-9">
          <GoalRouter />
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <TrackedLink
            href={WHATSAPP_URL}
            external
            event="homepage_assistant_clicked"
            payload={{ source: "hero" }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-brand-deep transition hover:bg-white/90 sm:w-auto"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Попитай асистента
          </TrackedLink>
          <TrackedLink
            href="/uslugi"
            event="homepage_products_clicked"
            payload={{ source: "hero_secondary" }}
            className="inline-flex w-full items-center justify-center rounded-full border border-white/25 px-7 py-3 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/10 sm:w-auto"
          >
            Разгледай услугите
          </TrackedLink>
        </div>

        <p className="mt-4 text-xs text-white/45">
          Днес на въпросите отговаря човек в WhatsApp. AI асистентът е в подготовка.
        </p>
      </div>
    </section>
  );
}
