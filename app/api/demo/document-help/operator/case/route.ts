// Style reminder: only a verified operator may permanently delete a demo case and its associated private document.
import { NextResponse } from "next/server";
import { hasOperatorSession } from "@/lib/document-help-auth";
import { deleteDocumentHelpCase } from "@/lib/document-help-storage";

export async function DELETE(request: Request) {
  if (!(await hasOperatorSession())) return new NextResponse("Unauthorized", { status: 401 });
  const caseId = new URL(request.url).searchParams.get("case") ?? "";
  const deleted = await deleteDocumentHelpCase(caseId);
  return NextResponse.json({ deleted });
}
