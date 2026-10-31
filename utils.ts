/**
 * Memoized execution wrapper to reduce re-computation overhead
 */
export function memoize<T, R>(fn: (arg: T) => R): (arg: T) => R {
  const cache = new Map<T, R>();
  return (arg: T): R => {
    if (cache.has(arg)) {
      return cache.get(arg)!;
    }
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}

/**
 * Batched processor for high-volume data streams
 */
export async function processInBatches<T, R>(
  items: T[],
  handler: (batch: T[]) => Promise<R[]>,
  batchSize: number = 50
): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResult = await handler(batch);
    results.push(...batchResult);
  }
  return results;
}

/**
 * Debounce wrapper for performance-sensitive event listeners
 */
export function debounce<F extends (...args: any[]) => void>(fn: F, delay: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}