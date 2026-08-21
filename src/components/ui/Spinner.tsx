import { cn } from "@/lib/utils";

/**
 * Indeterminate loader. Uses `currentColor` so it inherits whatever control
 * it sits inside, and animates transform only.
 */
export function Spinner({ className, label }: { className?: string; label?: string }) {
  return (
    <span
      role={label ? "status" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn(
        "inline-block size-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent",
        className
      )}
    />
  );
}
