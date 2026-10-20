/**
 * Core interface for sanitized data structures
 */
export interface DataPayload<T = unknown> {
  id: string;
  timestamp: number;
  content: T;
}

/**
 * Type guard to ensure data integrity
 */
export function isDataPayload(input: unknown): input is DataPayload {
  return (
    typeof input === 'object' &&
    input !== null &&
    'id' in input &&
    'timestamp' in input &&
    'content' in input
  );
}

/**
 * Configuration for data transformation pipeline
 */
export type TransformOptions = {
  stripNulls?: boolean;
  recursive?: boolean;
};

/**
 * Generic result wrapper for utility operations
 */
export interface OperationResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Deeply clean object properties
 */
export const sanitizeObject = <T extends Record<string, any>>(obj: T): Partial<T> => {
  const result = { ...obj };
  for (const key in result) {
    if (result[key] === null || result[key] === undefined) {
      delete result[key];
    }
  }
  return result;
};