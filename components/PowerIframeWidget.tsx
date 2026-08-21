import Script from "next/script";

/**
 * CHECK24's own embeddable Tier-B rate calculator (Vergleichsrechner), not a
 * hand-built one -- it does the real calculation. Partner ID 1174585 matches
 * the deeplinks used elsewhere in lib/affiliate-programs.ts.
 */
export default function PowerIframeWidget() {
  return (
    <div id="power-iframe-widget" className="mt-10 rounded-lg border border-line p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-semibold text-ink">Сравни оферти за ток</h2>
        <span className="text-xs tracking-wide text-ink-subtle">Реклама</span>
      </div>
      <p className="mt-1.5 text-sm text-ink-muted">
        Въведете адреса и потреблението си — калкулаторът е на нашия партньор
        CHECK24.
      </p>
      <div id="c24pp-power-iframe" data-scrollto="begin" style={{ width: "100%" }} className="mt-5" />
      <Script
        src="https://files.check24.net/widgets/auto/1174585/c24pp-power-iframe/power-iframe.js"
        strategy="afterInteractive"
      />
      <p className="mt-4 border-t border-line pt-4 text-xs text-ink-subtle">
        Безплатно за вас — партньорът ни плаща комисионна само при сключен
        договор.
      </p>
    </div>
  );
}
