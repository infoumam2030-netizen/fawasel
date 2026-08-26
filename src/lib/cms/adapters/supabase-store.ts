import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import type { CmsStore } from "../store";
import type { CollectionMap, CollectionName, DocPatch, NewDoc } from "../types";

/**
 * Supabase (Postgres) adapter.
 *
 * Every table follows the same shape — `id uuid`, `created_at`, `updated_at`,
 * `data jsonb` — with generated columns for the fields Postgres needs to index
 * or gate with RLS (slug, published, sort order). See `supabase/schema.sql`.
 *
 * The service-role key is read on the server only; it is never bundled into
 * client code because this module is `server-only`.
 */

type Row = {
  id: string;
  created_at: string;
  updated_at: string;
  data: Record<string, unknown>;
};

function toDoc<K extends CollectionName>(row: Row): CollectionMap[K] {
  return {
    ...(row.data as object),
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  } as CollectionMap[K];
}

class SupabaseStore implements CmsStore {
  readonly kind = "supabase" as const;
  readonly writable = true;

  constructor(private client: SupabaseClient) {}

  async list<K extends CollectionName>(collection: K): Promise<CollectionMap[K][]> {
    const { data, error } = await this.client
      .from(collection)
      .select("id, created_at, updated_at, data")
      .order("created_at", { ascending: true });
    if (error) throw new Error(`[supabase] list ${collection}: ${error.message}`);
    return (data as Row[]).map((row) => toDoc<K>(row));
  }

  async get<K extends CollectionName>(collection: K, id: string) {
    const { data, error } = await this.client
      .from(collection)
      .select("id, created_at, updated_at, data")
      .eq("id", id)
      .maybeSingle();
    if (error) throw new Error(`[supabase] get ${collection}/${id}: ${error.message}`);
    return data ? toDoc<K>(data as Row) : null;
  }

  async create<K extends CollectionName>(collection: K, doc: NewDoc<K>) {
    const { data, error } = await this.client
      .from(collection)
      .insert({ data: doc })
      .select("id, created_at, updated_at, data")
      .single();
    if (error) throw new Error(`[supabase] create ${collection}: ${error.message}`);
    return toDoc<K>(data as Row);
  }

  async update<K extends CollectionName>(collection: K, id: string, patch: DocPatch<K>) {
    const current = await this.get(collection, id);
    if (!current) throw new Error(`${collection}/${id} not found`);
    const rest = { ...current } as Partial<Record<string, unknown>>;
    delete rest.id;
    delete rest.createdAt;
    delete rest.updatedAt;
    const { data, error } = await this.client
      .from(collection)
      .update({ data: { ...rest, ...patch }, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select("id, created_at, updated_at, data")
      .single();
    if (error) throw new Error(`[supabase] update ${collection}/${id}: ${error.message}`);
    return toDoc<K>(data as Row);
  }

  async remove<K extends CollectionName>(collection: K, id: string) {
    const { error } = await this.client.from(collection).delete().eq("id", id);
    if (error) throw new Error(`[supabase] delete ${collection}/${id}: ${error.message}`);
  }
}

export function createSupabaseStore(): CmsStore {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase is not configured");
  const client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return new SupabaseStore(client);
}
