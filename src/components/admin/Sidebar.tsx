"use client";

import {
  Blocks,
  Building2,
  Contact,
  FileText,
  Image as ImageIcon,
  Inbox,
  LayoutDashboard,
  Link2,
  ListOrdered,
  Quote,
  Settings,
  Sparkles,
  TrendingUp,
  Wrench,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const groups: { title: string; items: { href: string; label: string; icon: React.ElementType }[] }[] = [
  {
    title: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    title: "Content",
    items: [
      { href: "/admin/projects", label: "Projects", icon: Briefcase },
      { href: "/admin/clients", label: "Clients", icon: Building2 },
      { href: "/admin/services", label: "Services", icon: Blocks },
      { href: "/admin/skills", label: "Skills", icon: Sparkles },
      { href: "/admin/tools", label: "Tools", icon: Wrench },
      { href: "/admin/experience", label: "Experience", icon: ListOrdered },
      { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
      { href: "/admin/metrics", label: "Metrics", icon: TrendingUp },
    ],
  },
  {
    title: "Site",
    items: [
      { href: "/admin/content", label: "Hero & copy", icon: FileText },
      { href: "/admin/media", label: "Media library", icon: ImageIcon },
      { href: "/admin/navigation_items", label: "Navigation", icon: Link2 },
      { href: "/admin/social_links", label: "Social links", icon: Contact },
      { href: "/admin/inquiries", label: "Inquiries", icon: Inbox },
      { href: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Dashboard" className="flex h-full flex-col gap-6 p-4">
      {groups.map((group) => (
        <div key={group.title}>
          <p className="admin-label mb-2">{group.title}</p>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const active =
                item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2.5 rounded px-3 py-2 text-sm transition-colors",
                      active
                        ? "bg-graphite text-offwhite"
                        : "text-muted hover:bg-graphite/60 hover:text-offwhite",
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden />
                    {item.label}
                    {active ? (
                      <span className="ms-auto h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
