"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
}

/**
 * Navigation item with the four states the design system defines: rest,
 * hover, active and focus.
 *
 * The active state is a lavender underline that grows from the inline start,
 * so it draws in the reading direction in both Arabic and English. Colour
 * alone never marks the active item — the rule is always present too.
 */
export function NavLink({ href, children, isActive = false, className }: NavLinkProps) {
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group relative inline-flex flex-col gap-1.5 py-1 text-body-sm",
        "transition-colors duration-200 ease-panther",
        isActive ? "text-foreground" : "text-muted hover:text-foreground",
        className
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className={cn(
          "h-px bg-lavender transition-transform duration-200 ease-panther",
          // transform-origin has no logical keyword, so it is set per direction.
          "ltr:origin-left rtl:origin-right",
          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        )}
      />
    </Link>
  );
}
