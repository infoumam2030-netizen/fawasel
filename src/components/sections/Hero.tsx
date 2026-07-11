"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export function Hero() {
  const [videoFailed, setVideoFailed] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  function scrollToUnits() {
    document.getElementById("units")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="hero" className="relative flex h-[100svh] min-h-[560px] w-full items-center justify-center overflow-hidden bg-dark">
      <div className="absolute inset-0">
        <Image
          src={siteConfig.hero.posterImage}
          alt={siteConfig.projectName}
          fill
          priority
          className="object-cover"
        />
        {!videoFailed && (
          <motion.video
            autoPlay
            muted
            loop
            playsInline
            poster={siteConfig.hero.posterImage}
            onError={() => setVideoFailed(true)}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ scale: 1 }}
            animate={prefersReducedMotion ? {} : { scale: 1.12 }}
            transition={{ duration: 22, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          >
            <source src={siteConfig.hero.videoSrc} type="video/mp4" />
          </motion.video>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-dark/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark/50 via-transparent to-transparent" />

      <div className="relative z-10 flex flex-col items-center gap-7 px-5 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-full border border-gold/40 bg-gold/10 px-5 py-1.5 text-sm font-semibold tracking-wide text-gold"
        >
          {siteConfig.projectTagline}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-5xl font-extrabold leading-tight text-white drop-shadow-lg sm:text-6xl md:text-7xl"
        >
          {siteConfig.hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-xl font-semibold text-gold sm:text-2xl"
        >
          {siteConfig.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-2 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Magnetic>
            <WhatsAppButton
              variant="gold"
              size="lg"
              label={siteConfig.hero.ctaPrimary}
              message={`مرحبًا، أرغب بالاستفسار عن ${siteConfig.projectName}`}
            />
          </Magnetic>
          <Magnetic>
            <Button variant="outline" size="lg" onClick={scrollToUnits}>
              {siteConfig.hero.ctaSecondary}
            </Button>
          </Magnetic>
        </motion.div>
      </div>

      <motion.button
        onClick={scrollToUnits}
        aria-label="التمرير للأسفل"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: prefersReducedMotion ? 0 : [0, 10, 0] }}
        transition={{ opacity: { delay: 1, duration: 0.6 }, y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/30 p-2 text-white/80 backdrop-blur-sm transition-colors hover:text-gold"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.button>
    </section>
  );
}
