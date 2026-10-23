/**
 * Utility functions for data transformation and validation
 */

export type Nullable<T> = T | null | undefined;

/**
 * Safely extracts a value from a nested object structure
 */
export function getNestedValue<T = any>(obj: any, path: string): Nullable<T> {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

/**
 * Transforms an array of objects into a Map based on a key
 */
export function arrayToMap<T, K extends keyof T>(arr: T[], key: K): Map<T[K], T> {
  const map = new Map<T[K], T>();
  for (const item of arr) {
    map.set(item[key], item);
  }
  return map;
}

/**
 * Deep cleans an object by removing undefined properties
 */
export function cleanObject<T extends Record<string, any>>(obj: T): Partial<T> {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    if (result[key] === undefined) {
      delete result[key];
    }
  });
  return result;
}

/**
 * Generates a consistent hash string for primitive values
 */
export function generateId(prefix: string = 'utils'): string {
  return `${prefix}_${Math.random().toString(36).substring(2, 9)}`;
}