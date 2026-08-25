import Link from "next/link";
import { LanguagesIcon } from "@/components/icons";

export const metadata = {
  title: "Преводач BG → DE",
  description: "Преводач от български на немски за ежедневни ситуации в Германия.",
};

export default function PrevodachPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-xl rounded-lg border border-line bg-surface p-6 sm:p-8">
        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-tint text-brand">
          <LanguagesIcon className="h-6 w-6" />
        </span>
        <p className="mt-6 text-sm font-medium text-brand">Езиков инструмент</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">Преводач BG → DE</h1>
        <p className="mt-4 text-sm leading-7 text-ink-muted">
          Подготвяме превод на кратки текстове и немски формулировки, съобразени с живота и документите в Германия.
        </p>

        <div className="mt-8 rounded-lg border border-alert-line bg-alert-bg p-4 text-sm leading-6 text-alert-ink">
          Преводачът още не е свързан с външен езиков доставчик. Не изпращай чувствителни лични данни през непроверени преводачески услуги.
        </div>

        <Link
          href="/mein-deutschland"
          className="mt-8 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-bold text-on-brand transition-colors hover:bg-brand-hover"
        >
          Разгледай Mein Deutschland
        </Link>
      </div>
    </div>
  );
}

