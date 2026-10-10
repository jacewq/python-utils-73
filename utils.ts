export interface RetryOptions {
  maxAttempts: number;
  delayMs: number;
  backoffFactor?: number;
}

/**
 * Executes a function with exponential backoff retry logic.
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions
): Promise<T> {
  let { maxAttempts, delayMs, backoffFactor = 1 } = options;
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (attempt === maxAttempts) break;

      await new Promise((resolve) => setTimeout(resolve, delayMs));
      delayMs *= backoffFactor;
    }
  }

  throw lastError;
}

/**
 * Helper to delay execution for async sequences.
 */
export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));