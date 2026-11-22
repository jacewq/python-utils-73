/**
 * Utility functions for common string and collection operations
 */

export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const chunkArray = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export const isNotEmpty = <T>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined;
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

export const getOrDefault = <T>(value: T | undefined | null, defaultValue: T): T => {
  return value ?? defaultValue;
};