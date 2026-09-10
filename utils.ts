/**
 * Fast LRU Cache optimized for core string transformation routines
 * commonly used when converting Python data models to JS format.
 */
export class FastLRUCache<K, V> {
  private capacity: number;
  private cache: Map<K, V>;

  constructor(capacity: number = 500) {
    this.capacity = capacity;
    this.cache = new Map<K, V>();
  }

  get(key: K): V | undefined {
    const item = this.cache.get(key);
    if (item !== undefined) {
      // Refresh insertion order for eviction logic
      this.cache.delete(key);
      this.cache.set(key, item);
    }
    return item;
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
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

const snakeToCamelCache = new FastLRUCache<string, string>(1000);

/**
 * Converts python_snake_case to camelCase with LRU memoization optimization.
 */
export function memoizedSnakeToCamel(str: string): string {
  const cached = snakeToCamelCache.get(str);
  if (cached !== undefined) {
    return cached;
  }

  const transformed = str.replace(/_([a-z0-9])/g, (_, char) => char.toUpperCase());
  snakeToCamelCache.set(str, transformed);
  return transformed;
}