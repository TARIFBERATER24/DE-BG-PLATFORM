// Style reminder: this route only issues constrained private-upload tokens and persists an operator review record; no AI or delivery action is allowed here.
import { handleUploadPresigned, type HandleUploadPresignedBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import {
  issueDocumentHelpUploadToken,
  isDocumentHelpStorageConfigured,
  saveUploadedDocumentCase,
} from "@/lib/document-help-storage";

export async function POST(request: Request) {
  if (!isDocumentHelpStorageConfigured()) {
    return NextResponse.json(
      { error: "Съхранението на demo документи все още не е конфигурирано." },
      { status: 503 },
    );
  }

  try {
    const body = (await request.json()) as HandleUploadPresignedBody;
    const response = await handleUploadPresigned({
      body,
      request,
      getSignedToken: async (pathname, clientPayload) => {
        const token = await issueDocumentHelpUploadToken(pathname, clientPayload);
        return {
          token,
          urlOptions: {
            allowedContentTypes: ["application/pdf", "image/jpeg", "image/png"],
            maximumSizeInBytes: 10 * 1024 * 1024,
            addRandomSuffix: false,
            allowOverwrite: false,
            validUntil: Date.now() + 10 * 60 * 1000,
            tokenPayload: clientPayload,
          },
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
