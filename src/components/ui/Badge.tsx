import { cn } from "@/lib/utils";
import type { UnitStatus } from "@/types/unit";

const STATUS_STYLES: Record<UnitStatus, string> = {
  available: "border-gold/50 text-dark-gold",
  reserved: "border-muted/40 text-muted",
  sold: "border-navy/25 text-navy/50",
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
        "inline-flex items-center gap-1.5 border bg-white/90 px-3 py-1 text-[11px] font-semibold tracking-wide",
        STATUS_STYLES[status],
        className
      )}
    >
      <span className="h-1 w-1 rounded-full bg-current" />
      {STATUS_LABELS[status]}
    </span>
  );
}
