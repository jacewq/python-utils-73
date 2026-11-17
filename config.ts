export interface AppConfig {
  maxRetries: number;
  timeoutMs: number;
  environment: 'development' | 'production';
}

/**
 * Validates application configuration objects for critical edge cases
 * ensuring process stability during startup.
 */
export function validateConfig(config: unknown): AppConfig {
  if (typeof config !== 'object' || config === null) {
    throw new Error('Configuration must be a valid object');
  }

  const { maxRetries, timeoutMs, environment } = config as any;

  if (typeof maxRetries !== 'number' || maxRetries < 0) {
    throw new Error('Invalid maxRetries: must be a non-negative integer');
  }

  if (typeof timeoutMs !== 'number' || timeoutMs < 100) {
    throw new Error('Invalid timeoutMs: minimum threshold is 100ms');
  }

  const validEnvs = ['development', 'production'];
  if (!validEnvs.includes(environment)) {
    throw new Error(`Invalid environment: must be one of ${validEnvs.join(', ')}`);
  }

  return config as AppConfig;
}

export const DEFAULT_CONFIG: AppConfig = {
  maxRetries: 3,
  timeoutMs: 5000,
  environment: 'development'
};