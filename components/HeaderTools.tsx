import Link from "next/link";
import { ChatIcon, LanguagesIcon, UserIcon } from "@/components/icons";

type Tool = {
  href: string;
  label: string;
  detail?: string;
  compactLabel?: string;
  Icon: typeof UserIcon;
};

const TOOLS: Tool[] = [
  { href: "/vhod", label: "Вход", Icon: UserIcon },
  { href: "/prevodach", label: "Преводач", detail: "BG → DE", Icon: LanguagesIcon },
  { href: "/ai-chat", label: "AI чатбот", compactLabel: "AI", Icon: ChatIcon },
];

type HeaderToolsProps = {
  mobile?: boolean;
  onNavigate?: () => void;
};

export default function HeaderTools({ mobile = false, onNavigate }: HeaderToolsProps) {
  return (
    <div className={mobile ? "grid gap-1 border-b border-line pb-3" : "flex items-center gap-1"}>
      {TOOLS.map(({ href, label, detail, compactLabel, Icon }) => (
        <Link
          key={href}
          href={href}
          onClick={onNavigate}
          title={detail ? `${label} — ${detail}` : label}
          className={
            mobile
              ? "flex items-center gap-3 rounded-md px-2 py-2.5 text-ink transition hover:bg-surface"
              : "flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-2 text-xs font-medium text-white/85 transition hover:bg-white/10"
          }
        >
          <Icon className={mobile ? "h-5 w-5 text-brand" : "h-4.5 w-4.5"} />
          <span className={mobile ? undefined : "hidden 2xl:inline"}>{label}</span>
          {compactLabel ? (
            <span className={mobile ? "hidden" : "2xl:hidden"}>{compactLabel}</span>
          ) : null}
          {detail ? (
            <span className={mobile ? "text-ink-subtle" : "text-white/55"}>
              {detail}
            </span>
          ) : null}
        </Link>
      ))}
    </div>
  );
}

