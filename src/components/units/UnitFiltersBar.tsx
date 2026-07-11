"use client";

import { Search } from "lucide-react";
import type { UnitFilters } from "@/types/unit";
import { cn } from "@/lib/utils";

interface UnitFiltersBarProps {
  filters: UnitFilters;
  onChange: (filters: UnitFilters) => void;
}

const STATUS_OPTIONS: { value: UnitFilters["status"]; label: string }[] = [
  { value: "all", label: "جميع الحالات" },
  { value: "available", label: "متاحة" },
  { value: "reserved", label: "محجوزة" },
  { value: "sold", label: "مباعة" },
];

const SORT_OPTIONS: { value: UnitFilters["sortBy"]; label: string }[] = [
  { value: "id-asc", label: "الترتيب الافتراضي" },
  { value: "price-asc", label: "السعر: من الأقل للأعلى" },
  { value: "price-desc", label: "السعر: من الأعلى للأقل" },
  { value: "area-asc", label: "المساحة: من الأقل للأعلى" },
  { value: "area-desc", label: "المساحة: من الأعلى للأقل" },
];

export function UnitFiltersBar({ filters, onChange }: UnitFiltersBarProps) {
  return (
    <div className="glass flex flex-col gap-4 rounded-3xl p-5 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text/40" />
          <input
            type="search"
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            placeholder="ابحث برقم الوحدة..."
            className="w-full rounded-full border border-primary/15 bg-white/70 py-3 pe-11 ps-5 text-sm outline-none transition-colors focus:border-primary"
            aria-label="ابحث برقم الوحدة"
          />
        </div>

        <select
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value as UnitFilters["status"] })}
          className="rounded-full border border-primary/15 bg-white/70 px-5 py-3 text-sm outline-none focus:border-primary"
          aria-label="تصفية حسب الحالة"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          value={filters.sortBy}
          onChange={(e) => onChange({ ...filters, sortBy: e.target.value as UnitFilters["sortBy"] })}
          className="rounded-full border border-primary/15 bg-white/70 px-5 py-3 text-sm outline-none focus:border-primary"
          aria-label="ترتيب حسب"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm font-medium text-text/70">
          الحد الأدنى للسعر
          <input
            type="number"
            min={0}
            value={filters.minPrice ?? ""}
            onChange={(e) => onChange({ ...filters, minPrice: e.target.value ? Number(e.target.value) : null })}
            className="w-28 rounded-full border border-primary/15 bg-white/70 px-3 py-1.5 text-sm outline-none focus:border-primary"
          />
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-text/70">
          الحد الأعلى للسعر
          <input
            type="number"
            min={0}
            value={filters.maxPrice ?? ""}
            onChange={(e) => onChange({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : null })}
            className="w-28 rounded-full border border-primary/15 bg-white/70 px-3 py-1.5 text-sm outline-none focus:border-primary"
          />
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-text/70">
          مساحة من
          <input
            type="number"
            min={0}
            value={filters.minArea ?? ""}
            onChange={(e) => onChange({ ...filters, minArea: e.target.value ? Number(e.target.value) : null })}
            className="w-24 rounded-full border border-primary/15 bg-white/70 px-3 py-1.5 text-sm outline-none focus:border-primary"
          />
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-text/70">
          إلى
          <input
            type="number"
            min={0}
            value={filters.maxArea ?? ""}
            onChange={(e) => onChange({ ...filters, maxArea: e.target.value ? Number(e.target.value) : null })}
            className="w-24 rounded-full border border-primary/15 bg-white/70 px-3 py-1.5 text-sm outline-none focus:border-primary"
          />
        </label>

        <button
          type="button"
          onClick={() => onChange({ ...filters, availableOnly: !filters.availableOnly })}
          className={cn(
            "ms-auto flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
            filters.availableOnly
              ? "border-primary bg-primary text-white"
              : "border-primary/20 bg-white/70 text-text/70 hover:border-primary/40"
          )}
          aria-pressed={filters.availableOnly}
        >
          <span
            className={cn(
              "h-2 w-2 rounded-full",
              filters.availableOnly ? "bg-white" : "bg-primary/40"
            )}
          />
          المتاح فقط
        </button>
      </div>
    </div>
  );
}
