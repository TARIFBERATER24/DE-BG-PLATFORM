import TrackedLink from "@/components/home/TrackedLink";
import { FolderLockIcon, SparkIcon, BellIcon } from "@/components/icons";

const features = [
  {
    Icon: FolderLockIcon,
    title: "AI Intelligence Document Vault",
    description:
      "Съхранявай важните си документи сигурно и ги намирай когато ти потрябват.",
  },
  {
    Icon: SparkIcon,
    title: "AI Document Understanding",
    description:
      "AI разпознава документа и ти обяснява на български какво означава и какво трябва да направиш.",
  },
  {
    Icon: BellIcon,
    title: "Intelligent Alerts",
    description:
      "Важните срокове идват при теб навреме, вместо да ги откриваш след като са минали.",
  },
];

const alerts = [
  "След 1 месец трябва да отчетеш електромера.",
  "След 30 дни изтича Preisgarantie по договора ти за газ.",
  "След 14 дни изтича срокът за отговор на това писмо.",
];

export default function MeinDeutschlandPreview() {
  return (
    <section
      aria-labelledby="mein-deutschland-title"
      className="overflow-hidden rounded-2xl bg-brand-deep px-6 py-12 text-white sm:px-10 sm:py-14"
    >
      <span className="inline-flex items-center rounded-full border border-white/25 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-white/70">
        В подготовка
      </span>

      <h2
        id="mein-deutschland-title"
        className="mt-4 text-2xl font-semibold tracking-tight sm:text-4xl"
      >
        Mein Deutschland
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
        Твоят личен AI център за документи, договори и важни срокове.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        <ul className="space-y-6">
          {features.map(({ Icon, title, description }) => (
            <li key={title} className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-white/60">{description}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="rounded-xl border border-white/12 bg-white/5 p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-white/45">
            Примерни напомняния
          </p>
          <ul className="mt-4 space-y-3">
            {alerts.map((alert) => (
              <li
                key={alert}
                className="flex items-start gap-3 rounded-lg bg-white/8 px-4 py-3 text-sm leading-6 text-white/85"
              >
                <BellIcon className="mt-0.5 h-4 w-4 shrink-0 text-white/45" />
                {alert}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-white/40">
            Илюстративни примери, а не реални напомняния.
          </p>
        </div>
      </div>

      <TrackedLink
        href="/mein-deutschland"
        event="homepage_mein_deutschland_clicked"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-brand-deep transition hover:bg-white/90"
      >
        Разгледай Mein Deutschland
        <span aria-hidden="true">→</span>
      </TrackedLink>
    </section>
  );
}
