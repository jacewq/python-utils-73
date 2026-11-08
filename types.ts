export interface PythonExecutionResult {
  output: string;
  error: string | null;
  exitCode: number | null;
}

export class PythonExecutionError extends Error {
  constructor(
    public readonly message: string,
    public readonly exitCode: number | null,
    public readonly stderr: string = ''
  ) {
    super(message);
    this.name = 'PythonExecutionError';
  }
}

export type ValidationResult = 
  | { success: true; data: unknown }
  | { success: false; error: string; code: 'INVALID_PATH' | 'TIMEOUT' | 'UNKNOWN' };

export const handleExecutionFailure = (err: unknown): PythonExecutionError => {
  if (err instanceof PythonExecutionError) {
    return err;
  }
  const message = err instanceof Error ? err.message : 'An unknown execution error occurred';
  return new PythonExecutionError(message, -1);
};

export const isExecutionValid = (result: PythonExecutionResult): boolean => {
  return result.exitCode === 0 && result.error === null;
};