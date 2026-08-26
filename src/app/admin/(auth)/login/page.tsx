import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/admin/LoginForm";
import { getSession, isAuthConfigured } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect("/admin");

  return (
    <main className="grain relative flex min-h-dvh items-center justify-center px-5">
      <div className="grid-field pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="relative w-full max-w-sm">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
          <span className="label">NEDAL CMS</span>
        </div>
        <h1 className="display mt-4 text-3xl">SIGN IN</h1>
        <p className="mt-2 text-sm text-muted">Authorized administrators only.</p>
        <LoginForm configured={isAuthConfigured()} />
      </div>
    </main>
  );
}
