/**
 * Collection of Python-like helper utilities for array and range operations.
 * Reorganized for improved performance and clearer interface definitions.
 */

/**
 * Generates an array of numbers over a specified range.
 */
export function range(start: number, stop?: number, step: number = 1): number[] {
  if (stop === undefined) {
    stop = start;
    start = 0;
  }

  if (step === 0) {
    throw new Error('Step cannot be zero');
  }

  const result: number[] = [];
  if (step > 0) {
    for (let i = start; i < stop; i += step) {
      result.push(i);
    }
  } else {
    for (let i = start; i > stop; i += step) {
      result.push(i);
    }
  }
  return result;
}

/**
 * Pairs elements from an array with their corresponding index.
 */
export function enumerate<T>(iterable: T[], start: number = 0): [number, T][] {
  return iterable.map((item, index) => [start + index, item]);
}

/**
 * Combines multiple arrays element-wise into tuples up to the shortest length.
 */
export function zip<T extends any[][]>(...arrays: T): { [K in keyof T]: T[K] extends (infer U)[] ? U : never }[] {
  if (arrays.length === 0) return [];
  const minLen = Math.min(...arrays.map((arr) => arr.length));
  const result: any[] = [];

  for (let i = 0; i < minLen; i++) {
    result.push(arrays.map((arr) => arr[i]));
  }
  return result;
}

/**
 * Splits an array into sub-arrays of a given maximum chunk size.
 */
export function chunk<T>(array: T[], size: number): T[][] {
  if (size <= 0) return [];
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}