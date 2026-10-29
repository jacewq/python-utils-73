/**
 * Utility functions for common python-like operations in TypeScript
 */

export const range = (start: number, end?: number): number[] => {
  const s = end === undefined ? 0 : start;
  const e = end === undefined ? start : end;
  return Array.from({ length: e - s }, (_, i) => s + i);
};

export const zip = <T, U>(a: T[], b: U[]): [T, U][] => {
  const length = Math.min(a.length, b.length);
  return Array.from({ length }, (_, i) => [a[i], b[i]]);
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const chunk = <T>(array: T[], size: number): T[][] => {
  return array.reduce((acc: T[][], _, i) => {
    if (i % size === 0) acc.push(array.slice(i, i + size));
    return acc;
  }, []);
};

export const isDefined = <T>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined;
};

export const getOrDefault = <T>(value: T | undefined | null, defaultValue: T): T => {
  return isDefined(value) ? value : defaultValue;
};