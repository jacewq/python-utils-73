export type DataMap = Record<string, unknown>;

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validates if an object is not null and has keys
 */
export function isNotEmpty(data: DataMap | null | undefined): boolean {
  return data !== null && data !== undefined && Object.keys(data).length > 0;
}

/**
 * Safely extracts a nested property from a data object
 */
export function getNestedValue<T>(obj: DataMap, path: string): T | undefined {
  return path.split('.').reduce((acc: any, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj) as T;
}

/**
 * Normalizes keys to lowercase for consistent data access
 */
export function normalizeKeys(obj: DataMap): DataMap {
  return Object.keys(obj).reduce((acc, key) => {
    acc[key.toLowerCase()] = obj[key];
    return acc;
  }, {} as DataMap);
}

/**
 * Merges multiple data objects into a single source
 */
export function mergeData(sources: DataMap[]): DataMap {
  return Object.assign({}, ...sources);
}