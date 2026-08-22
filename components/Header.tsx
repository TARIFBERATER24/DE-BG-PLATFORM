import Image from "next/image";
import Link from "next/link";
import NavDropdown from "@/components/NavDropdown";
import MobileNav from "@/components/MobileNav";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white/85 backdrop-blur-xl">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link
          href="/"
          className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center sm:static sm:translate-x-0 sm:translate-y-0"
        >
          <Image
            src="/sravni-logo.jpg"
            alt="Сравни.de"
            width={196}
            height={48}
            priority
            className="h-10 w-auto object-contain"
          />
        </Link>
        <nav className="hidden items-center gap-1 text-sm font-medium text-ink-muted lg:flex">
          <NavDropdown />
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
