/**
 * Python-utils-73 common utility collection
 */

export const sleep = (ms: number): Promise<void> => 
  new Promise((resolve) => setTimeout(resolve, ms));

export const chunkArray = <T>(array: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
};

export const isObject = (item: unknown): item is Record<string, unknown> => {
  return item !== null && typeof item === 'object' && !Array.isArray(item);
};

export const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map<string, ReturnType<T>>();
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
};

export const getEnv = (key: string, fallback: string): string => {
  return typeof process !== 'undefined' && process.env[key] ? process.env[key]! : fallback;
};