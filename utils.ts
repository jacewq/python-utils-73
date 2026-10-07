/**
 * Deeply sanitizes and cleans nested data structures
 * by removing null/undefined values.
 */
export function sanitizeData<T>(data: T): T {
  if (data === null || typeof data !== 'object') {
    return data;
  }

  if (Array.isArray(data)) {
    return data
      .filter((item) => item !== null && item !== undefined)
      .map((item) => sanitizeData(item)) as unknown as T;
  }

  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(data)) {
    if (value !== null && value !== undefined) {
      result[key] = sanitizeData(value);
    }
  }

  return result as T;
}

/**
 * Safely parses JSON with fallback value
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json);
  } catch (err) {
    return fallback;
  }
}

/**
 * Type guard to check if a value is a plain object
 */
export function isPlainObject(item: unknown): item is Record<string, unknown> {
  return typeof item === 'object' && item !== null && !Array.isArray(item);
}