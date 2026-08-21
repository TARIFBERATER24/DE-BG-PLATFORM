import Link from "next/link";

type CategoryGuidePageProps = {
  title: string;
  intro: string;
  paragraphs: string[];
  backHref: string;
  backLabel: string;
};

export default function CategoryGuidePage({
  title,
  intro,
  paragraphs,
  backHref,
  backLabel,
}: CategoryGuidePageProps) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-4 text-zinc-600">{intro}</p>

      <div className="mt-6 space-y-4 text-zinc-700">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-amber-300 bg-amber-50 p-6 text-sm text-amber-900">
        Тази категория все още не приема реален трафик — очаква потвърждение
        от адвокат, че моделът остава реклама, а не застрахователно/кредитно
        посредничество (§34d / §34c GewO), преди да добавим сравнение на
        реални оферти.
      </div>

      <Link
        href={backHref}
        className="mt-6 inline-block text-sm font-medium text-blue-600"
      >
        ← {backLabel}
      </Link>
    </div>
  );
}
