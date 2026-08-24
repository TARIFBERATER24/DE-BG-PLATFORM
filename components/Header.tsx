import Link from "next/link";
import NavDropdown from "@/components/NavDropdown";
import SearchBar from "@/components/SearchBar";
import MobileNav from "@/components/MobileNav";
import { WhatsAppIcon } from "@/components/icons";

const WHATSAPP_URL = "https://wa.me/message/JXXTA3JHKDX3L1";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-brand-deep shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-3.5">
        <Link href="/" className="flex shrink-0 items-center gap-2 text-xl font-extrabold tracking-tight text-white">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand text-base font-extrabold text-white shadow-sm">С</span>
          <span className="whitespace-nowrap">
            Сравни<span className="text-brand-tint">.de</span>
            <span className="hidden text-sm font-medium text-white/60 sm:inline"> — сравняваш → избираш → спестяваш</span>
          </span>
        </Link>

        <div className="hidden flex-1 justify-center md:flex">
          <SearchBar />
        </div>

        <div className="ml-auto hidden items-center gap-1 lg:flex">
          <Link
            href="/mein-deutschland"
            className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10"
          >
            Mein Deutschland
          </Link>
          <Link
            href="/produkte"
            className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10"
          >
            Сравни
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-xs font-medium text-white/85 transition hover:bg-white/10"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Помощ
          </a>
          <NavDropdown />
        </div>

        <MobileNav />
      </div>

      <div className="border-t border-white/10 px-6 pb-3 pt-1 md:hidden">
        <SearchBar />
      </div>
    </header>
  );
}
