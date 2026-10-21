/**
 * Memoization cache for heavy computational tasks
 * Reduces redundant calculations in data processing pipelines
 */
const cache = new Map<string, any>();

export function memoizedProcess<T, R>(fn: (arg: T) => R, key: string): (arg: T) => R {
  return (arg: T): R => {
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(arg);
    cache.set(key, result);
    return result;
  };
}

/**
 * Bulk processing utility with chunking support
 * Prevents event loop blocking during large list iterations
 */
export async function processInChunks<T, R>(
  items: T[],
  processFn: (item: T) => R,
  chunkSize: number = 100
): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    results.push(...chunk.map(processFn));
    // Yield to event loop to maintain responsiveness
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
  return results;
}

export const clearCache = (): void => {
  cache.clear();
};