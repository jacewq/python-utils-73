export interface AppConfig {
  port: number;
  env: string;
  debug: boolean;
}

const defaults: AppConfig = {
  port: 3000,
  env: 'development',
  debug: false,
};

/**
 * Merges partial config with defaults
 */
export function loadConfig(overrides: Partial<AppConfig> = {}): AppConfig {
  return { ...defaults, ...overrides };
}

/**
 * Loads config from environment variables with fallbacks
 */
export function loadConfigFromEnv(): AppConfig {
  return loadConfig({
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : undefined,
    env: process.env.NODE_ENV,
    debug: process.env.DEBUG === 'true',
  });
}