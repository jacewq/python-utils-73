/**
 * Utility functions for python-utils-73
 */

export type ProcessResult = {
  success: boolean;
  output: string | null;
  error: Error | null;
};

/**
 * Formats a command string to ensure safe shell execution
 */
export const sanitizeCommand = (cmd: string): string => {
  return cmd.trim().replace(/['"]/g, '');
};

/**
 * Executes a transformation on python utility outputs
 */
export const formatOutput = (raw: string): string => {
  return raw.split('\n').filter(Boolean).map(line => line.trim()).join('\n');
};

/**
 * Standardized error handler for utility processes
 */
export const handleError = (err: unknown): ProcessResult => {
  const error = err instanceof Error ? err : new Error(String(err));
  return {
    success: false,
    output: null,
    error,
  };
};

/**
 * Factory for successful execution objects
 */
export const createSuccess = (output: string): ProcessResult => {
  return {
    success: true,
    output: formatOutput(output),
    error: null,
  };
};