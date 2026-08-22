// Style reminder: AI analysis is explicit, operator-only, private, and creates a non-advisory draft only.
"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

export default function DocumentHelpCaseAnalyzeButton({ caseId }: { caseId: string }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function analyzeCase() {
    const accepted = window.confirm(
      "Документът ще бъде изпратен само към конфигурирания AI доставчик за частна операторска чернова. Няма да се изпраща към доставчик, email, Telegram или n8n. Продължавате ли?",
    );
    if (!accepted) return;
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/demo/document-help/operator/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caseId }),
      });
      if (!response.ok) throw new Error(await response.text());
      window.location.reload();
    } catch (analysisError) {
      setError(analysisError instanceof Error ? analysisError.message : "AI анализът не е наличен.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={analyzeCase}
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-md border border-brand px-3 py-2 text-xs font-medium text-brand transition-colors hover:bg-brand-tint disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
        {pending ? "Създаваме чернова…" : "Създай AI чернова"}
      </button>
      {error && <p className="mt-2 max-w-xs text-xs text-danger" role="alert">{error}</p>}
    </div>
  );
}
