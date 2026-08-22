import Link from "next/link";
import NavDropdown from "@/components/NavDropdown";
import MobileNav from "@/components/MobileNav";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-ink">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand text-sm font-extrabold text-white shadow-sm">С</span>
          <span className="whitespace-nowrap">
            Сравни<span className="text-brand">.de</span>
            <span className="hidden sm:inline"> — сравняваш → избираш → спестяваш</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 text-sm font-medium text-ink-muted lg:flex">
          <NavDropdown />
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
