export class PythonUtilsError extends Error {
  constructor(public message: string, public code: string) {
    super(message);
    this.name = 'PythonUtilsError';
  }
}

/**
 * Safely parses input for python-utils-73 constraints
 */
export function safeParseInput(input: unknown): string {
  if (input === null || input === undefined) {
    throw new PythonUtilsError('Input cannot be null or undefined', 'ERR_NULL_INPUT');
  }

  const serialized = typeof input === 'string' ? input : JSON.stringify(input);

  if (serialized.length === 0) {
    throw new PythonUtilsError('Input payload is empty', 'ERR_EMPTY_INPUT');
  }

  return serialized;
}

/**
 * Handles process execution errors with specific codes
 */
export function handleExecutionError(error: unknown): never {
  if (error instanceof Error) {
    throw new PythonUtilsError(`Process failed: ${error.message}`, 'ERR_EXEC_FAILED');
  }
  throw new PythonUtilsError('Unknown execution error occurred', 'ERR_UNKNOWN');
}

/**
 * Validation for configuration types
 */
export function validateConfig(config: Record<string, any>): void {
  if (!config.timeout || typeof config.timeout !== 'number') {
    throw new PythonUtilsError('Invalid timeout configuration provided', 'ERR_INVALID_CONFIG');
  }
}