import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Какво е IBAN и SEPA",
  description:
    "Как работи IBAN номерът и SEPA плащанията в Германия, и защо повечето договори там се плащат чрез директен дебит (Lastschrift). Обяснено на български.",
};

export default function IbanSepaPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm text-ink-subtle">
        <Link href="/germaniya" className="hover:text-brand">
          Германия от А до Я
        </Link>{" "}
        · Стъпка 2
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">
        Какво е IBAN и SEPA
      </h1>

      <div className="mt-6 space-y-4 text-ink">
        <p>
          IBAN (International Bank Account Number) е международният формат на
          номера на банковата ви сметка. Немският IBAN започва с &quot;DE&quot;,
          следван от 20 цифри — намирате го в приложението на банката или на
          документа, който получавате при отваряне на сметката.
        </p>
        <p>
          SEPA (Single Euro Payments Area) е зоната, в която преводи в евро
          между сметки — включително между German и български IBAN — вървят
          като вътрешни, без допълнителни такси за валутно конвертиране и
          обикновено за 1 работен ден.
        </p>
        <p>
          Най-важното за новодошъл: в Германия повечето доставчици — на ток,
          газ, интернет, застраховка, дори наемодателят — не чакат вие да им
          превеждате пари всеки месец. Вместо това искат SEPA-Lastschriftmandat
          (пълномощно за директен дебит) и сами теглят сумата от сметката ви на
          договорена дата.
        </p>
        <p>
          Затова е важно да следите баланса си — недостатъчна наличност при
          опит за теглене (Rücklastschrift) обикновено носи допълнителна такса
          от банката и понякога от доставчика.
        </p>
      </div>

      <div className="mt-10 rounded-lg border border-line p-6">
        <h2 className="font-semibold text-ink">Следваща стъпка</h2>
        <p className="mt-2 text-sm text-ink-muted">
          За директен дебит ви трябва активна банкова сметка на ваше име —
          обикновено немска, макар че някои доставчици приемат и IBAN от друга
          SEPA държава.
        </p>
        <Link
          href="/finansi/bankova-smetka"
          className="mt-3 inline-block text-sm font-medium text-brand hover:text-brand-hover"
        >
          Отваряне на банкова сметка →
        </Link>
      </div>
    </div>
  );
}
