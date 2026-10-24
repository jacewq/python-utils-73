/**
 * String conversion helpers with memoized lookup caches for high-throughput
 * naming convention transformations (e.g., camelCase <-> snake_case).
 */

const MAX_CACHE_SIZE = 1000;
const snakeCache = new Map<string, string>();
const camelCache = new Map<string, string>();

/**
 * Helper to enforce LRU-like eviction on simple Map caches.
 */
function setCached(cache: Map<string, string>, key: string, value: string): void {
  if (cache.size >= MAX_CACHE_SIZE) {
    const firstKey = cache.keys().next().value;
    if (firstKey !== undefined) {
      cache.delete(firstKey);
    }
  }
  cache.set(key, value);
}

/**
 * Converts camelCase or PascalCase strings to snake_case with caching.
 */
export function toSnakeCase(str: string): string {
  const cached = snakeCache.get(str);
  if (cached !== undefined) {
    return cached;
  }

  const result = str
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
    .toLowerCase();

  setCached(snakeCache, str, result);
  return result;
}

/**
 * Converts snake_case strings to camelCase with caching.
 */
export function toCamelCase(str: string): string {
  const cached = camelCache.get(str);
  if (cached !== undefined) {
    return cached;
  }

  const result = str
    .toLowerCase()
    .replace(/_([a-z0-9])/g, (_, char) => char.toUpperCase());

  setCached(camelCache, str, result);
  return result;
}

/**
 * Clears internal transformation caches to free memory.
 */
export function clearHelperCaches(): void {
  snakeCache.clear();
  camelCache.clear();
}
