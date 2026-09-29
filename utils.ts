export class PythonUtilsError extends Error {
  constructor(public message: string, public code?: string) {
    super(message);
    this.name = 'PythonUtilsError';
  }
}

/**
 * Safely parses input as a Python-compatible string slice index
 */
export function normalizeIndex(index: number, length: number): number {
  if (typeof index !== 'number' || isNaN(index)) {
    throw new PythonUtilsError('Index must be a numeric value', 'INVALID_INPUT');
  }

  // Handle negative indexing like Python
  let normalized = index < 0 ? length + index : index;

  if (normalized < 0 || normalized >= length) {
    throw new PythonUtilsError(`Index ${index} out of bounds`, 'OUT_OF_BOUNDS');
  }

  return normalized;
}

/**
 * Executes a computation with standard error boundary
 */
export function executeTask<T>(task: () => T): T | null {
  try {
    return task();
  } catch (error) {
    if (error instanceof PythonUtilsError) {
      console.error(`[${error.code}] ${error.message}`);
    } else {
      console.error('An unexpected runtime error occurred');
    }
    return null;
  }
}