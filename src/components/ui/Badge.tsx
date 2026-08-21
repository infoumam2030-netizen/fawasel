import { cn } from "@/lib/utils";

type BadgeTone = "neutral" | "lavender" | "success" | "warning" | "danger" | "outline";

/**
 * Tone carries meaning, never decoration. State is also spelled out in the
 * label, so nothing depends on colour alone.
 */
const TONE_CLASSES: Record<BadgeTone, string> = {
  neutral: "border-border bg-surface-raised text-muted",
  lavender: "border-lavender/45 bg-lavender/12 text-lavender-soft",
  success: "border-success/40 bg-success/10 text-success",
  warning: "border-warning/40 bg-warning/10 text-warning",
  danger: "border-danger/40 bg-danger/10 text-danger",
  outline: "border-border-strong bg-transparent text-foreground",
};

interface BadgeProps {
  children: React.ReactNode;
  tone?: BadgeTone;
  /** Shows a leading dot — useful in dense tables where labels get scanned. */
  dot?: boolean;
  className?: string;
}

export function Badge({ children, tone = "neutral", dot = false, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-none border px-2.5 py-1",
        "text-caption font-medium tracking-wide",
        TONE_CLASSES[tone],
        className
      )}
    >
      {dot && <span className="size-1.5 shrink-0 rounded-full bg-current" aria-hidden="true" />}
      {children}
    </span>
  );
}

/** CMS publication states, so every module badges them identically. */
export type ContentStatus = "draft" | "published" | "archived";

const STATUS_TONE: Record<ContentStatus, BadgeTone> = {
  draft: "warning",
  published: "success",
  archived: "neutral",
};

export function StatusBadge({ status, label }: { status: ContentStatus; label: string }) {
  return (
    <Badge tone={STATUS_TONE[status]} dot>
      {label}
    </Badge>
  );
}
