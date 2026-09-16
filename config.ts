export interface Config {
  endpoint: string;
  timeout: number;
}

export class ConfigError extends Error {
  constructor(public message: string, public code: string) {
    super(message);
    this.name = 'ConfigError';
  }
}

export const validateConfig = (config: unknown): Config => {
  if (!config || typeof config !== 'object') {
    throw new ConfigError('Invalid configuration object', 'ERR_INVALID_TYPE');
  }

  const { endpoint, timeout } = config as Partial<Config>;

  if (typeof endpoint !== 'string' || endpoint.length === 0) {
    throw new ConfigError('Missing or invalid endpoint string', 'ERR_INVALID_ENDPOINT');
  }

  if (typeof timeout !== 'number' || timeout < 0) {
    throw new ConfigError('Timeout must be a non-negative number', 'ERR_INVALID_TIMEOUT');
  }

  return { endpoint, timeout };
};

export const loadConfig = (raw: unknown): Config => {
  try {
    return validateConfig(raw);
  } catch (err) {
    if (err instanceof ConfigError) {
      console.error(`[Config] ${err.code}: ${err.message}`);
      throw err;
    }
    throw new ConfigError('Unknown configuration error', 'ERR_UNKNOWN');
  }
};