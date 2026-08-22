// Style reminder: operator access is server-verified, short-lived, and never stored in client-side JavaScript.
import "server-only";

import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "document_help_operator";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

function configuredSecret() {
  return process.env.DOCUMENT_HELP_SESSION_SECRET ?? "";
}

function signature(value: string) {
  return createHmac("sha256", configuredSecret()).update(value).digest("base64url");
}

function safelyEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function isOperatorAccessConfigured() {
  return Boolean(process.env.DOCUMENT_HELP_OPERATOR_CODE && configuredSecret());
}

export async function createOperatorSession() {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const value = String(expiresAt);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, `${value}.${signature(value)}`, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    // The protected review page lives under /demo, but its download and deletion
    // actions live under /api. Keep the httpOnly session available to both routes.
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function hasOperatorSession() {
  if (!isOperatorAccessConfigured()) return false;
  const cookieValue = (await cookies()).get(COOKIE_NAME)?.value;
  if (!cookieValue) return false;
  const [expiresAt, receivedSignature] = cookieValue.split(".");
  if (!expiresAt || !receivedSignature || Number(expiresAt) <= Math.floor(Date.now() / 1000)) return false;
  return safelyEqual(receivedSignature, signature(expiresAt));
}

export function operatorCodeMatches(candidate: unknown) {
  const configuredCode = process.env.DOCUMENT_HELP_OPERATOR_CODE ?? "";
  return typeof candidate === "string" && configuredCode.length > 0 && safelyEqual(candidate, configuredCode);
}
