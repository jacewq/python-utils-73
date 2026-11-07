export interface AppConfig {
  maxRetries: number;
  timeoutMs: number;
  endpoint: string;
}

export const DEFAULT_CONFIG: AppConfig = {
  maxRetries: 3,
  timeoutMs: 5000,
  endpoint: 'http://localhost:8000',
};

/**
 * Validates application configuration to prevent runtime crashes
 * ensuring numerical bounds and valid URL schemes.
 */
export function validateConfig(config: Partial<AppConfig>): AppConfig {
  const validated = { ...DEFAULT_CONFIG, ...config };

  if (validated.maxRetries < 0 || validated.maxRetries > 10) {
    throw new Error('Invalid maxRetries: must be between 0 and 10');
  }

  if (validated.timeoutMs <= 0) {
    throw new Error('Invalid timeoutMs: must be a positive integer');
  }

  try {
    new URL(validated.endpoint);
  } catch (e) {
    throw new Error(`Invalid endpoint URL format: ${validated.endpoint}`);
  }

  return validated;
}

export function getSafeConfig(config: unknown): AppConfig {
  if (!config || typeof config !== 'object') {
    return DEFAULT_CONFIG;
  }

  try {
    return validateConfig(config as Partial<AppConfig>);
  } catch (error) {
    console.warn('Configuration validation failed, reverting to defaults:', error);
    return DEFAULT_CONFIG;
  }
}