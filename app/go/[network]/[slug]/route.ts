import { NextRequest, NextResponse } from "next/server";
import { getAffiliateProgram } from "@/lib/affiliate-programs";
import { logClick } from "@/lib/click-log";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ network: string; slug: string }> },
) {
  const { network, slug } = await context.params;
  const program = getAffiliateProgram(network, slug);

  if (!program || !program.trackingUrl) {
    return NextResponse.redirect(new URL("/", request.url), 307);
  }

  await logClick({ network, slug, referer: request.headers.get("referer") });

  return NextResponse.redirect(program.trackingUrl, 302);
}
