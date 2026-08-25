import { saveProfileAction } from "@/app/mein-deutschland/actions";
import { currentUser, selectRows } from "@/lib/mein-deutschland/supabase";
import { Field, PageHeader, Panel, PrimaryButton } from "@/components/mein-deutschland/MdShell";

type Profile = { first_name: string | null; last_name: string | null; postal_code: string | null; city: string | null; household_size: number | null; housing_type: string | null };

export default async function ProfilePage() {
  const user = await currentUser();
  const profiles = await selectRows<Profile>("profiles", `select=*&id=eq.${user!.id}&limit=1`).catch(() => []);
  const p = profiles[0];
  return (
    <div><PageHeader title="Профил" description="Основните данни, които Mein Deutschland използва, за да не ги въвеждаш отново във всеки процес." />
      <Panel className="max-w-3xl"><form action={saveProfileAction} className="grid gap-4 sm:grid-cols-2">
        <Field label="Име" name="first_name" required defaultValue={p?.first_name || user?.user_metadata?.first_name} />
        <Field label="Фамилия" name="last_name" required defaultValue={p?.last_name || user?.user_metadata?.last_name} />
        <Field label="Имейл" name="email_display" type="email" defaultValue={user?.email} />
        <Field label="PLZ" name="postal_code" defaultValue={p?.postal_code} />
        <Field label="Град" name="city" defaultValue={p?.city} />
        <Field label="Хора в домакинството" name="household_size" type="number" defaultValue={p?.household_size} />
        <label className="block text-sm font-medium text-ink">Жилище<select name="housing_type" defaultValue={p?.housing_type || ""} className="mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-2.5"><option value="">Избери</option><option value="rent">Квартира под наем</option><option value="own">Собствено жилище</option></select></label>
        <div className="sm:col-span-2"><PrimaryButton>Запази промените</PrimaryButton></div>
      </form></Panel>
    </div>
  );
}
