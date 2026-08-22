// Style reminder: the operator desk is a private, factual review surface—never a public document index or automated advisory flow.
import type { Metadata } from "next";
import DocumentHelpCaseDesk from "@/components/DocumentHelpCaseDesk";
import DocumentHelpOperatorLogin from "@/components/DocumentHelpOperatorLogin";
import { hasOperatorSession, isOperatorAccessConfigured } from "@/lib/document-help-auth";
import { isDocumentHelpAIConfigured } from "@/lib/document-help-ai-config";
import { isDocumentHelpStorageConfigured, listDocumentHelpCasesWithAnalysis } from "@/lib/document-help-storage";
import { getDocumentHelpPilotPipeline } from "@/lib/document-help-pipeline";

export const metadata: Metadata = {
  title: "Операторски преглед | Сравни.де",
  robots: { index: false, follow: false },
};

export default async function DocumentHelpReviewPage() {
  const operatorConfigured = isOperatorAccessConfigured();
  if (!operatorConfigured || !(await hasOperatorSession())) {
    return <DocumentHelpOperatorLogin configured={operatorConfigured} />;
  }

  const cases = isDocumentHelpStorageConfigured() ? await listDocumentHelpCasesWithAnalysis() : [];
  const pilotCases = await Promise.all(cases.map(async (item) => ({ ...item, pipeline: await getDocumentHelpPilotPipeline(item.caseId) })));
  return <DocumentHelpCaseDesk cases={pilotCases} aiConfigured={isDocumentHelpAIConfigured()} />;
}
