/**
 * Formats a given number into a standardized string format.
 * @param value The numerical input to format.
 * @param precision Number of decimal places.
 * @returns The formatted string representation.
 */
export const formatNumber = (value: number, precision: number = 2): string => {
  return value.toFixed(precision);
};

/**
 * Deeply merges two objects into a new object.
 * @param target The base object.
 * @param source The object with properties to override.
 * @returns A new object containing merged properties.
 */
export const mergeConfigs = <T extends Record<string, any>>(target: T, source: Partial<T>): T => {
  return { ...target, ...source };
};

/**
 * Validates that a string is not empty or just whitespace.
 * @param input The string to validate.
 * @returns Boolean indicating validity.
 */
export const isValidString = (input: unknown): input is string => {
  return typeof input === 'string' && input.trim().length > 0;
};

/**
 * Delays execution for a specified duration.
 * @param ms Milliseconds to wait.
 * @returns A promise that resolves after the timeout.
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Safely parses a JSON string with a fallback value.
 * @param json The string to parse.
 * @param fallback The value returned on failure.
 * @returns The parsed object or fallback.
 */
export const safeJsonParse = <T>(json: string, fallback: T): T => {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
};