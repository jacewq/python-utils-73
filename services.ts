/**
 * Utility functions for handling and sanitizing data sets
 */

export type Nullable<T> = T | null | undefined;

/**
 * Deeply removes null or undefined values from an object
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): Partial<T> {
  const result = { ...obj };

  for (const key in result) {
    if (result[key] === null || result[key] === undefined) {
      delete result[key];
    } else if (typeof result[key] === 'object' && !Array.isArray(result[key])) {
      result[key] = sanitizeObject(result[key]) as any;
    }
  }

  return result;
}

/**
 * Safely parses JSON strings with a default fallback
 */
export function safeJsonParse<T>(data: string, fallback: T): T {
  try {
    return JSON.parse(data) as T;
  } catch (err) {
    console.error('Failed to parse JSON, returning fallback', err);
    return fallback;
  }
}

/**
 * Batches an array into smaller chunks
 */
export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}