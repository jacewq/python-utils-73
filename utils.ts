/**
 * Optimized utility functions for data processing
 */

export type ProcessableData = Record<string, unknown>;

/**
 * Memoized transformation for repetitive operations
 */
const memoize = <T, R>(fn: (arg: T) => R) => {
  const cache = new Map<T, R>();
  return (arg: T): R => {
    if (cache.has(arg)) return cache.get(arg)!;
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
};

/**
 * High-performance object key flattening with cache
 */
export const flattenObject = memoize((obj: ProcessableData): Record<string, any> => {
  const result: Record<string, any> = {};
  
  const recurse = (current: any, prefix = '') => {
    for (const key in current) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      if (typeof current[key] === 'object' && current[key] !== null) {
        recurse(current[key], newKey);
      } else {
        result[newKey] = current[key];
      }
    }
  };

  recurse(obj);
  return result;
});

/**
 * Batch processor for large arrays to avoid stack overflow
 */
export function batchProcess<T>(items: T[], callback: (item: T) => void, batchSize = 100): void {
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    batch.forEach(callback);
  }
}