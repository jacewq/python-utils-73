/**
 * Utility functions for common data manipulation tasks
 * within the python-utils-73 project.
 */

export type Nullable<T> = T | null | undefined;

/**
 * Safely extracts a nested property from an object using a dot-notation string path.
 */
export function getNestedValue(obj: Record<string, any>, path: string): any {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

/**
 * Filters out null, undefined, or empty string values from an array.
 */
export function cleanArray<T>(items: Nullable<T>[]): T[] {
  return items.filter((item): item is T => item !== null && item !== undefined && item !== '');
}

/**
 * Groups an array of objects by a specific key property.
 */
export function groupBy<T extends Record<string, any>>(items: T[], key: keyof T): Record<string, T[]> {
  return items.reduce((acc, item) => {
    const group = String(item[key]);
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

/**
 * Creates a shallow copy of an object with only specified keys.
 */
export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
}