import { saveProfileAction } from "@/app/mein-deutschland/actions";
import { currentUser, selectRows } from "@/lib/mein-deutschland/supabase";
import { Field, PageHeader, Panel, PrimaryButton } from "@/components/mein-deutschland/MdShell";

export default async function OnboardingPage() {
  const user = await currentUser();
  const profiles = await selectRows<{ first_name?: string; last_name?: string }>("profiles", `select=first_name,last_name&id=eq.${user!.id}&limit=1`).catch(() => []);
  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title="Нека настроим профила ти" description="Само няколко основни данни. По желание можеш да допълниш останалото по-късно." />
      <Panel>
        <form action={saveProfileAction} className="grid gap-4 sm:grid-cols-2">
          <Field label="Име" name="first_name" required defaultValue={profiles[0]?.first_name || user?.user_metadata?.first_name} />
          <Field label="Фамилия" name="last_name" required defaultValue={profiles[0]?.last_name || user?.user_metadata?.last_name} />
          <Field label="Пощенски код (PLZ)" name="postal_code" placeholder="10115" />
          <Field label="Град" name="city" placeholder="Berlin" />
          <Field label="Брой хора в домакинството" name="household_size" type="number" />
          <label className="block text-sm font-medium text-ink">Жилище<select name="housing_type" className="mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-2.5"><option value="">Избери</option><option value="rent">Квартира под наем</option><option value="own">Собствено жилище</option></select></label>
          <div className="sm:col-span-2"><PrimaryButton>Запази и продължи</PrimaryButton></div>
        </form>
      </Panel>
    </div>
  );
}
