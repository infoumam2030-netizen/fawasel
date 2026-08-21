import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/site/LocaleSwitcher";
import { PantherMark } from "@/components/site/PantherMark";
import { Container } from "@/components/ui/Container";

/**
 * Foundation header: brand lockup plus the locale switcher.
 *
 * The full navigation — scroll-reactive background, the premium mobile menu
 * and the primary CTA — arrives with the public site in Phase 04, once the
 * pages those links point at exist. Linking to routes that 404 today would
 * be worse than leaving them out.
 */
export function Header() {
  const t = useTranslations("brand");

  return (
    <header className="sticky top-0 z-40 border-b border-border-soft bg-ink/85 backdrop-blur-md">
      <Container className="flex h-16 items-center gap-4">
        <Link href="/" className="flex items-center gap-3 text-foreground">
          <PantherMark className="h-7 w-7" title={t("name")} />
          <span className="latin text-sm font-semibold tracking-[0.22em]">{t("name")}</span>
        </Link>
        <LocaleSwitcher className="ms-auto" />
      </Container>
    </header>
  );
}
