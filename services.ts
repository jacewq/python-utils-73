export type PythonDataType = string | number | boolean | Record<string, unknown> | unknown[];

/**
 * safely parses python-style json strings
 */
export const parsePythonResponse = <T>(data: string): T | null => {
  try {
    const cleaned = data.replace(/'/g, '"').replace(/None/g, 'null').replace(/True/g, 'true').replace(/False/g, 'false');
    return JSON.parse(cleaned) as T;
  } catch (error) {
    console.error('failed to parse python utility output', error);
    return null;
  }
};

/**
 * formats object for python-compatible keyword arguments
 */
export const formatKwargs = (args: Record<string, PythonDataType>): string => {
  return Object.entries(args)
    .map(([key, value]) => `${key}=${JSON.stringify(value)}`)
    .join(', ');
};

/**
 * checks if an object is an empty python-like dictionary
 */
export const isEmptyDict = (obj: unknown): boolean => {
  return typeof obj === 'object' && obj !== null && Object.keys(obj).length === 0;
};

/**
 * utility to normalize python list to array
 */
export const ensureArray = <T>(input: T | T[]): T[] => {
  return Array.isArray(input) ? input : [input];
};