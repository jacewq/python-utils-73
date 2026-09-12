/**
 * Deep merge of partial objects into a base object.
 * Useful for configuration overrides in python-utils-73.
 */
export function mergeConfig<T extends Record<string, any>>(base: T, overrides: Partial<T>): T {
  const result = { ...base };

  for (const key in overrides) {
    if (Object.prototype.hasOwnProperty.call(overrides, key)) {
      const value = overrides[key];
      if (value !== undefined) {
        result[key] = value as T[Extract<keyof T, string>];
      }
    }
  }

  return result;
}

/**
 * Sanitizes data inputs to ensure type safety.
 * Removes null or undefined values from objects.
 */
export function sanitizeData<T extends object>(data: T): Partial<T> {
  const clean: any = {};
  for (const [key, value] of Object.entries(data)) {
    if (value !== null && value !== undefined) {
      clean[key] = value;
    }
  }
  return clean as Partial<T>;
}

/**
 * Generic timeout wrapper for async operations.
 */
export async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error(`Operation timed out after ${ms}ms`)), ms)
  );
  return Promise.race([promise, timeout]);
}