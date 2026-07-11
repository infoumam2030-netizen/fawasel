"use client";

import { useEffect, useState, useCallback } from "react";
import type { Unit } from "@/types/unit";

interface UseUnitsResult {
  units: Unit[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

const POLL_INTERVAL_MS = 30_000;

export function useUnits(): UseUnitsResult {
  const [units, setUnits] = useState<Unit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const res = await fetch("/api/units", { cache: "no-store" });
        if (!res.ok) throw new Error("تعذر تحميل بيانات الوحدات");
        const data: Unit[] = await res.json();
        if (ignore) return;
        setUnits(data);
        setError(null);
      } catch {
        if (!ignore) setError("تعذر تحميل بيانات الوحدات، حاول مجددًا لاحقًا");
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    load();
    const interval = setInterval(load, POLL_INTERVAL_MS);

    return () => {
      ignore = true;
      clearInterval(interval);
    };
  }, [reloadKey]);

  const refetch = useCallback(() => setReloadKey((key) => key + 1), []);

  return { units, isLoading, error, refetch };
}
