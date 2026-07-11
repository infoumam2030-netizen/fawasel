"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { buildWhatsAppLink, cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
  variant?: "primary" | "gold" | "glass" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  label?: string;
}

export function WhatsAppButton({
  message = "مرحبًا، أرغب بالاستفسار عن مشروع تاون هاوس القادسية",
  className,
  variant = "gold",
  size = "md",
  label = "تواصل عبر واتساب",
}: WhatsAppButtonProps) {
  const href = buildWhatsAppLink(siteConfig.whatsappNumber, message);

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(className)}
      onClick={() => window.open(href, "_blank", "noopener,noreferrer")}
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      {label}
    </Button>
  );
}
