"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Gallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, direction: "rtl" });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (selectedIndex === null) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") setSelectedIndex((i) => (i === null ? null : (i + 1) % siteConfig.gallery.length));
      if (e.key === "ArrowRight")
        setSelectedIndex((i) => (i === null ? null : (i - 1 + siteConfig.gallery.length) % siteConfig.gallery.length));
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <section id="gallery" className="bg-white py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="معرض الصور" title="لقطات من فواصل" className="mb-12" />
      </Container>

      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 px-5 sm:px-8 lg:px-10">
            {siteConfig.gallery.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setSelectedIndex(index)}
                className="group relative aspect-[4/3] w-[80%] shrink-0 overflow-hidden rounded-3xl sm:w-[45%] lg:w-[30%]"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 80vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="absolute bottom-4 right-4 translate-y-2 text-sm font-semibold text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  {image.alt}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={scrollPrev}
            aria-label="السابق"
            className="rounded-full border border-primary/20 p-3 text-primary transition-colors hover:bg-primary hover:text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <button
            onClick={scrollNext}
            aria-label="التالي"
            className="rounded-full border border-primary/20 p-3 text-primary transition-colors hover:bg-primary hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-dark/90 p-6"
            role="dialog"
            aria-modal="true"
            onClick={() => setSelectedIndex(null)}
          >
            <button
              aria-label="إغلاق"
              className="absolute top-6 left-6 text-white/70 hover:text-white"
              onClick={() => setSelectedIndex(null)}
            >
              <X className="h-8 w-8" />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="relative aspect-[4/3] w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={siteConfig.gallery[selectedIndex].src}
                alt={siteConfig.gallery[selectedIndex].alt}
                fill
                className="rounded-2xl object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
