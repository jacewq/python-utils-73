/**
 * Configuration management for python-utils-73
 * Implements memoization to optimize lookup performance
 */

interface ConfigCache {
  [key: string]: any;
}

const cache: ConfigCache = {};

export const getOptimizedConfig = <T>(key: string, provider: () => T): T => {
  if (!(key in cache)) {
    cache[key] = provider();
  }
  return cache[key] as T;
};

export const clearConfigCache = (): void => {
  for (const key in cache) {
    delete cache[key];
  }
};

export const ENV_CONFIG = {
  TIMEOUT: 5000,
  RETRY_LIMIT: 3,
  DEBUG: process.env.NODE_ENV !== 'production'
};

Object.freeze(ENV_CONFIG);