import { cn } from "@/lib/utils";

/**
 * Loading placeholder. Animates opacity only, and is hidden from assistive
 * technology — the live region announcing the load belongs to the component
 * that owns the request.
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded-none bg-surface-raised", className)}
      aria-hidden="true"
    />
  );
}
