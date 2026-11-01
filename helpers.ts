/**
 * Safely accesses deeply nested properties in an object using dot-notation path.
 */
export function deepGet<T = unknown>(
  obj: Record<string, any>,
  path: string,
  defaultValue?: T
): T | undefined {
  if (!obj || typeof obj !== 'object') {
    return defaultValue;
  }

  const keys = path.split('.');
  let current: any = obj;

  for (const key of keys) {
    if (current === null || current === undefined || !(key in current)) {
      return defaultValue;
    }
    current = current[key];
  }

  return current as T;
}

/**
 * Splits an array into chunks of a specified maximum size.
 */
export function chunk<T>(array: T[], size: number): T[][] {
  if (size <= 0) {
    throw new Error('Chunk size must be greater than 0');
  }

  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }

  return result;
}

/**
 * Groups array elements by a key generated from a callback function.
 */
export function groupBy<T, K extends string | number | symbol>(
  array: T[],
  keySelector: (item: T) => K
): Record<K, T[]> {
  return array.reduce((acc, item) => {
    const key = keySelector(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<K, T[]>);
}