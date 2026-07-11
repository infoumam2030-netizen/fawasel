"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PackageSearch } from "lucide-react";
import type { Unit, UnitFilters } from "@/types/unit";
import { useUnits } from "@/hooks/useUnits";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Skeleton } from "@/components/ui/Skeleton";
import { UnitFiltersBar } from "@/components/units/UnitFiltersBar";
import { UnitCard } from "@/components/units/UnitCard";
import { UnitDetailsModal } from "@/components/units/UnitDetailsModal";

const DEFAULT_FILTERS: UnitFilters = {
  search: "",
  status: "all",
  minPrice: null,
  maxPrice: null,
  minArea: null,
  maxArea: null,
  sortBy: "id-asc",
  availableOnly: false,
};

function applyFilters(units: Unit[], filters: UnitFilters): Unit[] {
  let result = units.filter((unit) => {
    if (filters.search && !unit.id.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.status !== "all" && unit.status !== filters.status) return false;
    if (filters.availableOnly && unit.status !== "available") return false;
    if (filters.minPrice !== null && unit.price < filters.minPrice) return false;
    if (filters.maxPrice !== null && unit.price > filters.maxPrice) return false;
    if (filters.minArea !== null && unit.area < filters.minArea) return false;
    if (filters.maxArea !== null && unit.area > filters.maxArea) return false;
    return true;
  });

  result = [...result].sort((a, b) => {
    switch (filters.sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "area-asc":
        return a.area - b.area;
      case "area-desc":
        return b.area - a.area;
      default:
        return a.id.localeCompare(b.id);
    }
  });

  return result;
}

export function Units() {
  const { units, isLoading } = useUnits();
  const [filters, setFilters] = useState<UnitFilters>(DEFAULT_FILTERS);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

  const filteredUnits = useMemo(() => applyFilters(units, filters), [units, filters]);

  return (
    <section id="units" className="bg-bg py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="الوحدات المتاحة"
          title="تصفّح وحدات تاون هاوس القادسية"
          description="18 وحدة بتصميم موحّد، فلترة فورية بدون إعادة تحميل الصفحة."
          className="mb-10"
        />

        <div className="mb-10">
          <UnitFiltersBar filters={filters} onChange={setFilters} />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/3.4] w-full rounded-3xl" />
            ))}
          </div>
        ) : filteredUnits.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-primary/20 py-20 text-center">
            <PackageSearch className="h-10 w-10 text-primary/40" />
            <p className="font-semibold text-text/60">لا توجد وحدات مطابقة لمعايير البحث الحالية</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredUnits.map((unit) => (
                <UnitCard key={unit.id} unit={unit} onDetails={setSelectedUnit} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </Container>

      <UnitDetailsModal unit={selectedUnit} onClose={() => setSelectedUnit(null)} />
    </section>
  );
}
