/**
 * Memoization cache for heavy computational operations
 * Prevents redundant execution in high-frequency calls
 */
const memoCache = new Map<string, any>();

export const memoize = <T, R>(fn: (arg: T) => R) => {
  return (arg: T): R => {
    const key = JSON.stringify(arg);
    if (memoCache.has(key)) {
      return memoCache.get(key);
    }
    const result = fn(arg);
    memoCache.set(key, result);
    return result;
  };
};

/**
 * Batch processor for collection operations
 * Reduces overhead by iterating in controlled chunks
 */
export function processInBatches<T, R>(
  items: T[],
  handler: (item: T) => R,
  batchSize: number = 100
): R[] {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const chunk = items.slice(i, i + batchSize);
    results.push(...chunk.map(handler));
  }
  return results;
}

/**
 * Performance-optimized object shallow clone
 */
export const fastClone = <T extends object>(obj: T): T => {
  return Object.assign({}, obj);
};