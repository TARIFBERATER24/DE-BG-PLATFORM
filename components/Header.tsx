import Link from "next/link";
import { verticals } from "@/lib/verticals";
import MobileNav from "@/components/MobileNav";

export default function Header() {
  return (
    <header className="relative border-b border-line">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-ink">
          Сравни<span className="text-brand">.де</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-ink sm:flex">
          {verticals.map((vertical) => (
            <Link key={vertical.slug} href={`/${vertical.slug}`} className="hover:text-brand">
              {vertical.title}
            </Link>
          ))}
          <Link href="/germaniya" className="hover:text-brand">
            Германия от А до Я
          </Link>
          <Link href="/za-nas" className="hover:text-brand">
            За нас
          </Link>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
