"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { buildWhatsAppLink, cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
  variant?: "gold" | "navy" | "outline" | "outline-light" | "ghost";
  size?: "sm" | "md" | "lg";
  label?: string;
}

export function WhatsAppButton({
  message = `مرحبًا، أرغب بالاستفسار عن مشروع ${siteConfig.projectName}`,
  className,
  variant = "gold",
  size = "md",
  label = "تواصل عبر واتساب",
}: WhatsAppButtonProps) {
  const isConfigured = Boolean(siteConfig.contact.whatsapp);
  const href = isConfigured ? buildWhatsAppLink(siteConfig.contact.whatsapp, message) : undefined;

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(!isConfigured && "cursor-not-allowed opacity-50", className)}
      disabled={!isConfigured}
      aria-disabled={!isConfigured}
      onClick={() => href && window.open(href, "_blank", "noopener,noreferrer")}
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      {label}
    </Button>
  );
}
