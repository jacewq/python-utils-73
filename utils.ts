export interface RetryOptions {
  maxRetries: number;
  delayMs: number;
}

/**
 * Executes a function with simple exponential backoff retry logic
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = { maxRetries: 3, delayMs: 1000 }
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= options.maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt === options.maxRetries) break;
      
      const wait = options.delayMs * Math.pow(2, attempt);
      await new Promise((resolve) => setTimeout(resolve, wait));
    }
  }

  throw lastError;
}