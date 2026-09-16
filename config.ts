export interface Config {
  retryLimit: number;
  timeoutMs: number;
}

export class ConfigError extends Error {
  constructor(public message: string, public code: string) {
    super(message);
    this.name = 'ConfigError';
  }
}

/**
 * Validates provided configuration object for edge cases
 */
export function validateConfig(config: Partial<Config>): Config {
  if (config.retryLimit !== undefined && (config.retryLimit < 0 || config.retryLimit > 10)) {
    throw new ConfigError('retryLimit must be between 0 and 10', 'INVALID_RETRY');
  }

  if (config.timeoutMs !== undefined && config.timeoutMs < 100) {
    throw new ConfigError('timeoutMs must be at least 100ms', 'INVALID_TIMEOUT');
  }

  return {
    retryLimit: config.retryLimit ?? 3,
    timeoutMs: config.timeoutMs ?? 5000
  };
}

/**
 * Safe configuration loader with default fallback
 */
export function loadConfig(raw: unknown): Config {
  try {
    if (typeof raw !== 'object' || raw === null) {
      throw new Error('Config must be an object');
    }
    return validateConfig(raw as Partial<Config>);
  } catch (err) {
    console.error('Configuration load failed, falling back to defaults:', err);
    return { retryLimit: 3, timeoutMs: 5000 };
  }
}