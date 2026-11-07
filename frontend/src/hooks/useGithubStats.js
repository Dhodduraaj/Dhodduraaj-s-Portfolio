import { useState, useEffect, useCallback, useRef } from "react";
import {
  fetchGithubTelemetry,
  getCachedGithubData,
  isCacheStale,
  DEFAULT_GITHUB_STATS,
  CACHE_TTL_MS
} from "../services/githubService";

export function useGithubStats() {
  // Synchronously initialize from localStorage cache if available to prevent any layout shift or flicker
  const [githubStats, setGithubStats] = useState(() => {
    const cached = getCachedGithubData();
    return cached?.stats || DEFAULT_GITHUB_STATS;
  });

  const [repositories, setRepositories] = useState(() => {
    const cached = getCachedGithubData();
    return cached?.repositories || [];
  });

  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState(() => {
    const cached = getCachedGithubData();
    return cached?.timestamp || null;
  });
  const [isRateLimited, setIsRateLimited] = useState(false);

  // Keep a ref of lastFetchTime to avoid stale closures in event listeners
  const lastFetchTimeRef = useRef(lastFetchTime);
  useEffect(() => {
    lastFetchTimeRef.current = lastFetchTime;
  }, [lastFetchTime]);

  /**
   * Primary fetch orchestrator.
   * @param {boolean} force - Whether to bypass the 10-minute cache TTL check.
   */
  const performFetch = useCallback(async (force = false) => {
    setIsGithubLoading(true);
    try {
      const result = await fetchGithubTelemetry(force);
      if (result && result.stats) {
        setGithubStats(result.stats);
        if (result.repositories) {
          setRepositories(result.repositories);
        }
        if (result.timestamp) {
          setLastFetchTime(result.timestamp);
        }
        setIsRateLimited(Boolean(result.rateLimited));
      }
    } catch (err) {
      console.warn("Telemetry refresh error:", err);
    } finally {
      setIsGithubLoading(false);
    }
  }, []);

  /**
   * Manual refresh handler exposed to UI components.
   */
  const refreshGithub = useCallback(() => {
    return performFetch(true);
  }, [performFetch]);

  // Initial load and automated background refresh setup
  useEffect(() => {
    const cached = getCachedGithubData();
    // If no cache exists or existing cache is older than 10 minutes, fetch immediately in background
    if (!cached || isCacheStale(cached.timestamp)) {
      performFetch(false);
    }

    // 1. Recurring background interval: every 10 minutes
    const intervalId = setInterval(() => {
      performFetch(false);
    }, CACHE_TTL_MS);

    // 2. Tab focus & visibility change handler: revalidate when user returns to tab after 10+ minutes
    const handleVisibilityOrFocus = () => {
      if (document.visibilityState === "visible") {
        const elapsed = Date.now() - (lastFetchTimeRef.current || 0);
        if (elapsed > CACHE_TTL_MS) {
          performFetch(false);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityOrFocus);
    window.addEventListener("focus", handleVisibilityOrFocus);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityOrFocus);
      window.removeEventListener("focus", handleVisibilityOrFocus);
    };
  }, [performFetch]);

  return {
    githubStats,
    repositories,
    isGithubLoading,
    lastFetchTime,
    isRateLimited,
    refreshGithub
  };
}

