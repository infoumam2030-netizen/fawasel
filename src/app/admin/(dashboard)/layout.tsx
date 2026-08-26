import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminStrings } from "@/i18n/admin";
import { getAdminLocale } from "@/lib/admin-locale";
import { getSession } from "@/lib/auth";
import { getStore } from "@/lib/cms/store";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const [store, locale] = await Promise.all([getStore(), getAdminLocale()]);

  return (
    <AdminShell
      email={session.email}
      storeKind={store.kind}
      writable={store.writable}
      locale={locale}
      t={getAdminStrings(locale)}
    >
      {children}
    </AdminShell>
  );
}
