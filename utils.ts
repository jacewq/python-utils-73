export interface RetryOptions {
  maxAttempts: number;
  delayMs: number;
}

/**
 * Retries an asynchronous function with a fixed delay
 */
export async function retry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = { maxAttempts: 3, delayMs: 1000 }
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= options.maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (err) {
      lastError = err;
      if (attempt < options.maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, options.delayMs));
      }
    }
  }

  throw lastError;
}