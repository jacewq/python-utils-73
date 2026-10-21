/**
 * Python-like utility functions for TypeScript
 */

export interface RangeOptions {
  step?: number;
}

/**
 * Generate a sequence of numbers, similar to Python's range()
 */
export function range(start: number, end?: number, options?: RangeOptions): number[] {
  const step = options?.step ?? 1;
  const result: number[] = [];

  const [s, e] = end === undefined ? [0, start] : [start, end];

  for (let i = s; i < e; i += step) {
    result.push(i);
  }

  return result;
}

/**
 * Returns a shallow copy of an array with items chunked into smaller arrays
 */
export function chunk<T>(array: T[], size: number): T[][] {
  if (size <= 0) return [array];
  
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  
  return chunks;
}

/**
 * Capitalize the first letter of a string
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}