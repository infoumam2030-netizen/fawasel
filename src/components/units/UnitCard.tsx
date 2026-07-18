"use client";

import { motion } from "framer-motion";
import { BedDouble, Bath, Car, Ruler } from "lucide-react";
import type { Unit } from "@/types/unit";
import { StatusBadge } from "@/components/ui/Badge";
import { SmartImage } from "@/components/ui/SmartImage";
import { formatPrice } from "@/lib/utils";

interface UnitCardProps {
  unit: Unit;
  onDetails: (unit: Unit) => void;
}

export function UnitCard({ unit, onDetails }: UnitCardProps) {
  const isSold = unit.status === "sold";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className="glass group flex flex-col overflow-hidden rounded-3xl shadow-lg shadow-primary/5"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <SmartImage
          src={unit.image}
          alt={`وحدة ${unit.id}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />
        <div className="absolute right-4 top-4">
          <StatusBadge status={unit.status} />
        </div>
        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-2xl bg-white/90 px-3 py-1.5 font-heading text-lg font-extrabold text-primary shadow-md">
          <Ruler className="h-4 w-4" />
          {unit.area} م²
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-xl font-bold text-dark">وحدة {unit.id}</h3>
          <div className="rounded-xl bg-gold/15 px-3 py-1.5 text-sm font-bold text-gold">
            {formatPrice(unit.price)}
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-text/70">
          <span className="flex items-center gap-1.5">
            <BedDouble className="h-4 w-4" /> {unit.bedrooms}
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="h-4 w-4" /> {unit.bathrooms}
          </span>
          <span className="flex items-center gap-1.5">
            <Car className="h-4 w-4" /> {unit.parking}
          </span>
        </div>

        <button
          onClick={() => onDetails(unit)}
          disabled={isSold}
          className="mt-auto w-full rounded-full bg-primary py-2.5 text-sm font-bold text-white transition-colors hover:bg-hover disabled:cursor-not-allowed disabled:bg-dark/20 disabled:text-dark/50"
        >
          {isSold ? "غير متاحة" : "التفاصيل"}
        </button>
      </div>
    </motion.div>
  );
}
