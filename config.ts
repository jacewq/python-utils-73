export interface AppConfig {
  maxRetries: number;
  timeoutMs: number;
}

export const DEFAULT_CONFIG: AppConfig = {
  maxRetries: 3,
  timeoutMs: 5000,
};

/**
 * Validates environment configuration objects
 * @throws Error if configuration values are out of bounds
 */
export function validateConfig(config: Partial<AppConfig>): AppConfig {
  if (config.maxRetries !== undefined && (config.maxRetries < 0 || config.maxRetries > 10)) {
    throw new Error('maxRetries must be between 0 and 10');
  }

  if (config.timeoutMs !== undefined && config.timeoutMs < 100) {
    throw new Error('timeoutMs must be at least 100ms');
  }

  return {
    ...DEFAULT_CONFIG,
    ...config,
  };
}

/**
 * Safely retrieves configuration values from environment variables
 */
export function loadConfig(env: Record<string, string | undefined>): AppConfig {
  try {
    return validateConfig({
      maxRetries: env.MAX_RETRIES ? parseInt(env.MAX_RETRIES, 10) : undefined,
      timeoutMs: env.TIMEOUT_MS ? parseInt(env.TIMEOUT_MS, 10) : undefined,
    });
  } catch (error) {
    console.error('Configuration validation failed, falling back to defaults:', error);
    return DEFAULT_CONFIG;
  }
}