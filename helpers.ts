/**
 * Common utilities for python-utils-73
 */

export const sleep = (ms: number): Promise<void> => 
  new Promise((resolve) => setTimeout(resolve, ms));

export const capitalize = (str: string): string => 
  str.charAt(0).toUpperCase() + str.slice(1);

export const groupBy = <T, K extends keyof any>(
  list: T[],
  getKey: (item: T) => K
): Record<K, T[]> =>
  list.reduce((acc, item) => {
    const key = getKey(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<K, T[]>);

export const clamp = (num: number, min: number, max: number): number =>
  Math.min(Math.max(num, min), max);

export const chunk = <T>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

export const isDefined = <T>(val: T | null | undefined): val is T => 
  val !== null && val !== undefined;