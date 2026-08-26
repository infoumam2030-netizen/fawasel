import { AlertTriangle, ArrowRight } from "lucide-react";
import Link from "next/link";

import { adminCollections } from "@/lib/cms/collections";
import { listAdmin } from "@/lib/cms/admin";
import { getStore } from "@/lib/cms/store";
import type { Inquiry } from "@/lib/cms/types";

export default async function AdminHome() {
  const store = await getStore();
  const counts = await Promise.all(
    adminCollections.map(async (config) => {
      const rows = (await store.list(config.name)) as { published?: boolean }[];
      return {
        config,
        total: rows.length,
        published: rows.filter((row) => row.published !== false).length,
      };
    }),
  );

  const inquiries = (await listAdmin("inquiries")) as Inquiry[];
  const recent = [...inquiries].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5);
  const projects = counts.find((entry) => entry.config.name === "projects");

  return (
    <div className="space-y-10">
      <header>
        <p className="label">Overview</p>
        <h1 className="display mt-2 text-3xl">DASHBOARD</h1>
        <p className="mt-2 text-sm text-muted">
          Everything on the public site is edited from here. Published changes are live immediately.
        </p>
      </header>

      {!store.writable ? (
        <p className="flex items-start gap-3 rounded border border-[var(--color-line)] bg-graphite p-4 text-sm text-muted">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
          The JSON data file is not writable in this environment, so edits will not persist. Configure
          Supabase (see README) for a production-grade data layer.
        </p>
      ) : null}

      {projects && projects.total === 0 ? (
        <p className="rounded border border-[var(--color-line)] bg-graphite p-4 text-sm text-muted">
          No projects yet — the public Work section shows an empty state until the first case study is
          published.{" "}
          <Link href="/admin/projects/new" className="text-accent underline">
            Create the first project
          </Link>
          .
        </p>
      ) : null}

      <section>
        <h2 className="admin-label">Collections</h2>
        <ul className="mt-3 grid gap-px border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-4">
          {counts.map(({ config, total, published }) => (
            <li key={config.name} className="bg-void">
              <Link href={`/admin/${config.name}`} className="group block p-5">
                <p className="admin-label">{config.label}</p>
                <p className="mt-2 text-3xl font-semibold tabular-nums">{total}</p>
                <p className="mt-1 text-xs text-dim">
                  {config.readOnly ? "records" : `${published} published`}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-[0.6875rem] uppercase tracking-[0.14em] text-muted transition-colors group-hover:text-accent">
                  Manage
                  <ArrowRight className="h-3 w-3" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="admin-label">Latest inquiries</h2>
        {recent.length === 0 ? (
          <p className="mt-3 rounded border border-[var(--color-line)] p-5 text-sm text-dim">
            No inquiries yet. Submissions from the contact form land here.
          </p>
        ) : (
          <ul className="mt-3 divide-y divide-[var(--color-line)] rounded border border-[var(--color-line)]">
            {recent.map((inquiry) => (
              <li key={inquiry.id} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 p-4">
                <Link href={`/admin/inquiries/${inquiry.id}`} className="text-sm hover:text-accent">
                  {inquiry.name}
                </Link>
                <span className="text-xs text-dim">{inquiry.email}</span>
                {inquiry.service ? (
                  <span className="rounded border border-[var(--color-line)] px-2 py-0.5 text-[0.625rem] uppercase tracking-[0.12em] text-muted">
                    {inquiry.service}
                  </span>
                ) : null}
                <span className="ms-auto text-[0.6875rem] text-dim">
                  {new Date(inquiry.createdAt).toLocaleDateString("en-GB")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="admin-label">Data layer</h2>
        <p className="mt-3 text-sm text-muted">
          Active adapter: <span className="text-offwhite">{store.kind}</span>
          {store.kind === "json"
            ? " — file-backed storage in data/cms.json. Set the Supabase environment variables to switch without code changes."
            : " — Postgres via Supabase."}
        </p>
      </section>
    </div>
  );
}

export const dynamic = "force-dynamic";
