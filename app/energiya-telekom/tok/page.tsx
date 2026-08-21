import AffiliateLink from "@/components/AffiliateLink";

export default function TokPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        Сравнение на доставчици на ток
      </h1>
      <p className="mt-4 text-zinc-600">
        В Германия можете свободно да смените доставчика си на електроенергия
        по всяко време — цената зависи от район, потребление и оператор.
      </p>

      <div className="mt-10 rounded-lg border border-black/10 p-6">
        <h2 className="font-semibold">Сравни оферти за ток</h2>
        <p className="mt-2 text-sm text-zinc-600">
          Ще бъдете пренасочени към официалния сравнителен инструмент на нашия
          партньор.
        </p>
        <div className="mt-4">
          <AffiliateLink
            network="financeads"
            slug="stromvergleich"
            className="inline-flex rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Сравни оферти за ток →
          </AffiliateLink>
        </div>
      </div>
    </div>
  );
}
