/**
 * Safely accesses nested properties in an object using a dot-delimited path string
 * or an array of key segments, returning a fallback value if the path does not exist.
 */
export function getNestedValue<T = unknown>(
  obj: Record<string, any> | null | undefined,
  path: string | string[],
  defaultValue?: T
): T | undefined {
  if (obj === null || obj === undefined) {
    return defaultValue;
  }

  const keys = Array.isArray(path) ? path : path.split('.');
  let current: any = obj;

  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return defaultValue;
    }
    current = current[key];
  }

  return current !== undefined ? (current as T) : defaultValue;
}

/**
 * Flattens a deeply nested object into a single-level object with dot-separated key paths.
 */
export function flattenObject(
  obj: Record<string, any>,
  prefix = ''
): Record<string, any> {
  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (
      value !== null &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      Object.keys(value).length > 0
    ) {
      Object.assign(result, flattenObject(value, newKey));
    } else {
      result[newKey] = value;
    }
  }

  return result;
}