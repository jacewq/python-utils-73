export interface ProcessResult<T> {
  data: T | null;
  error: Error | null;
  timestamp: number;
}

/**
 * safely execute a callback and return standard result structure
 */
export const safeExecute = async <T>(fn: () => Promise<T>): Promise<ProcessResult<T>> => {
  try {
    const data = await fn();
    return { data, error: null, timestamp: Date.now() };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err : new Error(String(err)), timestamp: Date.now() };
  }
};

/**
 * filter null/undefined values from an array
 */
export const compact = <T>(arr: (T | null | undefined)[]): T[] => {
  return arr.filter((item): item is T => item !== null && item !== undefined);
};

/**
 * delay execution for a set number of milliseconds
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * chunk an array into smaller sub-arrays
 */
export const chunk = <T>(arr: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};