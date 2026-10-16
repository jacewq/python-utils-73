interface MemoizeOptions {
  ttl?: number;
}

/**
 * Memoizes function results using a simple cache with TTL
 * to improve performance of repetitive computational tasks
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  options: MemoizeOptions = {}
): (...args: Parameters<T>) => ReturnType<T> {
  const cache = new Map<string, { value: ReturnType<T>; expiry: number }>();
  const ttl = options.ttl || 60000;

  return (...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    const now = Date.now();

    if (cache.has(key)) {
      const cached = cache.get(key)!;
      if (cached.expiry > now) {
        return cached.value;
      }
      cache.delete(key);
    }

    const result = fn(...args);
    cache.set(key, { value: result, expiry: now + ttl });
    return result;
  };
}

/**
 * Batched processing utility to minimize event loop blocking
 */
export async function batchProcess<T, R>(
  items: T[],
  processor: (item: T) => R,
  batchSize: number = 100
): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    results.push(...batch.map(processor));
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
  return results;
}