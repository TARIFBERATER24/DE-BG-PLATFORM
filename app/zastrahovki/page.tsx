import Link from "next/link";

export default function ZastrahovkiPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Застраховки</h1>
      <div className="mt-6 rounded-xl border border-black/10 bg-zinc-50 p-6">
        <p className="text-zinc-700">
          Тази секция е в подготовка. Сравнението на застрахователни продукти в
          Германия изисква допълнителен правен преглед, преди да пуснем реални
          оферти на живо.
        </p>
        <p className="mt-3 text-sm text-zinc-600">
          Междувременно, ако тепърва се установявате в Германия, вижте{" "}
          <Link href="/germaniya" className="font-medium text-blue-600">
            водача Германия от А до Я
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
