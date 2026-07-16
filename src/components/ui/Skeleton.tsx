import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-white/5",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:shimmer-bg",
        className
      )}
      aria-hidden="true"
    />
  );
}
