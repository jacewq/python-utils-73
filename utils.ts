/**
 * High-performance memoized string utilities simulating Python-style string transformations.
 */

class LRUCache<K, V> {
  private cache = new Map<K, V>();

  constructor(private readonly limit: number = 500) {}

  get(key: K): V | undefined {
    const item = this.cache.get(key);
    if (item !== undefined) {
      // Move accessed key to the end to maintain insertion order for LRU
      this.cache.delete(key);
      this.cache.set(key, item);
    }
    return item;
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.limit) {
      // Evict oldest entry (first item in Map iterator)
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }
    this.cache.set(key, value);
  }

  clear(): void {
    this.cache.clear();
  }
}

const snakeCaseCache = new LRUCache<string, string>(1000);
const camelCaseCache = new LRUCache<string, string>(1000);

/**
 * Converts camelCase or PascalCase string to snake_case using cached regex evaluation.
 */
export function toSnakeCase(str: string): string {
  const cached = snakeCaseCache.get(str);
  if (cached !== undefined) return cached;

  const result = str
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
    .toLowerCase();

  snakeCaseCache.set(str, result);
  return result;
}

/**
 * Converts snake_case or kebab-case string to camelCase using cached regex evaluation.
 */
export function toCamelCase(str: string): string {
  const cached = camelCaseCache.get(str);
  if (cached !== undefined) return cached;

  const result = str.replace(/[-_]([a-z0-9])/g, (_, char) => char.toUpperCase());

  camelCaseCache.set(str, result);
  return result;
}

/**
 * Clears all internal transformation caches to free memory when needed.
 */
export function clearStringCaches(): void {
  snakeCaseCache.clear();
  camelCaseCache.clear();
}