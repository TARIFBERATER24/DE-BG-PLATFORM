import { WhatsAppIcon } from "@/components/icons";

const CONTACT_PHONE = "+49 157 50171967";
const WHATSAPP_URL = "https://wa.me/message/JXXTA3JHKDX3L1";

type HelpButtonProps = {
  topic: string;
};

/**
 * WhatsApp deep link for now. Swap WHATSAPP_URL for the chat-bot embed's
 * open-trigger once that's wired up -- everything else about this button
 * stays the same. `topic` is unused by the link itself (wa.me doesn't take a
 * prefill message for this link type) but kept so callers stay unchanged.
 */
export default function HelpButton({ topic: _topic }: HelpButtonProps) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3 rounded-lg border border-line bg-surface p-4">
      <p className="text-sm text-ink-muted">
        Имате въпрос или не сте сигурни кое е подходящо за вас?
      </p>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-auto inline-flex items-center gap-2 rounded-md border border-brand px-4 py-2 text-sm font-medium text-brand transition-colors hover:bg-brand-tint"
      >
        <WhatsAppIcon className="h-4 w-4" />
        Безплатна помощ в WhatsApp
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
