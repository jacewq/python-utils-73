/**
 * Utility helper functions providing Python-like sequence operations
 * and common array/number manipulation utilities.
 */

/**
 * Generates an array of numbers over a specified range, similar to Python's range().
 */
export function range(start: number, stop?: number, step: number = 1): number[] {
  if (stop === undefined) {
    stop = start;
    start = 0;
  }

  if (step === 0) {
    throw new Error('Step argument must not be zero');
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
 * Combines two arrays into an array of tuples up to the length of the shorter array.
 */
export function zip<T, U>(first: T[], second: U[]): [T, U][] {
  const minLength = Math.min(first.length, second.length);
  const result: [T, U][] = [];
  for (let i = 0; i < minLength; i++) {
    result.push([first[i], second[i]]);
  }
  return result;
}

/**
 * Splits an array into smaller chunks of a specified maximum size.
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

/**
 * Clamps a number within an inclusive min and max range.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}