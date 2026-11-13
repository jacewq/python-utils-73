/**
 * Common Python-style utility functions for TypeScript
 */

/**
 * Mimics Python's range(start, stop, step)
 */
export function range(start: number, stop?: number, step: number = 1): number[] {
  const result: number[] = [];
  const end = stop === undefined ? start : stop;
  const begin = stop === undefined ? 0 : start;

  for (let i = begin; step > 0 ? i < end : i > end; i += step) {
    result.push(i);
  }
  return result;
}

/**
 * Chunks an array into smaller sub-arrays of size n
 */
export function chunk<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
}

/**
 * Safely accesses nested object properties
 */
export function get(obj: Record<string, any>, path: string, defaultValue?: any): any {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj) ?? defaultValue;
}

/**
 * Removes null or undefined values from an object
 */
export function compact<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v != null)
  ) as Partial<T>;
}