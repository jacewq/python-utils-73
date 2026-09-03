/**
 * Utility functions for data transformation and validation.
 */

export type DataValue = string | number | boolean | null | undefined;
export type DataRecord = Record<string, DataValue>;

/**
 * Deep clones a simple record and removes keys with null or undefined values.
 */
export function sanitizeRecord(data: DataRecord): DataRecord {
  const result: DataRecord = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key];
      if (value !== null && value !== undefined) {
        result[key] = value;
      }
    }
  }
  return result;
}

/**
 * Batches an array into smaller chunks for processing.
 */
export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Safely parses JSON string or returns a fallback value.
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

/**
 * Type guard to check if input is a non-empty string.
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}