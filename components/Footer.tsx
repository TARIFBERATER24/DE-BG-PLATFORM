import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 text-sm text-zinc-600">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <p className="max-w-2xl">
          Сравни.де препоръчва оферти на партньори и пренасочва към официалните
          сайтове на доставчиците. При сключен договор през наш линк получаваме
          комисионна — това не оскъпява офертата за вас.
        </p>
        <nav className="mt-4 flex flex-wrap gap-4">
          <Link href="/germaniya">Германия от А до Я</Link>
          <Link href="/impressum">Impressum</Link>
          <Link href="/poveritelnost">Поверителност</Link>
          <Link href="/za-nas">За нас</Link>
        </nav>
      </div>
    </footer>
  );
}
