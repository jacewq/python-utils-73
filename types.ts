export type DataMap = Record<string, unknown>;

export interface ValidationResult<T> {
  data: T | null;
  errors: string[];
  isValid: boolean;
}

/**
 * Type guard to check if an object is not null and is a plain object
 */
export function isObject(item: unknown): item is DataMap {
  return typeof item === 'object' && item !== null && !Array.isArray(item);
}

/**
 * Deep clone utility for generic data structures
 */
export function deepClone<T>(source: T): T {
  if (source === null || typeof source !== 'object') {
    return source;
  }

  if (Array.isArray(source)) {
    return source.map((item) => deepClone(item)) as unknown as T;
  }

  const clone = {} as T;
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      clone[key] = deepClone(source[key]);
    }
  }
  return clone;
}

/**
 * Safely access nested properties in data objects
 */
export function getNestedValue(obj: DataMap, path: string): unknown {
  return path.split('.').reduce((acc, part) => {
    if (isObject(acc) && part in acc) {
      return acc[part];
    }
    return undefined;
  }, obj as unknown);
}