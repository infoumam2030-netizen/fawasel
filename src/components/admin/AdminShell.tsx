"use client";

import { ExternalLink, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Sidebar } from "@/components/admin/Sidebar";
import { logoutAction } from "@/app/admin/actions";

export function AdminShell({
  email,
  storeKind,
  writable,
  children,
}: {
  email: string;
  storeKind: string;
  writable: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-void text-offwhite">
      <aside className="fixed inset-y-0 start-0 hidden w-60 border-e border-[var(--color-line)] bg-ink lg:block">
        <div className="flex h-14 items-center gap-2 border-b border-[var(--color-line)] px-4">
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
          <span className="text-xs uppercase tracking-[0.2em]">NEDAL CMS</span>
        </div>
        <Sidebar />
      </aside>

      {open ? (
        <div className="fixed inset-0 z-40 bg-void/95 backdrop-blur lg:hidden">
          <div className="flex h-14 items-center justify-between border-b border-[var(--color-line)] px-4">
            <span className="text-xs uppercase tracking-[0.2em]">NEDAL CMS</span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu">
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <Sidebar onNavigate={() => setOpen(false)} />
        </div>
      ) : null}

      <div className="lg:ps-60">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-[var(--color-line)] bg-ink/95 px-4 backdrop-blur">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>

          <div className="flex items-center gap-3 text-[0.6875rem] uppercase tracking-[0.14em] text-dim">
            <span className="hidden sm:inline">{email}</span>
            <span
              className="rounded border border-[var(--color-line)] px-2 py-0.5"
              title={writable ? "Writes are persisted" : "Read-only filesystem: changes will not persist"}
            >
              {storeKind}
              {writable ? "" : " · read-only"}
            </span>
          </div>

          <div className="ms-auto flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-[0.6875rem] uppercase tracking-[0.14em] text-muted hover:text-offwhite"
            >
              View site
              <ExternalLink className="h-3 w-3" aria-hidden />
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 text-[0.6875rem] uppercase tracking-[0.14em] text-muted hover:text-offwhite"
              >
                <LogOut className="h-3 w-3" aria-hidden />
                Sign out
              </button>
            </form>
          </div>
        </header>

        <main className="mx-auto max-w-[1400px] px-5 py-8 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
