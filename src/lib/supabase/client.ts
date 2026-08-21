"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database.types";
import { assertSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "./config";

/**
 * Browser client. Carries the user's session and is subject to RLS, so it may
 * only ever reach data the signed-in role is entitled to.
 */
export function createClient() {
  assertSupabaseConfigured();
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}
