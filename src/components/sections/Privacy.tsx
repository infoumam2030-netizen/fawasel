"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { clipReveal, fadeUpSlow, staggerContainer, viewportOnce } from "@/lib/animations";

export function Privacy() {
  const { title, highlights, image } = siteConfig.privacy;

  return (
    <section className="bg-bg py-28 sm:py-36">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <motion.div
            variants={clipReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative order-2 aspect-[4/5] overflow-hidden lg:order-1"
          >
            <Image src={image} alt="الخصوصية في التصميم" fill className="object-cover" />
          </motion.div>

          <div className="order-1 flex flex-col gap-10 lg:order-2">
            <motion.h2
              variants={fadeUpSlow}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="text-3xl font-semibold leading-[1.2] text-navy sm:text-4xl lg:text-5xl"
            >
              {title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </motion.h2>

            <motion.ul
              variants={staggerContainer(0.12)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="flex flex-col gap-5"
            >
              {highlights.map((item) => (
                <motion.li key={item} variants={fadeUpSlow} className="flex items-center gap-4 border-b border-border pb-5">
                  <span className="gold-rule shrink-0" />
                  <span className="text-lg text-navy">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
