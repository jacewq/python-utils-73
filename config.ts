interface AppConfig {
  port: number;
  host: string;
  debug: boolean;
}

const defaults: AppConfig = {
  port: 8080,
  host: 'localhost',
  debug: false
};

/**
 * Merges partial config object with application defaults
 */
export function loadConfig(overrides: Partial<AppConfig> = {}): AppConfig {
  return {
    ...defaults,
    ...overrides
  };
}

/**
 * Validates presence of essential configuration values
 */
export function validateConfig(config: AppConfig): void {
  if (config.port < 1024) {
    throw new Error('Port must be above 1024');
  }
}