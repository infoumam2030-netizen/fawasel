"use client";

import { useEffect, useState, useCallback } from "react";

interface UsePolledResourceOptions {
  intervalMs?: number;
  errorMessage?: string;
}

interface UsePolledResourceResult<T> {
  data: T;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

const DEFAULT_POLL_INTERVAL_MS = 30_000;

/**
 * Fetches `url` on mount and re-fetches every `intervalMs` (default 30s) so
 * data fed by an external source (e.g. the Google Sheets-backed API routes)
 * stays live without a page reload. Shared by useUnits and useAvailability.
 */
export function usePolledResource<T>(
  url: string,
  initialData: T,
  { intervalMs = DEFAULT_POLL_INTERVAL_MS, errorMessage = "تعذر تحميل البيانات، حاول مجددًا لاحقًا" }: UsePolledResourceOptions = {}
): UsePolledResourceResult<T> {
  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(errorMessage);
        const json: T = await res.json();
        if (ignore) return;
        setData(json);
        setError(null);
      } catch {
        if (!ignore) setError(errorMessage);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    load();
    const interval = setInterval(load, intervalMs);

    return () => {
      ignore = true;
      clearInterval(interval);
    };
  }, [url, intervalMs, errorMessage, reloadKey]);

  const refetch = useCallback(() => setReloadKey((key) => key + 1), []);

  return { data, isLoading, error, refetch };
}
