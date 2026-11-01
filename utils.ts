/**
 * Utility functions inspired by Python built-ins and common data helpers.
 */

export interface EnumerateItem<T> {
  index: number;
  value: T;
}

/**
 * Generates a sequence of numbers from start to stop with step.
 */
export function range(start: number, stop?: number, step: number = 1): number[] {
  if (stop === undefined) {
    stop = start;
    start = 0;
  }

  if (step === 0) {
    throw new Error('range() step argument must not be zero');
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
 * Pairs indices with array elements, mimicking Python enumerate.
 */
export function enumerate<T>(iterable: T[], start: number = 0): Array<[number, T]> {
  return iterable.map((item, idx) => [start + idx, item]);
}

/**
 * Combines elements from multiple arrays into tuple pairs.
 */
export function zip<T, U>(arr1: T[], arr2: U[]): Array<[T, U]> {
  const length = Math.min(arr1.length, arr2.length);
  const result: Array<[T, U]> = [];

  for (let i = 0; i < length; i++) {
    result.push([arr1[i], arr2[i]]);
  }

  return result;
}

/**
 * Checks if a collection or string is empty or undefined.
 */
export function isNilOrEmpty(val: unknown): boolean {
  if (val === null || val === undefined) return true;
  if (typeof val === 'string' || Array.isArray(val)) return val.length === 0;
  if (val instanceof Map || val instanceof Set) return val.size === 0;
  return false;
}