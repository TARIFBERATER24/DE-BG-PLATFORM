// Style reminder: documents remain private and are streamed only after a server-side operator-session check.
import { get } from "@vercel/blob";
import { NextResponse } from "next/server";
import { hasOperatorSession } from "@/lib/document-help-auth";
import { getDocumentHelpCase, getDocumentHelpStorageAuthOptions } from "@/lib/document-help-storage";

export async function GET(request: Request) {
  if (!(await hasOperatorSession())) return new NextResponse("Unauthorized", { status: 401 });

  const caseId = new URL(request.url).searchParams.get("case") ?? "";
  const record = await getDocumentHelpCase(caseId);
  if (!record) return new NextResponse("Not found", { status: 404 });

  const auth = getDocumentHelpStorageAuthOptions();
  if (!auth) return new NextResponse("Storage unavailable", { status: 503 });

  const result = await get(record.document.pathname, { access: "private", useCache: false, ...auth });
  if (!result || result.statusCode !== 200) return new NextResponse("Not found", { status: 404 });

  return new NextResponse(result.stream, {
    headers: {
      "Content-Type": result.blob.contentType,
      "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(record.document.originalFileName)}`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
