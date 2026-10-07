/**
 * Optimized data processing helpers for python-utils-73
 */

export interface CacheEntry<T> {
  value: T;
  expiry: number;
}

const cache = new Map<string, CacheEntry<any>>();

/**
 * Memoizes function execution with time-to-live support
 */
export function memoize<T>(fn: (...args: any[]) => T, ttl: number = 300000) {
  return (...args: any[]): T => {
    const key = JSON.stringify(args);
    const now = Date.now();

    if (cache.has(key)) {
      const entry = cache.get(key)!;
      if (now < entry.expiry) {
        return entry.value as T;
      }
      cache.delete(key);
    }

    const result = fn(...args);
    cache.set(key, { value: result, expiry: now + ttl });
    return result;
  };
}

/**
 * Batched processor to reduce event loop overhead
 */
export async function batchProcess<T, R>(items: T[], processor: (batch: T[]) => Promise<R[]>, size: number = 100): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += size) {
    const batch = items.slice(i, i + size);
    const processed = await processor(batch);
    results.push(...processed);
  }
  return results;
}