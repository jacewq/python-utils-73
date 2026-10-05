/**
 * Retries a promise-returning function with exponential backoff.
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) {
      throw error;
    }

    await new Promise((resolve) => setTimeout(resolve, delay));

    return withRetry(fn, retries - 1, delay * 2);
  }
}

/**
 * Helper to perform fetch requests with automatic retry logic.
 */
export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries: number = 3
): Promise<Response> {
  return withRetry(async () => {
    const response = await fetch(url, options);

    if (!response.ok && response.status >= 500) {
      throw new Error(`Server error: ${response.status}`);
    }

    return response;
  }, retries);
}