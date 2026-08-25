import { redirect } from "next/navigation";
import { currentUser, selectRows } from "@/lib/mein-deutschland/supabase";
import { MdShell } from "@/components/mein-deutschland/MdShell";

export default async function ProtectedMeinDeutschlandLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();
  if (!user) redirect("/mein-deutschland/login");
  const profiles = await selectRows<{ first_name?: string }>("profiles", `select=first_name&id=eq.${user.id}&limit=1`).catch(() => []);
  return <MdShell name={profiles[0]?.first_name || user.user_metadata?.first_name}>{children}</MdShell>;
}
