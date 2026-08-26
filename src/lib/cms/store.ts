import "server-only";

import type { CollectionMap, CollectionName, DocPatch, NewDoc } from "./types";

/**
 * The single seam between the UI and the data source.
 *
 * Swapping Supabase for another backend means writing one more implementation
 * of this interface — no page, component or form changes.
 */
export interface CmsStore {
  readonly kind: "supabase" | "json";
  /** False when the process cannot persist writes (e.g. read-only filesystem). */
  readonly writable: boolean;
  list<K extends CollectionName>(collection: K): Promise<CollectionMap[K][]>;
  get<K extends CollectionName>(collection: K, id: string): Promise<CollectionMap[K] | null>;
  create<K extends CollectionName>(collection: K, data: NewDoc<K>): Promise<CollectionMap[K]>;
  update<K extends CollectionName>(
    collection: K,
    id: string,
    patch: DocPatch<K>,
  ): Promise<CollectionMap[K]>;
  remove<K extends CollectionName>(collection: K, id: string): Promise<void>;
}

let cached: CmsStore | null = null;

export function supabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

export async function getStore(): Promise<CmsStore> {
  if (cached) return cached;
  if (supabaseConfigured()) {
    const { createSupabaseStore } = await import("./adapters/supabase-store");
    cached = createSupabaseStore();
  } else {
    const { createJsonStore } = await import("./adapters/json-store");
    cached = await createJsonStore();
  }
  return cached;
}

/** Test/bootstrap helper — drops the memoized adapter. */
export function resetStore(): void {
  cached = null;
}
