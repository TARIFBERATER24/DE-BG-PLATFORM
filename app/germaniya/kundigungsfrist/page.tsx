import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kündigungsfrist — срок за прекратяване на договор",
  description:
    "Какво е Kündigungsfrist и Mindestvertragslaufzeit, и как да прекратите договор за ток, газ, интернет или застраховка в Германия навреме. Обяснено на български.",
};

export default function KundigungsfristPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm text-ink-subtle">
        <Link href="/germaniya" className="hover:text-brand">
          Германия от А до Я
        </Link>
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">
        Kündigungsfrist — срок за прекратяване на договор
      </h1>
      <p className="mt-4 text-ink-muted">
        Почти всеки договор в Германия — за ток, газ, интернет, мобилен план
        или застраховка — има Mindestvertragslaufzeit (минимален срок) и
        Kündigungsfrist (срок за предизвестие при прекратяване). Пропуснете ли
        го, договорът се удължава автоматично.
      </p>

      <div className="mt-6 space-y-4 text-ink">
        <p>
          От март 2022 г. немското законодателство (изменение на §309, бр. 9
          BGB, чрез т.нар. Gesetz für faire Verbraucherverträge) ограничи
          автоматичното удължаване на повечето стандартни договори с
          потребители — след изтичане на минималния срок те могат да се
          удължават само с до 1 месец наведнъж, и потребителят може да ги
          прекрати по всяко време с 1-месечно предизвестие. По-старите
          дългосрочни удължавания (например с още 12 месеца) вече не са
          позволени за нови договори.
        </p>
        <p>
          На практика: проверете в договора си два срока — колко дълъг е
          Mindestvertragslaufzeit (обичайно 12 или 24 месеца при първо
          сключване) и какъв е Kündigungsfrist след него. Ако сте в
          първоначалния минимален срок, преждевременно прекратяване обикновено
          не е възможно без основание (например преместване извън зоната на
          доставка или повишение на цената).
        </p>
        <p>
          Прекратяването се подава в Textform — писмено, като имейл вече
          обикновено е достатъчен за повечето доставчици, освен ако договорът
          изрично не изисква писмо с подпис. Пазете потвърждение за
          изпращането и, ако е възможно, поискайте писмено потвърждение за
          получаване от доставчика.
        </p>
        <p>
          Ако смените доставчик на ток или газ чрез нов доставчик, той
          обикновено поема прекратяването на стария договор вместо вас — но
          добре е да проверите писмено, че старият договор реално е закрит, за
          да избегнете двойно плащане.
        </p>
      </div>

      <div className="mt-10 rounded-lg border border-line p-6">
        <h2 className="font-semibold text-ink">Къде е приложимо</h2>
        <p className="mt-2 text-sm text-ink-muted">
          Правилото важи за повечето потребителски договори — проверете го
          преди да смените доставчик или застраховател.
        </p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <Link href="/energiya-telekom" className="font-medium text-brand hover:text-brand-hover">
            Ток, газ и интернет →
          </Link>
          <Link href="/zastrahovki" className="font-medium text-brand hover:text-brand-hover">
            Застраховки →
          </Link>
        </div>
      </div>
    </div>
  );
}
