/**
 * Python-style utility helpers for data manipulation
 */

export const range = (start: number, end?: number, step: number = 1): number[] => {
  const [s, e] = end === undefined ? [0, start] : [start, end];
  const result: number[] = [];
  for (let i = s; i < e; i += step) {
    result.push(i);
  }
  return result;
};

export const chunk = <T>(array: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const zip = <T, U>(a: T[], b: U[]): [T, U][] => {
  const length = Math.min(a.length, b.length);
  const result: [T, U][] = [];
  for (let i = 0; i < length; i++) {
    result.push([a[i], b[i]]);
  }
  return result;
};

export const flatten = <T>(array: (T | T[])[]): T[] => {
  return array.reduce((acc: T[], val) => 
    acc.concat(Array.isArray(val) ? val : [val]), []);
};