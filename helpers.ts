/**
 * Efficient LRU cache for high-frequency utility operations.
 */
export class FastCache<K, V> {
  private cache = new Map<K, V>();
  private readonly maxSize: number;

  constructor(maxSize: number = 1000) {
    this.maxSize = maxSize;
  }

  get(key: K): V | undefined {
    const item = this.cache.get(key);
    if (item !== undefined) {
      // Refresh position to maintain LRU order
      this.cache.delete(key);
      this.cache.set(key, item);
    }
    return item;
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
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

const snakeToCamelCache = new FastCache<string, string>(2000);

/**
 * Converts snake_case string to camelCase with memoized lookup.
 */
export function snakeToCamel(str: string): string {
  const cached = snakeToCamelCache.get(str);
  if (cached !== undefined) return cached;

  const result = str.replace(/_([a-z0-9])/g, (_, letter) => letter.toUpperCase());
  snakeToCamelCache.set(str, result);
  return result;
}

/**
 * Efficiently transforms object keys in batch using cached transformations.
 */
export function memoizedKeyMapper<T extends Record<string, unknown>>(obj: T): Record<string, unknown> {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return obj;
  }

  const transformed: Record<string, unknown> = {};
  const keys = Object.keys(obj);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    transformed[snakeToCamel(key)] = obj[key];
  }

  return transformed;
}