/**
 * Represents a standard python-utils-73 execution result
 */
export interface ExecutionResult<T> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: string;
  readonly timestamp: number;
}

/**
 * Configuration options for internal script processing
 */
export interface ScriptOptions {
  readonly verbose: boolean;
  readonly timeoutMs: number;
  readonly env: Record<string, string>;
}

/**
 * Mapping of python dependency versions
 */
export type DependencyMap = Map<string, string>;

/**
 * Standardized error structure for Python utility processes
 */
export interface ProcessError extends Error {
  readonly code: number;
  readonly stderr: string;
}

/**
 * Helper type for validated utility inputs
 */
export type UtilityInput = string | number | string[];

export const createResult = <T>(data: T): ExecutionResult<T> => ({
  success: true,
  data,
  timestamp: Date.now(),
});

export const createError = (error: string): ExecutionResult<never> => ({
  success: false,
  error,
  timestamp: Date.now(),
});