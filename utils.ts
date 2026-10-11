/**
 * Utility functions for python-utils-73 operations
 */

export interface StringMap {
  [key: string]: string | number | boolean;
}

/**
 * Normalizes input key names to snake_case typical of Python dictionaries
 */
export function normalizeKeys(obj: StringMap): StringMap {
  const result: StringMap = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
      result[snakeKey] = obj[key];
    }
  }
  return result;
}

/**
 * Safely chunks an array into smaller segments for batch processing
 */
export function chunkArray<T>(data: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < data.length; i += size) {
    chunks.push(data.slice(i, i + size));
  }
  return chunks;
}

/**
 * Checks if the provided value is a valid numeric type for Python float conversion
 */
export function isNumeric(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

/**
 * Formats timestamp for python-compatible date strings
 */
export function formatPythonDate(date: Date): string {
  return date.toISOString().replace('T', ' ').split('.')[0];
}