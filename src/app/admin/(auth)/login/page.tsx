import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/admin/LoginForm";
import { getAdminStrings } from "@/i18n/admin";
import { getAdminLocale } from "@/lib/admin-locale";
import { getSession, isAuthConfigured } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect("/admin");

  const locale = await getAdminLocale();
  const t = getAdminStrings(locale);

  return (
    <main
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="grain relative flex min-h-dvh items-center justify-center px-5"
    >
      <div className="grid-field pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="relative w-full max-w-sm">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
          <span className="label">{t.brand}</span>
        </div>
        <h1 className="display mt-4 text-3xl">{t.loginTitle}</h1>
        <p className="mt-2 text-sm text-muted">{t.loginSubtitle}</p>
        <LoginForm configured={isAuthConfigured()} t={t} />
      </div>
    </main>
  );
}
