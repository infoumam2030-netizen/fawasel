import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-primary/10",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:shimmer-bg",
        className
      )}
      aria-hidden="true"
    />
  );
}
