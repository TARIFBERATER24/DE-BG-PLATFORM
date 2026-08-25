import { NextResponse } from "next/server";
import { setSession } from "@/lib/mein-deutschland/supabase";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { access_token?: unknown; refresh_token?: unknown; expires_in?: unknown } | null;
  const accessToken = typeof body?.access_token === "string" ? body.access_token : "";
  const refreshToken = typeof body?.refresh_token === "string" ? body.refresh_token : "";
  const expiresIn = typeof body?.expires_in === "number" && body.expires_in > 0 ? body.expires_in : 3600;

  if (!accessToken || !refreshToken) {
    return NextResponse.json({ error: "Липсва сесия за възстановяване." }, { status: 400 });
  }

  await setSession(accessToken, refreshToken, expiresIn);
  return NextResponse.json({ ok: true });
}
