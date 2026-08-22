// Style reminder: deletion is explicit, irreversible, and available only in the operator view.
"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

export default function DocumentHelpCaseDeleteButton({ caseId }: { caseId: string }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function removeCase() {
    if (!window.confirm("Изтривате документа и заявката необратимо. Продължавате ли?")) return;
    setPending(true);
    setError("");
    try {
      const response = await fetch(`/api/demo/document-help/operator/case?case=${encodeURIComponent(caseId)}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Неуспешно изтриване.");
      window.location.reload();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Неуспешно изтриване.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={removeCase}
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-md border border-danger-line px-3 py-2 text-xs font-medium text-danger transition-colors hover:bg-danger-bg disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
        {pending ? "Изтриваме…" : "Изтрий"}
      </button>
      {error && <p className="mt-2 text-xs text-danger" role="alert">{error}</p>}
    </div>
  );
}
