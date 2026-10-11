/**
 * Core utility module providing high-performance Python-like helper functions.
 */

export interface CacheOptions {
  maxSize?: number;
}

/**
 * High-performance LRU cache wrapper for pure utility functions.
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  options: CacheOptions = {}
): T {
  const maxSize = options.maxSize ?? 500;
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>): ReturnType<T> => {
    // Fast path key generation for single primitive arguments
    const key = args.length === 1 && (typeof args[0] === 'string' || typeof args[0] === 'number')
      ? String(args[0])
      : JSON.stringify(args);

    if (cache.has(key)) {
      const result = cache.get(key)!;
      // Move key to end to maintain LRU order
      cache.delete(key);
      cache.set(key, result);
      return result;
    }

    const value = fn(...args);

    if (cache.size >= maxSize) {
      // Evict least recently used entry
      const firstKey = cache.keys().next().value;
      if (firstKey !== undefined) {
        cache.delete(firstKey);
      }
    }

    cache.set(key, value);
    return value;
  }) as T;
}

/**
 * Memory-efficient generator equivalent to Python's range().
 */
export function* range(start: number, stop?: number, step: number = 1): Generator<number> {
  let current = stop === undefined ? 0 : start;
  const end = stop === undefined ? start : stop;

  if (step === 0) {
    throw new Error('range() arg 3 must not be zero');
  }

  if (step > 0) {
    while (current < end) {
      yield current;
      current += step;
    }
  } else {
    while (current > end) {
      yield current;
      current += step;
    }
  }
}

/**
 * Pre-allocated array chunking for optimized memory layout.
 */
export function chunk<T>(array: ReadonlyArray<T>, size: number): T[][] {
  if (size <= 0) return [];
  const length = array.length;
  const result: T[][] = new Array(Math.ceil(length / size));
  
  let resIdx = 0;
  for (let i = 0; i < length; i += size) {
    result[resIdx++] = array.slice(i, i + size);
  }

  return result;
}
