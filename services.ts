/**
 * Utility functions for common data transformation patterns
 * ensuring type safety and minimal overhead.
 */

export type DataRecord = Record<string, unknown>;

/**
 * Deeply cleans an object by removing undefined and null properties.
 */
export function cleanObject<T extends DataRecord>(obj: T): Partial<T> {
  const cleaned: DataRecord = {};

  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined && value !== null) {
      cleaned[key] = value;
    }
  }

  return cleaned as Partial<T>;
}

/**
 * Groups an array of objects by a specific key.
 */
export function groupBy<T extends DataRecord>(data: T[], key: keyof T): Record<string, T[]> {
  return data.reduce((acc, item) => {
    const groupKey = String(item[key]);
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

/**
 * Safe object property accessor with fallback value.
 */
export function getOrDefault<T>(obj: DataRecord, path: string, defaultValue: T): T {
  const value = obj[path];
  return value !== undefined && value !== null ? (value as T) : defaultValue;
}
