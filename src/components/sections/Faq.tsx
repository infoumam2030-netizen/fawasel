"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(siteConfig.faq.items[0]?.id ?? null);

  return (
    <section id="faq" className="relative overflow-hidden bg-soft-gray py-24 sm:py-32">
      <Container className="relative mx-auto flex max-w-3xl flex-col gap-14">
        <SectionHeading
          eyebrow={siteConfig.faq.eyebrow}
          title={siteConfig.faq.title}
          description={siteConfig.faq.description}
          dark
        />

        <div className="flex flex-col gap-3">
          {siteConfig.faq.items.map((item) => {
            const isOpen = item.id === openId;
            return (
              <Reveal key={item.id}>
                <div
                  className={cn(
                    "overflow-hidden rounded-2xl border bg-white transition-colors",
                    isOpen ? "border-gold/40" : "border-navy/10"
                  )}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-start"
                  >
                    <span className="font-heading text-base font-bold text-navy sm:text-lg">{item.question}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                        isOpen ? "bg-gold text-navy" : "bg-navy/5 text-navy"
                      )}
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-6 pb-6 text-sm leading-relaxed text-navy/65">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
