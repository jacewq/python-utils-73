export interface RetryOptions {
  maxRetries?: number;
  initialDelayMs?: number;
  backoffFactor?: number;
  retryOn?: (error: unknown) => boolean;
}

/**
 * Executes an async operation with configurable retry attempts and exponential backoff.
 */
export async function retryOperation<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelayMs = 500,
    backoffFactor = 2,
    retryOn = () => true,
  } = options;

  let attempt = 0;
  let delay = initialDelayMs;

  while (true) {
    try {
      attempt++;
      return await operation();
    } catch (error) {
      const isLastAttempt = attempt > maxRetries;
      const shouldRetry = retryOn(error);

      if (isLastAttempt || !shouldRetry) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= backoffFactor;
    }
  }
}