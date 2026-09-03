/**
 * Generates a sequence of numbers starting from `start` (inclusive) to `end` (exclusive),
 * incrementing by `step`. Mimics Python's built-in range.
 *
 * @param start - The starting value, or the end value if `end` is omitted.
 * @param end - The end value of the sequence (exclusive).
 * @param step - The increment value. Defaults to 1. Cannot be zero.
 * @returns An array of numbers.
 */
export function range(start: number, end?: number, step: number = 1): number[] {
  const actualStart = end === undefined ? 0 : start;
  const actualEnd = end === undefined ? start : end;

  if (step === 0) {
    throw new Error("range() step argument must not be zero");
  }

  const result: number[] = [];
  if (step > 0) {
    for (let i = actualStart; i < actualEnd; i += step) {
      result.push(i);
    }
  } else {
    for (let i = actualStart; i > actualEnd; i += step) {
      result.push(i);
    }
  }
  return result;
}

/**
 * Combines elements from multiple arrays into tuple arrays, mimicking Python's zip.
 *
 * @template T - A tuple type representing the element types of the input arrays.
 * @param arrays - The source arrays to zip together.
 * @returns An array of tuple arrays.
 */
export function zip<T extends any[]>(...arrays: { [K in keyof T]: T[K][] }): T[] {
  if (arrays.length === 0) {
    return [];
  }
  const minLength = Math.min(...arrays.map(arr => arr.length));
  const result: T[] = [];

  for (let i = 0; i < minLength; i++) {
    result.push(arrays.map(arr => arr[i]) as T);
  }

  return result;
}

/**
 * Pairs each element in an array with its index, mimicking Python's enumerate.
 *
 * @template T - The element type of the input array.
 * @param array - The source array to enumerate.
 * @param start - The starting index offset. Defaults to 0.
 * @returns An array of tuples containing [index, item].
 */
export function enumerate<T>(array: T[], start: number = 0): [number, T][] {
  return array.map((item, idx) => [start + idx, item]);
}