"use client";

import { Languages } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { ADMIN_LOCALE_COOKIE } from "@/lib/locale";
import type { Locale } from "@/lib/cms/types";

/** Switches the dashboard's own language (independent of the public site). */
export function AdminLanguageToggle({ locale, label }: { locale: Locale; label: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const next = locale === "en" ? "ar" : "en";

  return (
    <button
      type="button"
      disabled={pending}
      aria-label={`Switch dashboard language to ${next === "ar" ? "Arabic" : "English"}`}
      onClick={() => {
        document.cookie = `${ADMIN_LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
        startTransition(() => router.refresh());
      }}
      className="inline-flex items-center gap-1.5 text-[0.6875rem] uppercase tracking-[0.14em] text-muted transition-colors hover:text-offwhite disabled:opacity-60"
    >
      <Languages className="h-3 w-3" aria-hidden />
      {label}
    </button>
  );
}
