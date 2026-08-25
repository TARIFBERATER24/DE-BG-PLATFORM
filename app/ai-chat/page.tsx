import Link from "next/link";
import GoalRouter from "@/components/home/GoalRouter";
import { ChatIcon } from "@/components/icons";

export const metadata = {
  title: "AI чатбот",
  description: "Насочване към информация и услуги в Германия на български език.",
};

export default function AiChatPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-brand-tint text-brand">
          <ChatIcon className="h-6 w-6" />
        </span>
        <p className="mt-6 text-sm font-medium text-brand">AI асистент</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Какво искаш да направиш?</h1>
        <p className="mt-4 text-sm leading-7 text-ink-muted sm:text-base">
          Опиши целта си на български. В момента ще те насочим само към налични страници и услуги — без измислени отговори.
        </p>
        <div className="mt-8 rounded-lg bg-brand-deep p-5 text-left sm:p-8">
          <GoalRouter />
        </div>
        <p className="mt-5 text-xs leading-6 text-ink-subtle">
          Истинският AI чат и персонализираните отговори ще бъдат добавени след свързване на одобрен AI доставчик.
        </p>
        <Link href="/" className="mt-6 inline-flex text-sm font-semibold text-brand hover:text-brand-hover">
          Към началната страница →
        </Link>
      </div>
    </div>
  );
}

