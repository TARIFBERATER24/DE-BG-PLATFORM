"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  clearSession,
  currentUser,
  deleteRows,
  insertRow,
  signIn,
  signUp,
  updateRows,
  uploadPrivateDocument,
} from "@/lib/mein-deutschland/supabase";

function text(form: FormData, key: string) {
  return String(form.get(key) ?? "").trim();
}

function num(form: FormData, key: string) {
  const value = text(form, key);
  return value ? Number(value) : null;
}

export async function registerAction(form: FormData) {
  const firstName = text(form, "first_name");
  const lastName = text(form, "last_name");
  const email = text(form, "email");
  const password = text(form, "password");
  const confirm = text(form, "confirm_password");
  if (!firstName || !lastName || !email || password.length < 8) redirect("/mein-deutschland/register?error=invalid");
  if (password !== confirm) redirect("/mein-deutschland/register?error=password");
  if (form.get("terms") !== "on") redirect("/mein-deutschland/register?error=terms");
  try {
    const data = await signUp(email, password, firstName, lastName);
    redirect(data.access_token ? "/mein-deutschland/onboarding" : `/mein-deutschland/verify?email=${encodeURIComponent(email)}`);
  } catch {
    redirect("/mein-deutschland/register?error=signup");
  }
}

export async function loginAction(form: FormData) {
  try {
    await signIn(text(form, "email"), text(form, "password"));
    redirect("/mein-deutschland/dashboard");
  } catch {
    redirect("/mein-deutschland/login?error=login");
  }
}

export async function logoutAction() {
  await clearSession();
  redirect("/mein-deutschland");
}

export async function saveProfileAction(form: FormData) {
  const user = await currentUser();
  if (!user) redirect("/mein-deutschland/login");
  await updateRows("profiles", `id=eq.${user.id}`, {
    first_name: text(form, "first_name"),
    last_name: text(form, "last_name"),
    postal_code: text(form, "postal_code") || null,
    city: text(form, "city") || null,
    household_size: num(form, "household_size"),
    housing_type: text(form, "housing_type") || null,
    onboarding_completed: true,
    updated_at: new Date().toISOString(),
  });
  revalidatePath("/mein-deutschland");
  redirect("/mein-deutschland/dashboard");
}

export async function createContractAction(form: FormData) {
  const user = await currentUser();
  if (!user) redirect("/mein-deutschland/login");
  await insertRow("contracts", {
    user_id: user.id,
    category: text(form, "category"),
    provider: text(form, "provider"),
    product_name: text(form, "product_name") || null,
    contract_number: text(form, "contract_number") || null,
    monthly_price: num(form, "monthly_price"),
    end_date: text(form, "end_date") || null,
    cancellation_deadline: text(form, "cancellation_deadline") || null,
    status: "active",
  });
  revalidatePath("/mein-deutschland/vertraege");
  revalidatePath("/mein-deutschland/dashboard");
}

export async function deleteContractAction(form: FormData) {
  const id = text(form, "id");
  await deleteRows("contracts", `id=eq.${encodeURIComponent(id)}`);
  revalidatePath("/mein-deutschland/vertraege");
  revalidatePath("/mein-deutschland/dashboard");
}

export async function createDeadlineAction(form: FormData) {
  const user = await currentUser();
  if (!user) redirect("/mein-deutschland/login");
  await insertRow("deadlines", {
    user_id: user.id,
    title: text(form, "title"),
    description: text(form, "description") || null,
    deadline_at: text(form, "deadline_at"),
    deadline_type: text(form, "deadline_type") || "other",
    status: "open",
  });
  revalidatePath("/mein-deutschland/fristen");
  revalidatePath("/mein-deutschland/dashboard");
}

export async function completeDeadlineAction(form: FormData) {
  await updateRows("deadlines", `id=eq.${encodeURIComponent(text(form, "id"))}`, { status: "completed" });
  revalidatePath("/mein-deutschland/fristen");
  revalidatePath("/mein-deutschland/dashboard");
}

export async function startTariffConsultationAction(form: FormData) {
  const user = await currentUser();
  if (!user) redirect("/mein-deutschland/login");
  const category = text(form, "category");
  const inputData = Object.fromEntries(Array.from(form.entries()).filter(([key]) => key !== "category"));
  await insertRow("tariff_consultations", { user_id: user.id, category, status: "started", input_data: inputData });
  redirect(`/mein-deutschland/tarifberater?started=${encodeURIComponent(category)}`);
}

export async function uploadDocumentAction(form: FormData) {
  const user = await currentUser();
  if (!user) redirect("/mein-deutschland/login");
  const file = form.get("file");
  if (!(file instanceof File) || !file.size) redirect("/mein-deutschland/dokumente?error=file");
  const allowed = new Set(["application/pdf", "image/jpeg", "image/png", "image/webp"]);
  if (!allowed.has(file.type) || file.size > 5 * 1024 * 1024) redirect("/mein-deutschland/dokumente?error=file");
  try {
    const storagePath = await uploadPrivateDocument(user.id, file);
    await insertRow("documents", {
      user_id: user.id,
      file_name: file.name,
      document_type: text(form, "document_type") || "other",
      storage_path: storagePath,
      processing_status: "uploaded",
    });
    revalidatePath("/mein-deutschland/dokumente");
    revalidatePath("/mein-deutschland/dashboard");
  } catch {
    redirect("/mein-deutschland/dokumente?error=upload");
  }
}
