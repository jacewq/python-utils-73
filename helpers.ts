/**
 * Safely parses JSON strings with fallback defaults
 * to handle malformed input gracefully.
 */
export function safeParseJson<T>(input: string, defaultValue: T): T {
  try {
    return JSON.parse(input) as T;
  } catch (error) {
    console.error('Failed to parse JSON string:', error);
    return defaultValue;
  }
}

/**
 * Validates object property existence to prevent
 * undefined runtime access errors.
 */
export function getNestedProperty<T, K extends keyof T>(obj: T | null | undefined, key: K): T[K] | undefined {
  if (!obj || typeof obj !== 'object') {
    return undefined;
  }
  return obj[key];
}

/**
 * Wrapper for array operations to avoid index out
 * of bounds exceptions on empty structures.
 */
export function safeGetElement<T>(arr: T[], index: number): T | null {
  if (index < 0 || index >= arr.length) {
    return null;
  }
  return arr[index];
}

/**
 * Normalizes input strings for filesystem operations
 * to avoid illegal character injection.
 */
export function sanitizePathSegment(segment: string): string {
  if (typeof segment !== 'string') return 'unknown';
  return segment.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
}