export interface MemoizedResult<T> {
  value: T;
  timestamp: number;
}

/**
 * Optimized cache wrapper for intensive data processing
 * Uses simple timestamp-based TTL for memory efficiency
 */
export function memoize<T, Args extends any[]>( 
  fn: (...args: Args) => T, 
  ttl: number = 5000
): (...args: Args) => T {
  const cache = new Map<string, MemoizedResult<T>>();

  return (...args: Args): T => {
    const key = JSON.stringify(args);
    const now = Date.now();
    const cached = cache.get(key);

    if (cached && (now - cached.timestamp) < ttl) {
      return cached.value;
    }

    const result = fn(...args);
    cache.set(key, { value: result, timestamp: now });

    // Housekeeping to prevent memory leaks
    if (cache.size > 1000) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }

    return result;
  };
}

export const heavyCompute = memoize((input: number): number => {
  let result = 0;
  for (let i = 0; i < 1e6; i++) {
    result += Math.sqrt(input * i);
  }
  return result;
});