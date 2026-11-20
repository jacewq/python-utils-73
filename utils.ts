/**
 * Deeply cleans an object by removing null or undefined values.
 * Useful for preparing payloads for API requests.
 */
export function cleanObject<T extends Record<string, any>>(obj: T): Partial<T> {
  const result: any = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (value !== null && value !== undefined) {
        result[key] = value;
      }
    }
  }

  return result;
}

/**
 * Safe parser for JSON strings with fallback value.
 */
export function parseJsonSafe<T>(jsonString: string, fallback: T): T {
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    return fallback;
  }
}

/**
 * Groups array items by a specific key accessor.
 */
export function groupBy<T>(items: T[], keySelector: (item: T) => string): Record<string, T[]> {
  return items.reduce((acc, item) => {
    const key = keySelector(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}