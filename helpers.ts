export interface RetryOptions {
  attempts: number;
  delay: number;
}

/**
 * Executes a function with exponential backoff retry logic.
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = { attempts: 3, delay: 1000 }
): Promise<T> {
  let lastError: Error;

  for (let i = 0; i < options.attempts; i++) {
    try {
      return await operation();
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      
      if (i < options.attempts - 1) {
        const backoff = options.delay * Math.pow(2, i);
        await new Promise((resolve) => setTimeout(resolve, backoff));
      }
    }
  }

  throw lastError!;
}