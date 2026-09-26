export class PythonUtilsError extends Error {
  constructor(public message: string, public code: string) {
    super(message);
    this.name = 'PythonUtilsError';
  }
}

/**
 * Safely parses input for python-utils-73 execution
 */
export function validateInput(input: unknown): string {
  if (input === null || input === undefined) {
    throw new PythonUtilsError('Input cannot be null or undefined', 'ERR_EMPTY_INPUT');
  }

  const stringified = typeof input === 'string' ? input : JSON.stringify(input);

  if (stringified.trim().length === 0) {
    throw new PythonUtilsError('Input string resulted in empty payload', 'ERR_BLANK_INPUT');
  }

  return stringified;
}

/**
 * Orchestrates safe execution of utility tasks
 */
export async function runSafe<T>(task: () => Promise<T>): Promise<T | null> {
  try {
    return await task();
  } catch (error) {
    if (error instanceof PythonUtilsError) {
      console.error(`[PythonUtils-73] Logic error (${error.code}): ${error.message}`);
    } else {
      console.error('[PythonUtils-73] Unexpected system error:', error);
    }
    return null;
  }
}