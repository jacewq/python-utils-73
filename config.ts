/**
 * Configuration cache module for python-utils-73
 * Implements memoization for heavy environment resolution
 */

export interface AppConfig {
  env: string;
  debug: boolean;
  cacheTimeout: number;
}

const CACHE_TTL = 5000;
let cachedConfig: AppConfig | null = null;
let lastFetch = 0;

/**
 * Resolves configuration with memory caching
 * Reduces overhead of frequent process.env access
 */
export function getConfig(): AppConfig {
  const now = Date.now();

  if (cachedConfig && (now - lastFetch) < CACHE_TTL) {
    return cachedConfig;
  }

  cachedConfig = {
    env: process.env.NODE_ENV || 'development',
    debug: process.env.DEBUG === 'true',
    cacheTimeout: parseInt(process.env.CACHE_TTL || '5000', 10),
  };

  lastFetch = now;
  return cachedConfig;
}

/**
 * Clears internal cache manually
 */
export function invalidateConfig(): void {
  cachedConfig = null;
  lastFetch = 0;
}