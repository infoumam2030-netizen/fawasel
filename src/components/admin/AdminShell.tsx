"use client";

import { ExternalLink, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { AdminLanguageToggle } from "@/components/admin/AdminLanguageToggle";
import { Sidebar } from "@/components/admin/Sidebar";
import { logoutAction } from "@/app/admin/actions";
import type { AdminStrings } from "@/i18n/admin";
import type { Locale } from "@/lib/cms/types";

export function AdminShell({
  email,
  storeKind,
  writable,
  locale,
  t,
  children,
}: {
  email: string;
  storeKind: string;
  writable: boolean;
  locale: Locale;
  t: AdminStrings;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="min-h-dvh bg-void text-offwhite"
    >
      <aside className="fixed inset-y-0 start-0 hidden w-60 border-e border-[var(--color-line)] bg-ink lg:block">
        <div className="flex h-14 items-center gap-2 border-b border-[var(--color-line)] px-4">
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
          <span className="text-xs uppercase tracking-[0.2em]">{t.brand}</span>
        </div>
        <Sidebar t={t} />
      </aside>

      {open ? (
        <div className="fixed inset-0 z-40 bg-void/95 backdrop-blur lg:hidden">
          <div className="flex h-14 items-center justify-between border-b border-[var(--color-line)] px-4">
            <span className="text-xs uppercase tracking-[0.2em]">{t.brand}</span>
            <button type="button" onClick={() => setOpen(false)} aria-label={t.closeMenu}>
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <Sidebar t={t} onNavigate={() => setOpen(false)} />
        </div>
      ) : null}

      <div className="lg:ps-60">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-[var(--color-line)] bg-ink/95 px-4 backdrop-blur">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="lg:hidden"
            aria-label={t.openMenu}
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>

          <div className="flex items-center gap-3 text-[0.6875rem] uppercase tracking-[0.14em] text-dim">
            <span className="hidden sm:inline">{email}</span>
            <span
              className="rounded border border-[var(--color-line)] px-2 py-0.5"
              title={writable ? t.writableHint : t.readOnlyHint}
            >
              {storeKind}
              {writable ? "" : ` · ${t.readOnly}`}
            </span>
          </div>

          <div className="ms-auto flex items-center gap-3">
            <AdminLanguageToggle locale={locale} label={t.languageToggle} />
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-[0.6875rem] uppercase tracking-[0.14em] text-muted hover:text-offwhite"
            >
              {t.viewSite}
              <ExternalLink className="h-3 w-3" aria-hidden />
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 text-[0.6875rem] uppercase tracking-[0.14em] text-muted hover:text-offwhite"
              >
                <LogOut className="h-3 w-3" aria-hidden />
                {t.signOut}
              </button>
            </form>
          </div>
        </header>

        <main className="mx-auto max-w-[1400px] px-5 py-8 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
