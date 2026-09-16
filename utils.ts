export interface RetryOptions {
  maxAttempts: number;
  delayMs: number;
}

/**
 * Retries an asynchronous function with a constant delay.
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = { maxAttempts: 3, delayMs: 1000 }
): Promise<T> {
  let lastError: Error | unknown;

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

  throw lastError instanceof Error 
    ? lastError 
    : new Error(`Operation failed after ${options.maxAttempts} attempts: ${String(lastError)}`);
}

/**
 * Wrapper for network calls to ensure resilience.
 */
export const fetchWithRetry = <T>(url: string, init?: RequestInit): Promise<T> => {
  return withRetry(async () => {
    const response = await fetch(url, init);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json() as Promise<T>;
  });
};