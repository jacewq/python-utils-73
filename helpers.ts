/**
 * Utility functions for common data manipulation tasks
 * within the python-utils-73 ecosystem.
 */

export type DataRecord = Record<string, unknown>;

/**
 * Cleans an object by removing null or undefined values
 */
export function sanitizeData(data: DataRecord): DataRecord {
  return Object.entries(data).reduce((acc, [key, value]) => {
    if (value !== null && value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {} as DataRecord);
}

/**
 * Safely parses a JSON string with fallback default
 */
export function safeParseJson<T>(jsonString: string, fallback: T): T {
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error('Failed to parse JSON string', error);
    return fallback;
  }
}

/**
 * Groups an array of objects by a specific key
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