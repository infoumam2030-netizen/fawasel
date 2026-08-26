"use client";

import { Copy, Eye, EyeOff, MoveDown, MoveUp, Trash2 } from "lucide-react";

import {
  deleteDocAction,
  duplicateDocAction,
  reorderAction,
  togglePublishAction,
} from "@/app/admin/actions";
import type { AdminStrings } from "@/i18n/admin";

const buttonClass =
  "inline-flex h-8 w-8 items-center justify-center rounded border border-[var(--color-line)] text-dim transition-colors hover:text-offwhite";

export function RowActions({
  collection,
  id,
  published,
  supportsPublish,
  supportsOrder,
  t,
}: {
  collection: string;
  id: string;
  published: boolean;
  supportsPublish: boolean;
  supportsOrder: boolean;
  t: AdminStrings;
}) {
  return (
    <div className="flex items-center justify-end gap-1.5">
      {supportsOrder ? (
        <>
          <form action={reorderAction.bind(null, collection, id, "up")}>
            <button type="submit" className={buttonClass} aria-label={t.moveUp}>
              <MoveUp className="h-3.5 w-3.5" aria-hidden />
            </button>
          </form>
          <form action={reorderAction.bind(null, collection, id, "down")}>
            <button type="submit" className={buttonClass} aria-label={t.moveDown}>
              <MoveDown className="h-3.5 w-3.5" aria-hidden />
            </button>
          </form>
        </>
      ) : null}

      {supportsPublish ? (
        <form action={togglePublishAction.bind(null, collection, id, !published)}>
          <button
            type="submit"
            className={buttonClass}
            aria-label={published ? t.unpublish : t.publish}
            title={published ? t.unpublish : t.publish}
          >
            {published ? (
              <EyeOff className="h-3.5 w-3.5" aria-hidden />
            ) : (
              <Eye className="h-3.5 w-3.5" aria-hidden />
            )}
          </button>
        </form>
      ) : null}

      <form action={duplicateDocAction.bind(null, collection, id)}>
        <button type="submit" className={buttonClass} aria-label={t.duplicate} title={t.duplicate}>
          <Copy className="h-3.5 w-3.5" aria-hidden />
        </button>
      </form>

      <form
        action={deleteDocAction.bind(null, collection, id)}
        onSubmit={(event) => {
          if (!confirm(t.deleteConfirm)) event.preventDefault();
        }}
      >
        <button
          type="submit"
          className={`${buttonClass} hover:border-accent hover:text-accent`}
          aria-label={t.delete}
          title={t.delete}
        >
          <Trash2 className="h-3.5 w-3.5" aria-hidden />
        </button>
      </form>
    </div>
  );
}
