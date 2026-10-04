export interface RetryOptions {
  maxRetries: number;
  initialDelayMs: number;
  backoffFactor: number;
  shouldRetry?: (error: unknown) => boolean;
}

const DEFAULT_OPTIONS: RetryOptions = {
  maxRetries: 3,
  initialDelayMs: 1000,
  backoffFactor: 2,
};

/**
 * Utility function to pause execution for a given number of milliseconds.
 */
const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Retries an asynchronous operation with exponential backoff.
 *
 * @param operation - The async function to execute.
 * @param options - Configuration options for retry behavior.
 * @returns The resolved value of the operation.
 */
export async function retryOperation<T>(
  operation: () => Promise<T>,
  options: Partial<RetryOptions> = {}
): Promise<T> {
  const config: RetryOptions = { ...DEFAULT_OPTIONS, ...options };
  let lastError: unknown;
  let currentDelay = config.initialDelayMs;

  for (let attempt = 1; attempt <= config.maxRetries + 1; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (attempt > config.maxRetries) {
        break;
      }

      if (config.shouldRetry && !config.shouldRetry(error)) {
        throw error;
      }

      await sleep(currentDelay);
      currentDelay *= config.backoffFactor;
    }
  }

  throw lastError;
}
