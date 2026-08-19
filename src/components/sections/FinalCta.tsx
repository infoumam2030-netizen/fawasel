"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { buildTelLink, cn } from "@/lib/utils";
import { fadeUpSlow, viewportOnce } from "@/lib/animations";

export function FinalCta() {
  const hasPhone = Boolean(siteConfig.contact.phone);

  return (
    <section className="bg-deep-navy py-32 text-center sm:py-40">
      <Container>
        <motion.div
          variants={fadeUpSlow}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto flex max-w-2xl flex-col items-center gap-8"
        >
          <span className="gold-rule" />
          <h2 className="text-4xl font-semibold leading-[1.2] text-gold sm:text-5xl lg:text-6xl">
            قد تكون وحدتك القادمة هنا.
          </h2>
          <p className="text-lg text-white/70">
            اكتشف خيارات {siteConfig.projectName} وتواصل معنا لمعرفة الوحدات المتاحة.
          </p>

          <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
            <WhatsAppButton variant="gold" size="lg" label="واتساب" />
            <a href={hasPhone ? buildTelLink(siteConfig.contact.phone) : undefined}>
              <Button
                variant="outline-light"
                size="lg"
                disabled={!hasPhone}
                aria-disabled={!hasPhone}
                className={cn(!hasPhone && "cursor-not-allowed opacity-50")}
              >
                <Phone className="h-4 w-4" />
                اتصال
              </Button>
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
