export interface RetryOptions {
  maxAttempts: number;
  backoffMs: number;
}

/**
 * executes an asynchronous task with exponential backoff
 */
export async function withRetry<T>(
  task: () => Promise<T>,
  options: RetryOptions = { maxAttempts: 3, backoffMs: 1000 }
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= options.maxAttempts; attempt++) {
    try {
      return await task();
    } catch (err) {
      lastError = err;

      if (attempt < options.maxAttempts) {
        const delay = options.backoffMs * Math.pow(2, attempt - 1);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError instanceof Error 
    ? lastError 
    : new Error(`operation failed after ${options.maxAttempts} attempts: ${lastError}`);
}