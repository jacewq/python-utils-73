/**
 * Represents the result of a data processing operation
 * used across python-utils-73 module helpers.
 */
export interface DataResult<T> {
  data: T | null;
  error: Error | null;
  timestamp: number;
  success: boolean;
}

/**
 * Helper type for handling generic dictionary structures
 * common in JSON and Python-exported metadata.
 */
export type DataMap = Record<string, unknown>;

/**
 * Type guard to verify if input is a standard object
 */
export const isDataMap = (input: unknown): input is DataMap => {
  return typeof input === 'object' && input !== null && !Array.isArray(input);
};

/**
 * Wraps an asynchronous operation to provide consistent result shape
 */
export async function safeExecute<T>(fn: () => Promise<T>): Promise<DataResult<T>> {
  try {
    const data = await fn();
    return { data, error: null, timestamp: Date.now(), success: true };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err : new Error(String(err)),
      timestamp: Date.now(),
      success: false
    };
  }
}