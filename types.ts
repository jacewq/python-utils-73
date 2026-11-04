export interface PythonExecutionResult {
  output: string;
  error?: string;
  exitCode: number;
}

export class PythonRuntimeError extends Error {
  constructor(public message: string, public code: number) {
    super(message);
    this.name = 'PythonRuntimeError';
  }
}

export const handleExecutionFailure = (error: unknown): PythonExecutionResult => {
  if (error instanceof Error) {
    return {
      output: '',
      error: error.message,
      exitCode: 1
    };
  }
  return {
    output: '',
    error: 'An unknown fatal error occurred during execution',
    exitCode: 1
  };
};

export type ExecutionResponse = {
  status: 'success' | 'failure';
  payload: PythonExecutionResult;
};

/**
 * Validates the exit code from a python process
 * Throws PythonRuntimeError if code is non-zero
 */
export function validateExitCode(code: number | null): void {
  if (code !== 0) {
    throw new PythonRuntimeError(
      `Process exited with code ${code ?? 'null'}`, 
      code ?? 1
    );
  }
}