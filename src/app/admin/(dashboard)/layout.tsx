import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AdminShell } from "@/components/admin/AdminShell";
import { getSession } from "@/lib/auth";
import { getStore } from "@/lib/cms/store";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const store = await getStore();

  return (
    <AdminShell email={session.email} storeKind={store.kind} writable={store.writable}>
      {children}
    </AdminShell>
  );
}
