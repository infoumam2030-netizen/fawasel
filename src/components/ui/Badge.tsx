import { cn } from "@/lib/utils";
import type { UnitStatus } from "@/types/unit";

const STATUS_STYLES: Record<UnitStatus, string> = {
  available: "bg-emerald-500/15 text-emerald-700 ring-1 ring-emerald-500/30",
  reserved: "bg-amber-500/15 text-amber-700 ring-1 ring-amber-500/30",
  sold: "bg-rose-500/15 text-rose-700 ring-1 ring-rose-500/30",
};

const STATUS_LABELS: Record<UnitStatus, string> = {
  available: "متاحة",
  reserved: "محجوزة",
  sold: "مباعة",
};

export function StatusBadge({ status, className }: { status: UnitStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold",
        STATUS_STYLES[status],
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {STATUS_LABELS[status]}
    </span>
  );
}
