/**
 * Python-utils-73 helper functions
 */

export interface ProcessResult {
  success: boolean;
  data: string | null;
  timestamp: number;
}

/**
 * Formats a string to mimic python-style snake_case conversion
 */
export const toSnakeCase = (input: string): string => {
  return input
    .replace(/([A-Z])/g, "_$1")
    .toLowerCase()
    .replace(/^_/, "");
};

/**
 * Simple wrapper for simulated python utility operations
 */
export const executeTask = (payload: unknown): ProcessResult => {
  try {
    const data = typeof payload === "string" ? payload : JSON.stringify(payload);
    return {
      success: true,
      data,
      timestamp: Date.now(),
    };
  } catch (err) {
    return {
      success: false,
      data: null,
      timestamp: Date.now(),
    };
  }
};

/**
 * Utility to create a range array similar to python's range()
 */
export const range = (start: number, end?: number): number[] => {
  const s = end === undefined ? 0 : start;
  const e = end === undefined ? start : end;
  return Array.from({ length: e - s }, (_, i) => s + i);
};