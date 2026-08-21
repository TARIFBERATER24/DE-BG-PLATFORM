const CONTACT_EMAIL = "tarifberatung24@gmail.com";
const CONTACT_PHONE = "+49 157 50171967";

type HelpButtonProps = {
  topic: string;
};

/**
 * mailto/tel for now. Swap the href for the chat-bot embed's open-trigger
 * once that's wired up -- everything else about this button stays the same.
 */
export default function HelpButton({ topic }: HelpButtonProps) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3 rounded-lg border border-line bg-surface p-4">
      <p className="text-sm text-ink-muted">
        Имате въпрос или не сте сигурни кое е подходящо за вас?
      </p>
      <a
        href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Безплатна помощ: ${topic}`)}`}
        className="ml-auto inline-flex rounded-md border border-brand px-4 py-2 text-sm font-medium text-brand transition-colors hover:bg-brand-tint"
      >
        Безплатна помощ →
      </a>
      <a
        href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
        className="text-sm font-medium text-ink-muted transition-colors hover:text-brand"
      >
        {CONTACT_PHONE}
      </a>
    </div>
  );
}
