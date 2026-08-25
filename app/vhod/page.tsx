import Link from "next/link";
import { UserIcon } from "@/components/icons";

export const metadata = {
  title: "Вход и регистрация",
  description: "Вход към личния профил в Сравни.de.",
};

export default function VhodPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-xl rounded-lg border border-line bg-surface p-6 sm:p-8">
        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-tint text-brand">
          <UserIcon className="h-6 w-6" />
        </span>
        <p className="mt-6 text-sm font-medium text-brand">Сравни.de профил</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">Вход или регистрация</h1>
        <p className="mt-4 text-sm leading-7 text-ink-muted">
          Личният профил ще съхранява твоите документи, договори и важни срокове на едно място.
        </p>

        <div className="mt-8 rounded-lg border border-alert-line bg-alert-bg p-4 text-sm leading-6 text-alert-ink">
          Профилната система е в подготовка. Когато бъде активна, оттук ще можеш да влезеш или да създадеш акаунт.
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-bold text-on-brand transition-colors hover:bg-brand-hover"
        >
          Към началната страница
        </Link>
      </div>
    </div>
  );
}

