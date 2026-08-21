/**
 * Generates src/types/database.types.ts by introspecting a live Postgres
 * schema, in the shape `supabase gen types typescript` produces.
 *
 * The official CLI generator requires Docker, which is not always available;
 * this reads the same catalogs directly.
 *
 *   node scripts/generate-db-types.mjs "postgresql://..."
 *
 * Run it against the Supabase project after every migration and commit the
 * result — the types are the contract between the database and the app.
 */
import { writeFileSync } from "node:fs";
import pg from "pg";

const connectionString = process.argv[2] ?? process.env.SUPABASE_DB_URL;
if (!connectionString) {
  console.error("usage: node scripts/generate-db-types.mjs <postgres-url>");
  process.exit(1);
}

const TYPE_MAP = {
  uuid: "string", text: "string", citext: "string", varchar: "string", bpchar: "string",
  int2: "number", int4: "number", int8: "number", numeric: "number",
  float4: "number", float8: "number",
  bool: "boolean",
  timestamptz: "string", timestamp: "string", date: "string", time: "string",
  json: "Json", jsonb: "Json",
};

const client = new pg.Client({ connectionString });
await client.connect();

const { rows: enums } = await client.query(`
  select t.typname as name, array_agg(e.enumlabel::text order by e.enumsortorder) as labels
  from pg_type t
  join pg_enum e on e.enumtypid = t.oid
  join pg_namespace n on n.oid = t.typnamespace
  where n.nspname = 'public'
  group by t.typname order by t.typname;
`);
const enumNames = new Set(enums.map((e) => e.name));

const { rows: columns } = await client.query(`
  select c.relname as table_name,
         a.attname as column_name,
         format_type(a.atttypid, null) as formatted,
         t.typname as udt_name,
         a.attnotnull as not_null,
         (pg_get_expr(d.adbin, d.adrelid) is not null) as has_default,
         a.attidentity <> '' as is_identity,
         a.attgenerated <> '' as is_generated
  from pg_attribute a
  join pg_class c on c.oid = a.attrelid
  join pg_namespace n on n.oid = c.relnamespace
  join pg_type t on t.oid = a.atttypid
  left join pg_attrdef d on d.adrelid = c.oid and d.adnum = a.attnum
  where n.nspname = 'public' and c.relkind = 'r' and a.attnum > 0 and not a.attisdropped
  order by c.relname, a.attnum;
`);

const { rows: fks } = await client.query(`
  select con.conname as name,
         src.relname as table_name,
         (select array_agg(att.attname::text order by ord)
            from unnest(con.conkey) with ordinality as k(attnum, ord)
            join pg_attribute att on att.attrelid = con.conrelid and att.attnum = k.attnum) as columns,
         tgt.relname as foreign_table,
         (select array_agg(att.attname::text order by ord)
            from unnest(con.confkey) with ordinality as k(attnum, ord)
            join pg_attribute att on att.attrelid = con.confrelid and att.attnum = k.attnum) as foreign_columns
  from pg_constraint con
  join pg_class src on src.oid = con.conrelid
  join pg_class tgt on tgt.oid = con.confrelid
  join pg_namespace n on n.oid = src.relnamespace
  where con.contype = 'f' and n.nspname = 'public'
  order by src.relname, con.conname;
`);

const tsType = (col) => {
  if (col.udt_name.startsWith("_")) {
    const inner = col.udt_name.slice(1);
    return `${enumNames.has(inner) ? `Database["public"]["Enums"]["${inner}"]` : TYPE_MAP[inner] ?? "string"}[]`;
  }
  if (enumNames.has(col.udt_name)) return `Database["public"]["Enums"]["${col.udt_name}"]`;
  return TYPE_MAP[col.udt_name] ?? "string";
};

const byTable = new Map();
for (const col of columns) {
  if (!byTable.has(col.table_name)) byTable.set(col.table_name, []);
  byTable.get(col.table_name).push(col);
}

const quote = (n) => (/^[A-Za-z_$][\w$]*$/.test(n) ? n : JSON.stringify(n));

let out = `/**
 * AUTO-GENERATED — do not edit by hand.
 * Regenerate with: node scripts/generate-db-types.mjs <postgres-url>
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
`;

for (const [table, cols] of [...byTable.entries()].sort()) {
  out += `      ${quote(table)}: {\n        Row: {\n`;
  for (const c of cols) {
    out += `          ${quote(c.column_name)}: ${tsType(c)}${c.not_null ? "" : " | null"};\n`;
  }
  out += `        };\n        Insert: {\n`;
  for (const c of cols) {
    const optional = !c.not_null || c.has_default || c.is_identity || c.is_generated;
    out += `          ${quote(c.column_name)}${optional ? "?" : ""}: ${tsType(c)}${c.not_null ? "" : " | null"};\n`;
  }
  out += `        };\n        Update: {\n`;
  for (const c of cols) {
    out += `          ${quote(c.column_name)}?: ${tsType(c)}${c.not_null ? "" : " | null"};\n`;
  }
  out += `        };\n        Relationships: [\n`;
  for (const fk of fks.filter((f) => f.table_name === table)) {
    out += `          {\n            foreignKeyName: ${JSON.stringify(fk.name)};\n`;
    out += `            columns: ${JSON.stringify(fk.columns)};\n`;
    out += `            referencedRelation: ${JSON.stringify(fk.foreign_table)};\n`;
    out += `            referencedColumns: ${JSON.stringify(fk.foreign_columns)};\n          },\n`;
  }
  out += `        ];\n      };\n`;
}

out += `    };
    Views: Record<never, never>;
    Functions: Record<never, never>;
    Enums: {
`;
for (const e of enums) {
  out += `      ${quote(e.name)}: ${e.labels.map((l) => JSON.stringify(l)).join(" | ")};\n`;
}
out += `    };
    CompositeTypes: Record<never, never>;
  };
};

type PublicSchema = Database["public"];

export type Tables<T extends keyof PublicSchema["Tables"]> = PublicSchema["Tables"][T]["Row"];
export type TablesInsert<T extends keyof PublicSchema["Tables"]> = PublicSchema["Tables"][T]["Insert"];
export type TablesUpdate<T extends keyof PublicSchema["Tables"]> = PublicSchema["Tables"][T]["Update"];
export type Enums<T extends keyof PublicSchema["Enums"]> = PublicSchema["Enums"][T];
`;

writeFileSync("src/types/database.types.ts", out);
await client.end();
console.log(`generated ${byTable.size} tables, ${enums.length} enums, ${fks.length} relationships`);
