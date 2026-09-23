interface RetryOptions {
  maxRetries: number;
  delayMs: number;
}

/**
 * Executes a function with a simple exponential backoff retry strategy
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
      if (attempt === options.maxRetries) break;
      
      const backoff = options.delayMs * Math.pow(2, attempt);
      await new Promise((resolve) => setTimeout(resolve, backoff));
    }
  }

  throw lastError;
}

export const fetchWithRetry = async (url: string, init?: RequestInit) => {
  return withRetry(async () => {
    const response = await fetch(url, init);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  });
};