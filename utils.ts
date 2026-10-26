/**
 * Python-style utility helpers for TypeScript
 */

/**
 * Returns a range of numbers similar to Python's range()
 */
export function range(start: number, stop?: number, step: number = 1): number[] {
  if (stop === undefined) {
    stop = start;
    start = 0;
  }
  const result: number[] = [];
  for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i);
  }
  return result;
}

/**
 * Creates an array of elements split into groups the length of size
 */
export function chunk<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
}

/**
 * Safely accesses a nested object property
 */
export function get<T>(obj: any, path: string[], defaultValue?: T): T {
  return path.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : defaultValue), obj);
}

/**
 * Flattens nested arrays
 */
export function flatten<T>(array: any[]): T[] {
  return array.reduce((acc, val) => 
    Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []);
}