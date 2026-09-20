/**
 * Memoized version of computational tasks for python-utils-73
 * Improves performance for repeated heavy operations.
 */

export interface CacheOptions {
  ttl?: number;
}

export type MemoizedFunc<T, R> = (arg: T) => R;

const cache = new Map<string, { value: any; timestamp: number }>();

/**
 * Wraps a transformation function with an LRU-like cache
 */
export function memoize<T, R>(
  fn: (arg: T) => R,
  ttl: number = 300000
): MemoizedFunc<T, R> {
  return (arg: T): R => {
    const key = JSON.stringify(arg);
    const now = Date.now();

    if (cache.has(key)) {
      const cached = cache.get(key)!;
      if (now - cached.timestamp < ttl) {
        return cached.value as R;
      }
      cache.delete(key);
    }

    const result = fn(arg);
    cache.set(key, { value: result, timestamp: now });

    if (cache.size > 1000) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }

    return result;
  };
}