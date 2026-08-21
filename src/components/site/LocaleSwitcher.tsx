"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { LOCALE_LABEL, routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * Switches locale while staying on the current page. `usePathname` from the
 * i18n navigation helpers returns the pathname *without* the locale prefix,
 * so the same path can simply be re-pushed under the other locale.
 */
export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations("locale");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const next = routing.locales.find((l) => l !== locale) ?? routing.defaultLocale;

  return (
    <button
      type="button"
      lang={next}
      disabled={isPending}
      aria-label={t("switchTo")}
      onClick={() => startTransition(() => router.replace(pathname, { locale: next }))}
      className={cn(
        "border border-border px-3 py-1.5 text-xs font-medium tracking-wide text-muted",
        "transition-colors duration-200 hover:border-lavender hover:text-foreground",
        "disabled:opacity-50",
        className
      )}
    >
      {LOCALE_LABEL[next]}
    </button>
  );
}
