/**
 * Generates a sequence of numbers from start (inclusive) to stop (exclusive).
 *
 * @param start - Starting number or stop bound if stop is omitted.
 * @param stop - End boundary of the sequence (exclusive).
 * @param step - Step increment value (defaults to 1).
 * @returns Array of generated sequence numbers.
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
 * Pairs corresponding elements from multiple input arrays.
 *
 * @template T - Tuple type of array elements.
 * @param arrays - Input arrays to be combined.
 * @returns Array of combined tuples matching length of shortest input array.
 */
export function zip<T extends any[][]>(...arrays: T): { [K in keyof T]: T[K] extends (infer U)[] ? U : never }[] {
  if (arrays.length === 0) return [];
  const minLength = Math.min(...arrays.map((arr) => arr.length));
  const result: any[] = [];
  for (let i = 0; i < minLength; i++) {
    result.push(arrays.map((arr) => arr[i]));
  }
  return result;
}

/**
 * Pairs array elements with their incremental index counter.
 *
 * @template T - Type of items in the input array.
 * @param items - Array of items to enumerate.
 * @param start - Starting index counter (defaults to 0).
 * @returns Array of tuple pairs containing index and item.
 */
export function enumerate<T>(items: T[], start: number = 0): [number, T][] {
  return items.map((item, idx) => [start + idx, item]);
}
