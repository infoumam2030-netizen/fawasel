"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, fadeUpSlow, viewportOnce } from "@/lib/animations";

function DistanceList({ title, items }: { title: string; items: { id: string; name: string; distance: string }[] }) {
  return (
    <div>
      <h3 className="mb-5 text-sm font-semibold tracking-wide text-dark-gold">{title}</h3>
      <ul className="flex flex-col">
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between border-b border-border py-4 text-navy">
            <span>{item.name}</span>
            <span className="font-medium text-muted">{item.distance}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Location() {
  const { googleMapsUrl, googleMapsEmbedUrl, landmarks, districts } = siteConfig.location;

  return (
    <section id="location" className="bg-white py-28 sm:py-36">
      <Container>
        <SectionHeading eyebrow="الموقع" title="في موقع يختصر عليك الطريق" className="mb-14" />

        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <motion.div
            variants={fadeUpSlow}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative aspect-[4/3] overflow-hidden border border-border lg:aspect-auto lg:min-h-[520px]"
          >
            {googleMapsEmbedUrl ? (
              <iframe
                src={googleMapsEmbedUrl}
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`خريطة موقع ${siteConfig.projectName}`}
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-navy text-white/60">
                <MapPin className="h-8 w-8 text-gold" />
                <span className="text-sm">الخريطة التفاعلية ستُضاف قريبًا</span>
              </div>
            )}
            {googleMapsUrl && (
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-5 right-5 border border-gold bg-white/95 px-5 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-gold hover:text-navy"
              >
                فتح في خرائط جوجل
              </a>
            )}
          </motion.div>

          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-12"
          >
            <motion.div variants={fadeUpSlow}>
              <DistanceList title="معالم قريبة" items={landmarks} />
            </motion.div>
            <motion.div variants={fadeUpSlow}>
              <DistanceList title="أحياء قريبة" items={districts} />
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
