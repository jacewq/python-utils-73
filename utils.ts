/**
 * Python-style collection and iteration helpers for TypeScript.
 */

export interface EnumerateResult<T> {
  index: number;
  value: T;
}

/**
 * Generates an array of numbers over a specified range.
 */
export function range(start: number, stop?: number, step: number = 1): number[] {
  if (stop === undefined) {
    stop = start;
    start = 0;
  }

  if (step === 0) {
    throw new Error("step argument must not be zero");
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
 * Pairs elements from input arrays together until the shortest array is exhausted.
 */
export function zip<T, U>(arr1: T[], arr2: U[]): [T, U][] {
  const minLength = Math.min(arr1.length, arr2.length);
  const result: [T, U][] = new Array(minLength);

  for (let i = 0; i < minLength; i++) {
    result[i] = [arr1[i], arr2[i]];
  }

  return result;
}

/**
 * Yields index-value pairs from an array or iterable.
 */
export function* enumerate<T>(iterable: Iterable<T>, start: number = 0): Generator<EnumerateResult<T>> {
  let index = start;
  for (const value of iterable) {
    yield { index, value };
    index++;
  }
}

/**
 * Creates an object from paired key-value arrays.
 */
export function dictZip<K extends string | number | symbol, V>(keys: K[], values: V[]): Record<K, V> {
  const result = {} as Record<K, V>;
  const minLength = Math.min(keys.length, values.length);

  for (let i = 0; i < minLength; i++) {
    result[keys[i]] = values[i];
  }

  return result;
}