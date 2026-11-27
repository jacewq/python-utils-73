/**
 * Python-inspired utility functions for TypeScript
 */

export const range = (start: number, end?: number): number[] => {
  const [s, e] = end !== undefined ? [start, end] : [0, start];
  return Array.from({ length: e - s }, (_, i) => s + i);
};

export const sleep = (ms: number): Promise<void> => 
  new Promise((resolve) => setTimeout(resolve, ms));

export const partition = <T>(arr: T[], predicate: (item: T) => boolean): [T[], T[]] => {
  return arr.reduce(
    (acc, val) => {
      acc[predicate(val) ? 0 : 1].push(val);
      return acc;
    },
    [[], []] as [T[], T[]]
  );
};

export const chunks = <T>(arr: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

export const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map();
  return ((...args: any[]) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
};