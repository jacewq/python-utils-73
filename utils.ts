/**
 * Common utility functions for python-utils-73
 */

export const sleep = (ms: number): Promise<void> => 
  new Promise((resolve) => setTimeout(resolve, ms));

export const debounce = <T extends (...args: any[]) => any>(fn: T, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>): void => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export const chunkArray = <T>(array: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

export const isNotEmpty = <T>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined;
};

export const safeParseJson = <T>(json: string, fallback: T): T => {
  try {
    return JSON.parse(json) as T;
  } catch (e) {
    return fallback;
  }
};

export const getOrElse = <T>(value: T | undefined | null, fallback: T): T => {
  return value ?? fallback;
};