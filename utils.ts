/**
 * Generates an array of numbers representing a sequence.
 * Mimics Python's built-in range function.
 *
 * @param start - The starting value (inclusive), or the stop value if end is omitted.
 * @param stop - The end value (exclusive).
 * @param step - The increment between each number in the sequence. Defaults to 1.
 * @returns An array of numbers.
 */
export function range(start: number, stop?: number, step: number = 1): number[] {
  const result: number[] = [];
  const actualStart = stop === undefined ? 0 : start;
  const actualStop = stop === undefined ? start : stop;

  if (step === 0) {
    throw new Error("step argument must not be zero");
  }

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

/**
 * Pairs up elements from multiple arrays, stopping at the shortest array.
 * Mimics Python's built-in zip function.
 *
 * @param arrays - An array of arrays to zip together.
 * @returns An array of tuples containing corresponding elements.
 */
export function zip<T extends any[]>(...arrays: { [K in keyof T]: T[K][] }): T[] {
  if (arrays.length === 0) {
    return [];
  }

  const minLength = Math.min(...arrays.map(arr => arr.length));
  const result: T[] = [];

  for (let i = 0; i < minLength; i++) {
    const tuple = arrays.map(arr => arr[i]) as unknown as T;
    result.push(tuple);
  }

  return result;
}