export interface AppConfig {
  maxRetries: number;
  timeoutMs: number;
}

export const DEFAULT_CONFIG: AppConfig = {
  maxRetries: 3,
  timeoutMs: 5000
};

/**
 * Validates environment configuration objects
 * @throws Error if configuration values are out of bounds
 */
export function validateConfig(config: unknown): AppConfig {
  if (typeof config !== 'object' || config === null) {
    throw new Error('invalid configuration: expected object');
  }

  const { maxRetries, timeoutMs } = config as Partial<AppConfig>;

  if (typeof maxRetries !== 'number' || maxRetries < 0) {
    throw new Error('invalid maxRetries: must be non-negative number');
  }

  if (typeof timeoutMs !== 'number' || timeoutMs < 100) {
    throw new Error('invalid timeoutMs: must be at least 100ms');
  }

  return { maxRetries, timeoutMs };
}

/**
 * Safely parses configuration string from environment
 */
export function safeLoadConfig(jsonStr: string | undefined): AppConfig {
  try {
    if (!jsonStr) return DEFAULT_CONFIG;
    const parsed = JSON.parse(jsonStr);
    return validateConfig(parsed);
  } catch (err) {
    console.error('config fallback triggered:', err instanceof Error ? err.message : err);
    return DEFAULT_CONFIG;
  }
}