/**
 * Utility functions for common string and collection operations
 */

export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const chunkArray = <T>(array: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const isNotEmpty = <T>(array: T[] | null | undefined): boolean => {
  return Array.isArray(array) && array.length > 0;
};

export const safeJsonParse = <T>(json: string, fallback: T): T => {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
};

export const getObjectValue = <T, K extends keyof T>(obj: T, key: K): T[K] => {
  return obj[key];
};