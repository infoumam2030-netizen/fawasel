import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PhoneMockup({
  children,
  className,
  frameClassName,
}: {
  children: ReactNode;
  className?: string;
  frameClassName?: string;
}) {
  return (
    <div className={cn("relative mx-auto aspect-[9/19] w-full max-w-[280px]", className)}>
      <div
        className={cn(
          "relative h-full w-full rounded-[2.75rem] border-[6px] border-navy-soft/80 bg-navy-deep p-2 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/10",
          frameClassName
        )}
      >
        <div className="absolute start-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-navy-deep" />
        <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] bg-gradient-to-b from-navy to-navy-deep">
          {children}
        </div>
      </div>
    </div>
  );
}
