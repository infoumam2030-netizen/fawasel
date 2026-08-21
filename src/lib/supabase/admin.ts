import "server-only";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";
import { supabaseUrl } from "./config";

/**
 * Service-role client. BYPASSES ROW LEVEL SECURITY.
 *
 * `server-only` makes importing this from a Client Component a build error,
 * and the key is read from a variable with no NEXT_PUBLIC_ prefix so it can
 * never be inlined into a browser bundle.
 *
 * Use it only where an operation genuinely cannot be expressed under RLS —
 * inviting a user, assigning a role. Everything else goes through the normal
 * server client so the policies stay in force.
 */
export function createAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Admin client requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  return createSupabaseClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
