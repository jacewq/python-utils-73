/**
 * Utility for sanitizing and formatting mixed data types
 */

export type DataValue = string | number | boolean | null | undefined;

/**
 * safely extracts value from a nested object path
 */
export function getNestedValue<T>(obj: Record<string, any>, path: string): T | undefined {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj) as T | undefined;
}

/**
 * cleans array of items by removing nullish values
 */
export function cleanArray<T>(arr: (T | null | undefined)[]): T[] {
  return arr.filter((item): item is T => item !== null && item !== undefined);
}

/**
 * normalizes input to a standard string format
 */
export function toSafeString(value: DataValue, fallback = ''): string {
  if (value === null || value === undefined) {
    return fallback;
  }
  return String(value).trim();
}

/**
 * groups items by a specific key
 */
export function groupBy<T>(items: T[], key: keyof T): Record<string, T[]> {
  return items.reduce((acc, item) => {
    const groupKey = String(item[key]);
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}