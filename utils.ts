/**
 * Optimized utility collection for python-utils-73
 */

export type MemoizedFunction<T extends any[], R> = (...args: T) => R;

/**
 * LRU-style cache implementation for high-frequency operations
 */
export function memoize<T extends any[], R>(fn: (...args: T) => R): MemoizedFunction<T, R> {
  const cache = new Map<string, R>();

  return (...args: T): R => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = fn(...args);
    cache.set(key, result);

    // Prevent memory leaks for long-running processes
    if (cache.size > 1000) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }

    return result;
  };
}

/**
 * Batched execution to minimize event loop blocking
 */
export async function batchProcess<T, R>(
  items: T[],
  processor: (item: T) => Promise<R>,
  concurrency: number = 5
): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += concurrency) {
    const chunk = items.slice(i, i + concurrency);
    const batch = await Promise.all(chunk.map(processor));
    results.push(...batch);
  }
  return results;
}

/**
 * Efficient data transformation helper
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};