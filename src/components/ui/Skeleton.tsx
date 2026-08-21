import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse bg-surface-raised", className)}
      aria-hidden="true"
    />
  );
}
