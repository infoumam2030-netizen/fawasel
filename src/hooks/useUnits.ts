"use client";

import { usePolledResource } from "@/hooks/usePolledResource";
import type { Unit } from "@/types/unit";

interface UseUnitsResult {
  units: Unit[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useUnits(): UseUnitsResult {
  const { data, isLoading, error, refetch } = usePolledResource<Unit[]>("/api/units", [], {
    errorMessage: "تعذر تحميل بيانات الوحدات، حاول مجددًا لاحقًا",
  });

  return { units: data, isLoading, error, refetch };
}
