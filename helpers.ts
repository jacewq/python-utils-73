export interface RetryOptions {
  maxRetries: number;
  delayMs: number;
}

/**
 * Executes a function with exponential backoff retry logic.
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = { maxRetries: 3, delayMs: 1000 }
): Promise<T> {
  let lastError: unknown;

  for (let i = 0; i <= options.maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i === options.maxRetries) break;

      const backoffDelay = options.delayMs * Math.pow(2, i);
      await new Promise((resolve) => setTimeout(resolve, backoffDelay));
    }
  }

  throw lastError;
}

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));