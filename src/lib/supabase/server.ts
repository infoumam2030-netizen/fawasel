import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "@/types/database.types";
import { assertSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "./config";

/**
 * Server client for Server Components, Route Handlers and Server Actions.
 * Uses the anon key and the caller's session, so RLS still applies — this is
 * not a privileged client.
 */
export async function createClient() {
  assertSupabaseConfigured();
  const cookieStore = await cookies();

  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Called from a Server Component, where cookies are read-only.
          // Session refresh is handled by middleware instead.
        }
      },
    },
  });
}
