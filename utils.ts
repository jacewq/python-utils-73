export type PythonExecutionResult = {
  stdout: string;
  stderr: string;
  exitCode: number;
};

export class PythonExecutionError extends Error {
  constructor(public readonly result: PythonExecutionResult) {
    super(`Python execution failed with code ${result.exitCode}`);
    this.name = 'PythonExecutionError';
  }
}

/**
 * Validates script output for standard edge cases.
 */
export function validateResult(result: PythonExecutionResult): void {
  if (result.exitCode !== 0) {
    throw new PythonExecutionError(result);
  }

  if (result.stdout.trim() === '' && result.stderr.length > 0) {
    throw new Error('Script produced no output and triggered errors');
  }
}

/**
 * Safely parses JSON output from python scripts.
 */
export function safeParseJson<T>(jsonString: string): T | null {
  try {
    return JSON.parse(jsonString) as T;
  } catch (err) {
    console.error('Failed to parse Python JSON output', err);
    return null;
  }
}