"use client";

import { Loader2, LogIn } from "lucide-react";
import { useActionState } from "react";

import { loginAction, type ActionState } from "@/app/admin/actions";

export function LoginForm({ configured }: { configured: boolean }) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(loginAction, {});

  return (
    <form action={formAction} className="mt-8 space-y-4">
      <div>
        <label className="admin-label" htmlFor="email">
          Email
        </label>
        <input id="email" name="email" type="email" autoComplete="username" required className="admin-input" />
      </div>
      <div>
        <label className="admin-label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="admin-input"
        />
      </div>

      {state.error ? (
        <p role="alert" className="text-sm text-accent">
          {state.error}
        </p>
      ) : null}

      {!configured ? (
        <p className="rounded border border-[var(--color-line)] p-3 text-xs text-dim">
          Admin credentials are not configured. Set ADMIN_EMAIL, ADMIN_PASSWORD_HASH and
          ADMIN_SESSION_SECRET (see README) before deploying.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="btn-shine inline-flex w-full items-center justify-center gap-2 rounded bg-[linear-gradient(96deg,var(--accent-from),var(--accent-to))] px-5 py-3 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-[#0a0a0b] disabled:opacity-60"
      >
        {pending ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : (
          <LogIn className="h-4 w-4" aria-hidden />
        )}
        Sign in
      </button>
    </form>
  );
}
