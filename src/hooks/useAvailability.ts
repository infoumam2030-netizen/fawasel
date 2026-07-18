"use client";

import { usePolledResource } from "@/hooks/usePolledResource";
import type { AvailabilityStats } from "@/types/unit";

interface UseAvailabilityResult {
  stats: AvailabilityStats | null;
  isLoading: boolean;
}

export function useAvailability(): UseAvailabilityResult {
  const { data, isLoading } = usePolledResource<AvailabilityStats | null>("/api/availability", null, {
    errorMessage: "تعذر تحميل إحصائيات التوفر",
  });

  return { stats: data, isLoading };
}
