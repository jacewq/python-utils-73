export interface RetryOptions {
  maxRetries: number;
  baseDelay: number;
  maxDelay?: number;
}

/**
 * Executes the given async operation, retrying on failure up to maxRetries times.
 * Uses exponential backoff between attempts.
 */
export async function retryNetworkOperation<T>(
  operation: () => Promise<T>,
  options: RetryOptions = { maxRetries: 3, baseDelay: 1000 }
): Promise<T> {
  const { maxRetries, baseDelay, maxDelay = 10000 } = options;
  let lastError: any;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (attempt === maxRetries) {
        break;
      }
      // Calculate delay with exponential backoff
      const delay = Math.min(baseDelay * Math.pow(2, attempt - 1), maxDelay);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw lastError;
}

// Example of a network fetch operation that can be retried
export async function fetchWithRetry(url: string, options?: RequestInit): Promise<Response> {
  return retryNetworkOperation(
    () => fetch(url, options),
    { maxRetries: 5, baseDelay: 500 }
  );
}