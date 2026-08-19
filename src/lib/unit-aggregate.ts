import { siteConfig } from "@/config/site.config";
import type { Unit, UnitType } from "@/types/unit";

export interface UnitTypeAggregate {
  count: number;
  startingPrice: number;
}

/**
 * Aggregates live unit data (count + starting price) for one unit type,
 * falling back to the configured defaults when no live units of that type
 * are available (e.g. sheet not configured yet, or that type sold out).
 *
 * Deliberately client-safe: only depends on siteConfig and plain data, so
 * it can be imported from client components without pulling in
 * services/units.ts (which imports googleapis, a Node-only package that
 * cannot be bundled for the browser).
 */
export function aggregateUnitsByType(units: Unit[], type: UnitType): UnitTypeAggregate {
  const typeUnits = units.filter((u) => u.type === type);
  const fallback = siteConfig.unitTypes[type];

  if (typeUnits.length === 0) {
    return { count: 0, startingPrice: fallback.startingPrice };
  }

  return {
    count: typeUnits.length,
    startingPrice: Math.min(...typeUnits.map((u) => u.price)),
  };
}
