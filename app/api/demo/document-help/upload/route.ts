// Style reminder: this route only issues constrained private-upload tokens and persists an operator review record; no AI or delivery action is allowed here.
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import {
  DOCUMENT_HELP_ALLOWED_CONTENT_TYPES,
  DOCUMENT_HELP_MAX_SIZE_BYTES,
} from "@/lib/document-help-contract";
import {
  isDocumentHelpStorageConfigured,
  saveUploadedDocumentCase,
  validateDocumentHelpUpload,
} from "@/lib/document-help-storage";

export async function POST(request: Request) {
  if (!isDocumentHelpStorageConfigured()) {
    return NextResponse.json(
      { error: "Съхранението на demo документи все още не е конфигурирано." },
      { status: 503 },
    );
  }

  try {
    const body = (await request.json()) as HandleUploadBody;
    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        validateDocumentHelpUpload(pathname, clientPayload);
        return {
          allowedContentTypes: [...DOCUMENT_HELP_ALLOWED_CONTENT_TYPES],
          maximumSizeInBytes: DOCUMENT_HELP_MAX_SIZE_BYTES,
          addRandomSuffix: false,
          allowOverwrite: false,
          validUntil: Date.now() + 10 * 60 * 1000,
          tokenPayload: clientPayload,
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        await saveUploadedDocumentCase(blob, tokenPayload ?? null);
      },
    });
    return NextResponse.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Неуспешно качване на файл.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
