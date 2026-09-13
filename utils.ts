/**
 * Python-like iteration and sequence utilities for data handling.
 */

/**
 * Combines multiple arrays into an array of tuples, mimicking Python's zip.
 * Stops at the length of the shortest input array.
 */
export function zip<T extends unknown[][]>(
  ...arrays: T
): Array<{ [K in keyof T]: T[K] extends Array<infer U> ? U : never }> {
  if (arrays.length === 0) return [];
  const minLength = Math.min(...arrays.map((arr) => arr.length));
  const result: any[] = [];

  for (let i = 0; i < minLength; i++) {
    result.push(arrays.map((arr) => arr[i]));
  }

  return result as any;
}

/**
 * Returns an array of [index, element] pairs from an iterable, mimicking Python's enumerate.
 */
export function enumerate<T>(iterable: Iterable<T> | T[], start = 0): Array<[number, T]> {
  const result: Array<[number, T]> = [];
  let index = start;
  for (const item of iterable) {
    result.push([index++, item]);
  }
  return result;
}

/**
 * Generates a sequence of numbers, mimicking Python's range.
 */
export function range(start: number, stop?: number, step = 1): number[] {
  if (step === 0) {
    throw new Error("range() step argument must not be zero");
  }

  const actualStart = stop === undefined ? 0 : start;
  const actualStop = stop === undefined ? start : stop;
  const result: number[] = [];

  if (step > 0) {
    for (let i = actualStart; i < actualStop; i += step) {
      result.push(i);
    }
  } else {
    for (let i = actualStart; i > actualStop; i += step) {
      result.push(i);
    }
  }

  return result;
}
