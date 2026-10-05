/**
 * Python-style utility helpers for TypeScript
 */

export const range = (start: number, end?: number): number[] => {
  const [s, e] = end === undefined ? [0, start] : [start, end];
  return Array.from({ length: e - s }, (_, i) => s + i);
};

export const chunk = <T>(arr: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
};

export const zip = <T, U>(a: T[], b: U[]): [T, U][] => {
  const length = Math.min(a.length, b.length);
  return Array.from({ length }, (_, i) => [a[i], b[i]]);
};

export const getOrElse = <T>(value: T | null | undefined, defaultValue: T): T => {
  return value ?? defaultValue;
};

export const flatten = <T>(arr: (T | T[])[]): T[] => {
  return arr.reduce<T[]>((acc, val) => acc.concat(val), []);
};

export const distinct = <T>(arr: T[]): T[] => {
  return Array.from(new Set(arr));
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};