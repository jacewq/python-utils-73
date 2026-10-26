/**
 * Utility functions for common data manipulation tasks
 * within the python-utils-73 ecosystem.
 */

export type AnyObject = Record<string, unknown>;

/**
 * Deeply cleans an object by removing undefined and null values
 */
export function cleanObject<T extends AnyObject>(obj: T): Partial<T> {
  const result = { ...obj };

  for (const key in result) {
    if (result[key] === undefined || result[key] === null) {
      delete result[key];
    } else if (typeof result[key] === 'object' && !Array.isArray(result[key])) {
      result[key] = cleanObject(result[key] as AnyObject) as T[Extract<keyof T, string>];
    }
  }

  return result;
}

/**
 * Transforms an array of objects into a map based on a key
 */
export function keyBy<T extends AnyObject, K extends keyof T>(
  collection: T[],
  key: K
): Record<string, T> {
  return collection.reduce((acc, item) => {
    const keyValue = String(item[key]);
    acc[keyValue] = item;
    return acc;
  }, {} as Record<string, T>);
}

/**
 * Safely parses a JSON string with a fallback value
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}