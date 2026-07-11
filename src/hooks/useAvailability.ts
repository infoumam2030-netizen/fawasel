"use client";

import { useEffect, useState } from "react";
import type { AvailabilityStats } from "@/types/unit";

const POLL_INTERVAL_MS = 30_000;

export function useAvailability() {
  const [stats, setStats] = useState<AvailabilityStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const res = await fetch("/api/availability", { cache: "no-store" });
        if (!res.ok) return;
        const data: AvailabilityStats = await res.json();
        if (!ignore) setStats(data);
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
  }, []);

  return { stats, isLoading };
}
