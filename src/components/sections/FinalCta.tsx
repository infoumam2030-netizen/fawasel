"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/ui/Magnetic";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { buildTelLink } from "@/lib/utils";
import { fadeUp, viewportOnce } from "@/lib/animations";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-accent to-primary py-24 text-center sm:py-28">
      <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] [background-size:24px_24px]" />

      <Container className="relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto flex max-w-2xl flex-col items-center gap-6"
        >
          <span className="rounded-full border border-gold/40 bg-gold/10 px-5 py-1.5 text-sm font-semibold text-gold">
            فرصة محدودة — 18 وحدة فقط
          </span>
          <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
            احجز وحدتك الآن في {siteConfig.projectName}
          </h2>
          <p className="text-lg text-white/80">
            تسليم فوري، خصوصية ميني كومباوند، وأسعار تبدأ من 1,330,000 ريال. تواصل مع فريق أمم العقارية اليوم.
          </p>

          <div className="mt-2 flex flex-col items-center gap-4 sm:flex-row">
            <Magnetic>
              <WhatsAppButton variant="gold" size="lg" label="استفسر عبر واتساب" />
            </Magnetic>
            <Magnetic>
              <a href={buildTelLink(siteConfig.phoneNumber)}>
                <Button variant="outline" size="lg">
                  <Phone className="h-5 w-5" />
                  اتصل بنا
                </Button>
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
