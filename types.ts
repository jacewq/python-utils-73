/**
 * Custom error types for python-utils-73 operations
 */

export class PythonExecutionError extends Error {
  constructor(public message: string, public exitCode: number | null, public stderr: string) {
    super(message);
    this.name = 'PythonExecutionError';
  }
}

export class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigurationError';
  }
}

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number;
}

export type PythonResult = ExecutionResult | PythonExecutionError;

/**
 * Validates process output and throws for edge cases
 */
export function validateResult(res: ExecutionResult): void {
  if (res.exitCode !== 0) {
    throw new PythonExecutionError(
      `Process failed with exit code ${res.exitCode}`,
      res.exitCode,
      res.stderr
    );
  }

  if (!res.stdout && res.stderr.includes('Error')) {
    throw new PythonExecutionError('Process output empty with errors', res.exitCode, res.stderr);
  }
}