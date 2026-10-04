/**
 * Highly optimized memoization utility inspired by Python's functools.lru_cache.
 * Uses a Map for O(1) lookups and implements a basic LRU eviction policy
 * to keep memory footprint bounded during large-scale operations.
 */

export interface CacheOptions<K, V> {
  maxSize?: number;
  resolver?: (...args: any[]) => K;
}

export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  options: CacheOptions<any, ReturnType<T>> = {}
): T {
  const maxSize = options.maxSize ?? 1000;
  const resolver = options.resolver;
  const cache = new Map<any, ReturnType<T>>();

  return function (this: any, ...args: Parameters<T>): ReturnType<T> {
    const key = resolver ? resolver(...args) : args[0];

    if (cache.has(key)) {
      // Move accessed key to the end to maintain LRU order
      const value = cache.get(key)!;
      cache.delete(key);
      cache.set(key, value);
      return value;
    }

    const result = fn.apply(this, args);

    // Evict oldest entry when capacity limit is reached
    if (cache.size >= maxSize) {
      const oldestKey = cache.keys().next().value;
      if (oldestKey !== undefined) {
        cache.delete(oldestKey);
      }
    }

    cache.set(key, result);
    return result;
  } as T;
}