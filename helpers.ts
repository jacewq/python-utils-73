/**
 * Utility functions for data transformation and validation
 */

export type DataRecord = Record<string, unknown>;

/**
 * Flattens nested object keys into a single depth record
 */
export function flattenObject(obj: DataRecord, prefix = ''): DataRecord {
  return Object.keys(obj).reduce((acc, key) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(acc, flattenObject(obj[key] as DataRecord, pre + key));
    } else {
      acc[pre + key] = obj[key];
    }
    return acc;
  }, {} as DataRecord);
}

/**
 * Safely extracts value from nested object using dot notation
 */
export function getDeepValue(obj: DataRecord, path: string): unknown {
  return path.split('.').reduce((acc, part) => {
    return acc && typeof acc === 'object' ? (acc as DataRecord)[part] : undefined;
  }, obj as unknown);
}

/**
 * Filters object properties by a provided predicate
 */
export function filterObject(obj: DataRecord, predicate: (val: unknown) => boolean): DataRecord {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => predicate(value))
  );
}