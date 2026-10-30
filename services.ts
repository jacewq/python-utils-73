export interface RetryOptions {
  maxAttempts: number;
  delayMs: number;
}

export async function withRetry<T>(
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

export async function fetchWithRetry(url: string, options?: RetryOptions): Promise<Response> {
  return withRetry(async () => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  }, options);
}