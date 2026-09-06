/**
 * Python-utils-73 general utility functions
 */

export type DataRecord = Record<string, unknown>;

/**
 * Normalizes string keys to lowercase for consistent data mapping
 */
export function normalizeKeys(data: DataRecord): DataRecord {
  const normalized: DataRecord = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      normalized[key.toLowerCase()] = data[key];
    }
  }
  return normalized;
}

/**
 * Safely parses JSON strings with default fallback value
 */
export function safeParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

/**
 * Determines if an object is empty
 */
export function isEmpty(obj: DataRecord): boolean {
  return Object.keys(obj).length === 0;
}

/**
 * Generates a chunked array for processing large datasets
 */
export function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}