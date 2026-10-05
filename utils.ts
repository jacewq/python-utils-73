/**
 * Python-like utility functions for common operations
 */

export const range = (start: number, end?: number, step = 1): number[] => {
  const [s, e] = end === undefined ? [0, start] : [start, end];
  const result: number[] = [];
  for (let i = s; i < e; i += step) {
    result.push(i);
  }
  return result;
};

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const chunk = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export const groupBy = <T, K extends string | number | symbol>(
  array: T[],
  keySelector: (item: T) => K
): Record<K, T[]> => {
  return array.reduce((acc, item) => {
    const key = keySelector(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<K, T[]>);
};

export const clamp = (val: number, min: number, max: number): number =>
  Math.min(Math.max(val, min), max);