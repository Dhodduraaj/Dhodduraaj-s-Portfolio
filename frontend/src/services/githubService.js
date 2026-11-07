import axios from "axios";

export const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || "Dhodduraaj";
export const STORAGE_KEY = "dhodduraaj_github_telemetry_v1";
export const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

// In-flight request deduplication lock
let activeFetchPromise = null;

/**
 * Baseline statistics used only when no cache exists and the network is unavailable.
 */
export const DEFAULT_GITHUB_STATS = {
  repos: 22,
  originalRepos: 22,
  forkedRepos: 0,
  followers: 1,
  following: 0,
  stars: 3,
  languages: [
    { name: "JavaScript", percentage: 53 },
    { name: "Python", percentage: 12 },
    { name: "HTML", percentage: 12 },
    { name: "Java", percentage: 6 }
  ],
  lastUpdated: null,
  isCached: false
};

/**
 * Retrieve cached GitHub data from localStorage if available.
 */
export function getCachedGithubData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.stats && typeof parsed.timestamp === "number") {
      return parsed;
    }
  } catch (e) {
    console.warn("Failed to read GitHub cache from localStorage:", e);
  }
  return null;
}

/**
 * Persist GitHub data to localStorage.
 */
export function setCachedGithubData(stats, repositories = []) {
  try {
    const payload = {
      stats: {
        ...stats,
        isCached: true
      },
      repositories,
      timestamp: Date.now()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (e) {
    console.warn("Failed to save GitHub data to localStorage:", e);
  }
}

/**
 * Determine if cached data has exceeded its TTL (10 minutes).
 */
export function isCacheStale(timestamp) {
  if (!timestamp) return true;
  return Date.now() - timestamp > CACHE_TTL_MS;
}

/**
 * Fetch all public repositories for the user across all pages.
 */
async function fetchAllPublicRepos(username) {
  const repoMap = new Map();
  let page = 1;
  const perPage = 100;
  let lastRateLimit = null;

  while (page <= 10) { // Safety ceiling: up to 1,000 repositories
    const url = `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`;
    const res = await axios.get(url, {
      headers: {
        Accept: "application/vnd.github.v3+json"
      }
    });

    if (res.headers) {
      lastRateLimit = {
        limit: res.headers["x-ratelimit-limit"] ? parseInt(res.headers["x-ratelimit-limit"], 10) : null,
        remaining: res.headers["x-ratelimit-remaining"] ? parseInt(res.headers["x-ratelimit-remaining"], 10) : null,
        reset: res.headers["x-ratelimit-reset"] ? parseInt(res.headers["x-ratelimit-reset"], 10) : null
      };
    }

    const repos = res.data;
    if (!Array.isArray(repos) || repos.length === 0) {
      break;
    }

    for (const repo of repos) {
      if (repo && repo.id) {
        repoMap.set(repo.id, repo);
      }
    }

    // If fewer than perPage items returned, we have reached the last page
    if (repos.length < perPage) {
      break;
    }

    page++;
  }

  return {
    repos: Array.from(repoMap.values()),
    rateLimit: lastRateLimit
  };
}

/**
 * Fetch complete GitHub user profile and all public repositories.
 * Calculates dynamic statistics and updates localStorage cache.
 */
export async function fetchGithubTelemetry(force = false) {
  // If a request is already running, return the existing Promise to prevent duplicate calls
  if (activeFetchPromise) {
    return activeFetchPromise;
  }

  activeFetchPromise = (async () => {
    try {
      const cached = getCachedGithubData();

      // If not forced and cache is still fresh, return cached stats
      if (!force && cached && !isCacheStale(cached.timestamp)) {
        return {
          stats: { ...cached.stats, isCached: true },
          repositories: cached.repositories || [],
          timestamp: cached.timestamp,
          rateLimited: false
        };
      }

      // 1. Fetch user profile (contains authoritative public_repos, followers, following)
      const userRes = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        headers: {
          Accept: "application/vnd.github.v3+json"
        }
      });
      const userData = userRes.data || {};

      const userRateLimit = {
        limit: userRes.headers["x-ratelimit-limit"] ? parseInt(userRes.headers["x-ratelimit-limit"], 10) : null,
        remaining: userRes.headers["x-ratelimit-remaining"] ? parseInt(userRes.headers["x-ratelimit-remaining"], 10) : null,
        reset: userRes.headers["x-ratelimit-reset"] ? parseInt(userRes.headers["x-ratelimit-reset"], 10) : null
      };

      // 2. Fetch all public repositories with pagination
      const { repos: rawRepos, rateLimit: reposRateLimit } = await fetchAllPublicRepos(GITHUB_USERNAME);

      // 3. Process repository metadata
      const repositories = rawRepos.map((repo) => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
        url: repo.html_url,
        updatedAt: repo.updated_at,
        createdAt: repo.created_at,
        visibility: repo.visibility || (repo.private ? "private" : "public"),
        isArchived: Boolean(repo.archived),
        isFork: Boolean(repo.fork)
      }));

      // 4. Calculate dynamic statistics
      const totalStars = rawRepos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
      const originalRepos = rawRepos.filter((r) => !r.fork).length;
      const forkedRepos = rawRepos.filter((r) => r.fork).length;

      // Language distribution calculation
      const langMap = {};
      rawRepos.forEach((repo) => {
        if (repo.language) {
          langMap[repo.language] = (langMap[repo.language] || 0) + 1;
        }
      });

      const totalLangInstances = Object.values(langMap).reduce((a, b) => a + b, 0);
      const topLanguages = totalLangInstances > 0
        ? Object.entries(langMap)
            .map(([name, count]) => ({
              name,
              percentage: Math.round((count / totalLangInstances) * 100)
            }))
            .sort((a, b) => b.percentage - a.percentage)
            .slice(0, 4)
        : DEFAULT_GITHUB_STATS.languages;

      const dynamicStats = {
        // Authoritative public repos count from GitHub user profile; fallback to repos length
        repos: typeof userData.public_repos === "number" ? userData.public_repos : rawRepos.length,
        originalRepos,
        forkedRepos,
        followers: typeof userData.followers === "number" ? userData.followers : 0,
        following: typeof userData.following === "number" ? userData.following : 0,
        stars: totalStars,
        languages: topLanguages,
        lastUpdated: new Date().toISOString(),
        isCached: false,
        rateLimit: reposRateLimit || userRateLimit
      };

      // 5. Update cache with fresh data
      setCachedGithubData(dynamicStats, repositories);

      return {
        stats: dynamicStats,
        repositories,
        timestamp: Date.now(),
        rateLimited: false
      };
    } catch (err) {
      const status = err.response?.status;
      const isRateLimited = status === 403 || status === 429;
      const resetTime = err.response?.headers?.["x-ratelimit-reset"];

      if (isRateLimited) {
        const resetDate = resetTime ? new Date(parseInt(resetTime, 10) * 1000).toLocaleTimeString() : "soon";
        console.warn(`GitHub API rate limit reached. Reset expected at ${resetDate}. Retaining cached data.`);
      } else {
        console.warn("GitHub telemetry fetch failed:", err.message, ". Retaining cached data.");
      }

      // Check if we have valid cached data to fallback to
      const cached = getCachedGithubData();
      if (cached && cached.stats) {
        return {
          stats: {
            ...cached.stats,
            isCached: true,
            fallbackNotice: isRateLimited ? "Rate limit reached. Serving cached telemetry." : "Serving offline telemetry."
          },
          repositories: cached.repositories || [],
          timestamp: cached.timestamp,
          rateLimited: isRateLimited
        };
      }

      // If absolutely no cache exists, return sensible baseline without wiping the UI
      return {
        stats: {
          ...DEFAULT_GITHUB_STATS,
          fallbackNotice: isRateLimited ? "Rate limit reached." : "Offline mode."
        },
        repositories: [],
        timestamp: null,
        rateLimited: isRateLimited
      };
    } finally {
      activeFetchPromise = null;
    }
  })();

  return activeFetchPromise;
}

