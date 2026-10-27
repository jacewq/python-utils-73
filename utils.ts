export class PythonUtilsError extends Error {
  constructor(public message: string, public code: string) {
    super(message);
    this.name = 'PythonUtilsError';
  }
}

/**
 * Safely parses input for python-utils-73 operations
 */
export function validateInput(input: unknown): string {
  if (input === null || input === undefined) {
    throw new PythonUtilsError('input cannot be null or undefined', 'ERR_EMPTY_INPUT');
  }

  const stringified = String(input).trim();

  if (stringified.length === 0) {
    throw new PythonUtilsError('input resulted in empty string', 'ERR_BLANK_INPUT');
  }

  return stringified;
}

/**
 * Executes a function with automatic edge case trapping
 */
export async function safeExecute<T>(fn: () => Promise<T>): Promise<T | null> {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof PythonUtilsError) {
      console.error(`[PythonUtils-73] Operational error: ${error.code}`);
      return null;
    }
    
    console.error('[PythonUtils-73] Unexpected system fault:', error);
    throw error;
  }
}