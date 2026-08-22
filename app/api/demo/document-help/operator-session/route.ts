// Style reminder: a private operator session is required before any stored case data can be viewed or managed.
import { NextResponse } from "next/server";
import {
  createOperatorSession,
  isOperatorAccessConfigured,
  operatorCodeMatches,
} from "@/lib/document-help-auth";

export async function POST(request: Request) {
  if (!isOperatorAccessConfigured()) {
    return NextResponse.json({ error: "Операторският достъп не е конфигуриран." }, { status: 503 });
  }

  const body = (await request.json()) as { code?: unknown };
  if (!operatorCodeMatches(body.code)) {
    return NextResponse.json({ error: "Невалиден код за достъп." }, { status: 401 });
  }

  await createOperatorSession();
  return NextResponse.json({ ok: true });
}
