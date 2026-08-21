import Link from "next/link";
import { verticals } from "@/lib/verticals";

export default function Header() {
  return (
    <header className="border-b border-black/10">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Сравни<span className="text-blue-600">.де</span>
        </Link>
        <nav className="hidden gap-6 text-sm font-medium sm:flex">
          {verticals.map((vertical) => (
            <Link key={vertical.slug} href={`/${vertical.slug}`}>
              {vertical.title}
            </Link>
          ))}
          <Link href="/za-nas">За нас</Link>
        </nav>
      </div>
    </header>
  );
}
