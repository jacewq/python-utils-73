/**
 * Python-inspired sequence and collection helper utilities for TypeScript.
 */

/**
 * Generates a sequence of numbers from start (inclusive) to stop (exclusive) by step.
 *
 * @param start - Starting number of the sequence, or stopping number if stop is undefined.
 * @param stop - Ending number of the sequence (exclusive).
 * @param step - Number by which the sequence increments (default: 1).
 * @returns An array of numbers in the specified range.
 */
export function range(start: number, stop?: number, step: number = 1): number[] {
  if (stop === undefined) {
    stop = start;
    start = 0;
  }

  if (step === 0) {
    throw new Error('Range step cannot be zero');
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
 *
 * @template T
 * @param items - The array to enumerate over.
 * @param start - Starting index counter (default: 0).
 * @returns An array of tuples containing [index, item].
 */
export function enumerate<T>(items: T[], start: number = 0): [number, T][] {
  return items.map((item, index) => [start + index, item]);
}

/**
 * Splits an array into chunks of a specified maximum size.
 *
 * @template T
 * @param array - The source array to chunk.
 * @param size - Maximum size of each chunk.
 * @returns An array of array chunks.
 */
export function chunk<T>(array: T[], size: number): T[][] {
  if (size <= 0) {
    throw new Error('Chunk size must be greater than zero');
  }

  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }

  return chunks;
}