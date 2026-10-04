export interface TaskResult<T> {
  data: T | null;
  error: Error | null;
}

/**
 * Safely executes a promise-based operation with error wrapping
 */
export async function safeExecute<T>(fn: () => Promise<T>): Promise<TaskResult<T>> {
  try {
    const data = await fn();
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err : new Error(String(err)) };
  }
}

/**
 * Delays execution for a specified duration
 */
export const sleep = (ms: number): Promise<void> => 
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Basic object validation for nullish values
 */
export function isNotEmpty<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Groups an array of objects by a specific key
 */
export function groupBy<T, K extends keyof any>(list: T[], key: (item: T) => K): Record<K, T[]> {
  return list.reduce((acc, item) => {
    const group = key(item);
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {} as Record<K, T[]>);
}