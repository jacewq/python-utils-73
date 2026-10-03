export interface RetryOptions {
  maxAttempts: number;
  backoffMs: number;
}

/**
 * Retries a promise-returning function with exponential backoff
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = { maxAttempts: 3, backoffMs: 1000 }
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= options.maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt === options.maxAttempts) break;

      const delay = options.backoffMs * Math.pow(2, attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

/**
 * Helper to verify network availability status
 */
export const isNetworkError = (error: unknown): boolean => {
  return error instanceof Error && ('code' in error || 'status' in error);
};