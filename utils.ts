/**
 * High-performance LRU cache implementation for utility function memoization.
 */
export class FastLRUCache<K, V> {
  private readonly capacity: number;
  private cache: Map<K, V>;

  constructor(capacity: number = 128) {
    this.capacity = capacity;
    this.cache = new Map<K, V>();
  }

  get(key: K): V | undefined {
    const item = this.cache.get(key);
    if (item !== undefined) {
      // Re-insert to maintain recency order
      this.cache.delete(key);
      this.cache.set(key, item);
    }
    return item;
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Delete least recently used (first key)
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
 * Memoize a pure function with a fast LRU cache.
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  capacity: number = 256
): T {
  const cache = new FastLRUCache<string, ReturnType<T>>(capacity);

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = args.length === 1 && typeof args[0] === 'string'
      ? args[0]
      : JSON.stringify(args);

    const cached = cache.get(key);
    if (cached !== undefined) {
      return cached;
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}
