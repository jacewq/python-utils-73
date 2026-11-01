export interface RetryOptions {
  attempts: number;
  delayMs: number;
}

/**
 * Executes a function with exponential backoff retry logic.
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = { attempts: 3, delayMs: 1000 }
): Promise<T> {
  let lastError: unknown;

  for (let i = 0; i < options.attempts; i++) {
    try {
      return await operation();
    } catch (err) {
      lastError = err;
      if (i < options.attempts - 1) {
        await new Promise((resolve) => setTimeout(resolve, options.delayMs * Math.pow(2, i)));
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}