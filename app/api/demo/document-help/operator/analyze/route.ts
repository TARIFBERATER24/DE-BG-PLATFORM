// Style reminder: this route creates only a private operator draft and never triggers advice, messages, or external delivery.
import { NextResponse } from "next/server";
import { hasOperatorSession } from "@/lib/document-help-auth";
import { createDocumentHelpAIDraft, isDocumentHelpAIConfigured } from "@/lib/document-help-ai";

export async function POST(request: Request) {
  if (!(await hasOperatorSession())) return new NextResponse("Unauthorized", { status: 401 });
  if (!isDocumentHelpAIConfigured()) return new NextResponse("AI unavailable", { status: 503 });

  const body = await request.json().catch(() => null) as { caseId?: unknown } | null;
  if (!body || typeof body.caseId !== "string") return new NextResponse("Invalid case", { status: 400 });

  try {
    const analysis = await createDocumentHelpAIDraft(body.caseId);
    return NextResponse.json({ analysis });
  } catch (error) {
    const message = error instanceof Error ? error.message : "AI анализът не е наличен.";
    const expired = message.includes("Срокът за съхранение е изтекъл");
    return new NextResponse(message, { status: expired ? 410 : 422 });
  }
}
