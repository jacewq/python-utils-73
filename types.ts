export class PythonUtilsError extends Error {
  constructor(public message: string, public code: string, public context?: Record<string, unknown>) {
    super(message);
    this.name = 'PythonUtilsError';
  }
}

export type ExecutionResult<T> = 
  | { success: true; data: T }
  | { success: false; error: PythonUtilsError };

export interface ValidationOptions {
  strict: boolean;
  timeout?: number;
}

export const handleExecutionError = (err: unknown, context: string): PythonUtilsError => {
  if (err instanceof PythonUtilsError) {
    return err;
  }
  
  const message = err instanceof Error ? err.message : 'Unknown execution error';
  return new PythonUtilsError(message, 'EXECUTION_FAILURE', { context });
};

export const validateResponse = <T>(data: unknown, options: ValidationOptions): T => {
  if (data === null || data === undefined) {
    throw new PythonUtilsError('Received null response', 'INVALID_RESPONSE');
  }
  
  if (options.strict && typeof data !== 'object') {
    throw new PythonUtilsError('Strict validation failed', 'SCHEMA_MISMATCH');
  }

  return data as T;
};