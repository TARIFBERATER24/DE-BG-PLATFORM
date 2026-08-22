import Script from "next/script";

/**
 * CHECK24's own embeddable gas comparison widget -- a separate script from
 * the electricity one (power-iframe.js is hardcoded to /strom/, confirmed
 * by reading its source; there's no product parameter to reuse it for gas).
 * Container ID confirmed from the script's own source: c24pp-gas-iframe.
 */
export default function GasIframeWidget() {
  return (
    <div id="gas-iframe-widget" className="mt-10 rounded-lg border border-line p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-semibold text-ink">Сравни оферти за газ</h2>
        <span className="text-xs tracking-wide text-ink-subtle">Реклама</span>
      </div>
      <p className="mt-1.5 text-sm text-ink-muted">
        Въведете адреса и потреблението си — калкулаторът е на нашия партньор
        CHECK24.
      </p>
      <div id="c24pp-gas-iframe" style={{ width: "100%" }} className="mt-5" />
      <Script
        src="https://files.check24.net/widgets/auto/1174585/c24pp-gas-iframe/gas-iframe.js"
        strategy="afterInteractive"
      />
      <p className="mt-4 border-t border-line pt-4 text-xs text-ink-subtle">
        Безплатно за вас — партньорът ни плаща комисионна само при сключен
        договор.
      </p>
    </div>
  );
}
