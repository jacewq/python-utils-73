/**
 * Utility functions providing Python-like data manipulation features.
 */

/**
 * Combines multiple arrays into an array of tuples, stopping at the shortest length.
 * Matches Python's built-in `zip()` behavior.
 */
export function zip<T extends any[]>(
  ...arrays: { [K in keyof T]: T[K][] }
): { [K in keyof T]: T[K] }[] {
  if (arrays.length === 0) {
    return [];
  }

  const minLength = Math.min(...arrays.map((arr) => arr.length));
  const result: { [K in keyof T]: T[K] }[] = [];

  for (let i = 0; i < minLength; i++) {
    const tuple = arrays.map((arr) => arr[i]) as { [K in keyof T]: T[K] };
    result.push(tuple);
  }

  return result;
}

/**
 * Splits an array into smaller chunks of a specified maximum size.
 */
export function chunk<T>(array: T[], size: number): T[][] {
  if (!Array.isArray(array) || size <= 0) {
    return [];
  }

  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }

  return chunks;
}

/**
 * Generates an array of numbers over a specified sequence.
 * Matches Python's built-in `range()` behavior.
 */
export function range(start: number, stop?: number, step = 1): number[] {
  if (step === 0) {
    throw new Error("Step argument must not be zero");
  }

  let actualStart = start;
  let actualStop = stop;

  if (actualStop === undefined) {
    actualStop = start;
    actualStart = 0;
  }

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
