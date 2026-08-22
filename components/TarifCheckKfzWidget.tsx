import Script from "next/script";

/**
 * TarifCheck24's own embeddable Kfz-Versicherung comparison widget (real
 * rate calculator, not a hand-built one). Partner ID 203170.
 */
export default function TarifCheckKfzWidget() {
  return (
    <div id="tarifcheck-kfz-widget" className="mt-6 rounded-lg border border-line p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-semibold text-ink">Сравни оферти за автозастраховка</h2>
        <span className="text-xs tracking-wide text-ink-subtle">Реклама</span>
      </div>
      <p className="mt-1.5 text-sm text-ink-muted">
        Вградено сравнение на нашия партньор TarifCheck24 — реални оферти,
        не ориентировъчна оценка.
      </p>
      <div id="tcpp-iframe-kfz" style={{ width: "100%" }} className="mt-5" />
      <Script
        src="https://form.partner-versicherung.de/widgets/203170/tcpp-iframe-kfz/kfz-iframe.js"
        strategy="afterInteractive"
      />
      <p className="mt-4 border-t border-line pt-4 text-xs text-ink-subtle">
        Безплатно за вас — партньорът ни плаща комисионна само при сключен
        договор.
      </p>
    </div>
  );
}
