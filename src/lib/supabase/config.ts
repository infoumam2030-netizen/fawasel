/**
 * Supabase environment access.
 *
 * The project is not connected yet, so every entry point must degrade
 * gracefully rather than throw at import time — otherwise the whole app
 * fails to build or render before credentials exist.
 */

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/** True once both public credentials are present. */
export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

/** Throws with an actionable message rather than a cryptic client error. */
export function assertSupabaseConfigured(): void {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and " +
        "NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local (see .env.example)."
    );
  }
}
