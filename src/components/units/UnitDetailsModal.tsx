"use client";

import { BedDouble, Bath, Car, Ruler, Sun, FileText } from "lucide-react";
import type { Unit } from "@/types/unit";
import { Modal } from "@/components/ui/Modal";
import { StatusBadge } from "@/components/ui/Badge";
import { SmartImage } from "@/components/ui/SmartImage";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { siteConfig } from "@/config/site.config";
import { formatPrice } from "@/lib/utils";

interface UnitDetailsModalProps {
  unit: Unit | null;
  onClose: () => void;
}

const FEATURES = (unit: Unit) => [
  { icon: Ruler, label: "المساحة", value: `${unit.area} م²` },
  { icon: BedDouble, label: "غرف النوم", value: unit.bedrooms },
  { icon: Bath, label: "دورات المياه", value: unit.bathrooms },
  { icon: Car, label: "المواقف", value: unit.parking },
  { icon: Sun, label: "مساحة الأسطح", value: `${unit.roofArea} م²` },
];

export function UnitDetailsModal({ unit, onClose }: UnitDetailsModalProps) {
  if (!unit) return null;

  return (
    <Modal isOpen={!!unit} onClose={onClose} title={`تفاصيل وحدة ${unit.id}`}>
      <div className="flex flex-col gap-6">
        <div className="relative aspect-video overflow-hidden rounded-2xl">
          <SmartImage src={unit.image} alt={`وحدة ${unit.id}`} fill className="object-cover" />
          <div className="absolute right-4 top-4">
            <StatusBadge status={unit.status} />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-gold/10 px-5 py-4">
          <span className="text-sm font-semibold text-text/60">السعر</span>
          <span className="font-heading text-2xl font-extrabold text-gold">{formatPrice(unit.price)}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {FEATURES(unit).map((f) => (
            <div key={f.label} className="flex flex-col items-center gap-1.5 rounded-2xl border border-primary/10 bg-primary/5 p-4 text-center">
              <f.icon className="h-5 w-5 text-primary" />
              <span className="font-heading text-lg font-bold text-dark">{f.value}</span>
              <span className="text-xs text-text/60">{f.label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <WhatsAppButton
            className="flex-1"
            variant="primary"
            label="استفسر عن هذه الوحدة"
            message={`مرحبًا، أرغب بالاستفسار عن وحدة ${unit.id} في ${siteConfig.projectName}`}
          />
          {unit.pdfUrl && (
            <a
              href={unit.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-primary/20 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary/5"
            >
              <FileText className="h-5 w-5" />
              تحميل ملف الوحدة PDF
            </a>
          )}
        </div>
      </div>
    </Modal>
  );
}
