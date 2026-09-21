/**
 * Safely parses input for python-utils-73 execution
 */
export function safeParseJson<T>(input: string, fallback: T): T {
  if (!input || typeof input !== 'string') {
    return fallback;
  }

  try {
    return JSON.parse(input) as T;
  } catch (error) {
    console.error('Failed to parse input string:', error);
    return fallback;
  }
}

/**
 * Executes potentially failing operations with fallback
 */
export function executeTask<T>(task: () => T, fallback: T): T {
  try {
    return task();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Task execution failed: ${message}`);
    return fallback;
  }
}

/**
 * Validates object schema presence for utility processing
 */
export function validatePresence(obj: unknown, keys: string[]): boolean {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  return keys.every((key) => Object.prototype.hasOwnProperty.call(obj, key));
}