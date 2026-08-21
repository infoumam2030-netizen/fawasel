import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-soft bg-surface">
      <Container className="flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <span className="latin text-sm font-semibold tracking-[0.22em] text-foreground">
            {t("brand.name")}
          </span>
          <span className="latin text-xs tracking-[0.18em] text-faint">{t("brand.business")}</span>
        </div>
        <p className="latin text-xs tracking-[0.14em] text-muted">{t("footer.services")}</p>
        <p className="text-xs text-faint">
          <span className="latin">© {year} </span>
          {t("brand.name")} — {t("footer.rights")}
        </p>
      </Container>
    </footer>
  );
}
