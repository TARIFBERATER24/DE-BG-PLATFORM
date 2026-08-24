import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line text-sm text-ink-muted">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <p className="max-w-2xl">
          Сравни.де препоръчва оферти на партньори и пренасочва към официалните
          сайтове на доставчиците. При сключен договор през наш линк получаваме
          комисионна — това не оскъпява офертата за вас.
        </p>
        <nav className="mt-4 flex flex-wrap gap-4">
          <Link href="/produkte" className="hover:text-brand">
            Сравни
          </Link>
          <Link href="/mein-deutschland" className="hover:text-brand">
            Mein Deutschland
          </Link>
          <Link href="/germaniya" className="hover:text-brand">
            Германия от А до Я
          </Link>
          <Link href="/uslugi" className="hover:text-brand">
            Услуги
          </Link>
          <Link href="/impressum" className="hover:text-brand">
            Impressum
          </Link>
          <Link href="/poveritelnost" className="hover:text-brand">
            Поверителност
          </Link>
          <Link href="/za-nas" className="hover:text-brand">
            За нас
          </Link>
        </nav>
      </div>
    </footer>
  );
}
