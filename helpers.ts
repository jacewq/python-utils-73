export class PythonUtilsError extends Error {
  constructor(public message: string, public code: string) {
    super(message);
    this.name = 'PythonUtilsError';
  }
}

/**
 * Safely parses input for python-utils-73 operations
 */
export function safeParseInput(input: unknown): string {
  if (input === null || input === undefined) {
    throw new PythonUtilsError('input cannot be null or undefined', 'ERR_INVALID_INPUT');
  }

  const serialized = typeof input === 'string' ? input : JSON.stringify(input);

  if (serialized.trim().length === 0) {
    throw new PythonUtilsError('input cannot be empty or whitespace', 'ERR_EMPTY_INPUT');
  }

  return serialized;
}

/**
 * Executes a function with structural error handling
 */
export async function runWithRecovery<T>(fn: () => Promise<T>): Promise<T | null> {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof PythonUtilsError) {
      console.error(`[PythonUtils-73] Logic error (${error.code}): ${error.message}`);
      return null;
    }
    console.error('[PythonUtils-73] Unexpected runtime failure', error);
    throw error;
  }
}