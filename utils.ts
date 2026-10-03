/**
 * A fast, lightweight LRU cache implementation for memoizing expensive utility function calls.
 * Mimics the behavior of Python's functools.lru_cache.
 */
export class LRUCache<K, V> {
  private cache = new Map<K, V>();
  private maxLimit: number;

  constructor(maxLimit = 128) {
    this.maxLimit = maxLimit;
  }

  /**
   * Retrieves an item from the cache and updates its recency.
   */
  get(key: K): V | undefined {
    const item = this.cache.get(key);
    if (item !== undefined) {
      // Refresh key position to denote recent activity
      this.cache.delete(key);
      this.cache.set(key, item);
    }
    return item;
  }

  /**
   * Stores an item in the cache, evicting the least recently used if max limit is reached.
   */
  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxLimit) {
      // Map iteration order matches insertion order; first key is the oldest
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

/**
 * Memoizes a function using an LRU cache strategy to optimize performance of repetitive calls.
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  maxSize = 128
): (...args: Parameters<T>) => ReturnType<T> {
  const cache = new LRUCache<string, ReturnType<T>>(maxSize);

  return function (this: any, ...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args);
    const cachedResult = cache.get(key);
    if (cachedResult !== undefined) {
      return cachedResult;
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}