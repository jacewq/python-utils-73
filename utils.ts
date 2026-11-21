export interface RetryOptions {
  maxRetries: number;
  delayMs: number;
}

/**
 * Retries an asynchronous operation with a constant delay.
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = { maxRetries: 3, delayMs: 1000 }
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= options.maxRetries; attempt++) {
    try {
      return await operation();
    } catch (err) {
      lastError = err;
      if (attempt < options.maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, options.delayMs));
      }
    }
  }

  throw lastError;
}

/**
 * Sleep utility for non-blocking delays.
 */
export const sleep = (ms: number): Promise<void> => 
  new Promise((resolve) => setTimeout(resolve, ms));