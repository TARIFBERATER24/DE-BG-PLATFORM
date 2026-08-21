import Link from "next/link";
import { verticals } from "@/lib/verticals";
import MobileNav from "@/components/MobileNav";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-ink">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-sm font-extrabold text-white shadow-sm">С</span>
          <span>Сравни<span className="text-brand">.де</span></span>
        </Link>
        <nav className="hidden items-center gap-1 text-sm font-medium text-ink-muted lg:flex">
          {verticals.map((vertical) => (
            <Link key={vertical.slug} href={`/${vertical.slug}`} className="rounded-lg px-3 py-2 transition hover:bg-brand-tint hover:text-brand">
              {vertical.title}
            </Link>
          ))}
          <Link href="/germaniya" className="rounded-lg px-3 py-2 transition hover:bg-brand-tint hover:text-brand">Германия от А до Я</Link>
          <Link href="/uslugi" className="rounded-lg px-3 py-2 transition hover:bg-brand-tint hover:text-brand">Услуги</Link>
          <Link href="/za-nas" className="ml-1 rounded-xl bg-brand px-4 py-2.5 font-semibold text-white shadow-sm transition hover:bg-brand-hover">За нас</Link>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
