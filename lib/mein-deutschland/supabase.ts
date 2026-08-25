import { cookies } from "next/headers";

const ACCESS_COOKIE = "md_access_token";
const REFRESH_COOKIE = "md_refresh_token";

function config() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Supabase environment is not configured.");
  return { url, key };
}

export type MdUser = {
  id: string;
  email?: string;
  user_metadata?: { first_name?: string; last_name?: string };
};

export async function setSession(accessToken: string, refreshToken: string, expiresIn = 3600) {
  const store = await cookies();
  const secure = process.env.NODE_ENV === "production";
  store.set(ACCESS_COOKIE, accessToken, { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: expiresIn });
  store.set(REFRESH_COOKIE, refreshToken, { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 });
}

export async function clearSession() {
  const store = await cookies();
  store.delete(ACCESS_COOKIE);
  store.delete(REFRESH_COOKIE);
}

export async function accessToken() {
  const store = await cookies();
  return store.get(ACCESS_COOKIE)?.value ?? null;
}

export async function signUp(email: string, password: string, firstName: string, lastName: string) {
  const { url, key } = config();
  const res = await fetch(`${url}/auth/v1/signup`, {
    method: "POST",
    headers: { apikey: key, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, data: { first_name: firstName, last_name: lastName } }),
    cache: "no-store",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.msg || data?.message || "Регистрацията не беше успешна.");
  if (data.access_token && data.refresh_token) await setSession(data.access_token, data.refresh_token, data.expires_in);
  return data;
}

export async function signIn(email: string, password: string) {
  const { url, key } = config();
  const res = await fetch(`${url}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apikey: key, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error_description || data?.msg || "Грешен имейл или парола.");
  await setSession(data.access_token, data.refresh_token, data.expires_in);
  return data.user as MdUser;
}

export async function requestPasswordReset(email: string, redirectTo: string) {
  const { url, key } = config();
  const redirectQuery = new URLSearchParams({ redirect_to: redirectTo }).toString();
  const res = await fetch(`${url}/auth/v1/recover?${redirectQuery}`, {
    method: "POST",
    headers: { apikey: key, "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
    cache: "no-store",
  });
  const data = await res.json().catch(() => null);
  const errorMessage = data?.error_description || data?.msg || data?.message;
  if (!res.ok) {
    if (errorMessage === "email rate limit exceeded") throw new Error("Лимитът за имейли е достигнат. Опитай отново по-късно.");
    throw new Error(errorMessage || "Имейлът за възстановяване не беше изпратен.");
  }
}

export async function updatePassword(password: string) {
  const token = await accessToken();
  if (!token) throw new Error("Линкът за възстановяване е невалиден или е изтекъл.");
  const { url, key } = config();
  const res = await fetch(`${url}/auth/v1/user`, {
    method: "PUT",
    headers: { apikey: key, Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
    cache: "no-store",
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error_description || data?.msg || data?.message || "Новата парола не беше запазена.");
  return data as MdUser;
}

export async function currentUser(): Promise<MdUser | null> {
  const token = await accessToken();
  if (!token) return null;
  const { url, key } = config();
  const res = await fetch(`${url}/auth/v1/user`, { headers: { apikey: key, Authorization: `Bearer ${token}` }, cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

async function rest(path: string, init?: RequestInit) {
  const token = await accessToken();
  if (!token) throw new Error("Няма активна сесия.");
  const { url, key } = config();
  const res = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Database request failed.");
  }
  if (res.status === 204) return null;
  return res.json();
}

export async function selectRows<T>(table: string, query = "select=*"): Promise<T[]> {
  return rest(`${table}?${query}`, { method: "GET" });
}

export async function insertRow<T>(table: string, payload: Record<string, unknown>): Promise<T> {
  const rows = await rest(table, { method: "POST", body: JSON.stringify(payload) });
  return rows[0] as T;
}

export async function updateRows<T>(table: string, filter: string, payload: Record<string, unknown>): Promise<T[]> {
  return rest(`${table}?${filter}`, { method: "PATCH", body: JSON.stringify(payload) });
}

export async function deleteRows(table: string, filter: string) {
  return rest(`${table}?${filter}`, { method: "DELETE" });
}

export async function uploadPrivateDocument(userId: string, file: File) {
  const token = await accessToken();
  if (!token) throw new Error("Няма активна сесия.");
  const { url, key } = config();
  const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const path = `${userId}/${crypto.randomUUID()}-${safe}`;
  const res = await fetch(`${url}/storage/v1/object/private-documents/${path}`, {
    method: "POST",
    headers: { apikey: key, Authorization: `Bearer ${token}`, "Content-Type": file.type || "application/octet-stream", "x-upsert": "false" },
    body: file,
  });
  if (!res.ok) throw new Error(await res.text());
  return path;
}
