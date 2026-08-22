import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "./config";

/**
 * Cookie-less anonymous client for PUBLIC content.
 *
 * Deliberately separate from `server.ts`: that client reads cookies, which
 * makes every request dynamic and uncacheable. Public marketing content has
 * no per-user variation, so reading it through a session-bound client would
 * cost the whole site its cache for nothing.
 *
 * Still fully subject to RLS — this is the anon key, so it can only ever see
 * rows the public policies expose.
 */
export function createPublicClient() {
  return createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export { isSupabaseConfigured };
