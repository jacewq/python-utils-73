export interface AppConfig {
  host: string;
  port: number;
  debug: boolean;
}

const defaults: AppConfig = {
  host: '127.0.0.1',
  port: 8080,
  debug: false,
};

/**
 * Merges partial config with defaults
 */
export function loadConfig(userConfig: Partial<AppConfig> = {}): AppConfig {
  return {
    ...defaults,
    ...userConfig,
  };
}

/**
 * Environment-based override loader
 */
export function loadConfigFromEnv(): AppConfig {
  return loadConfig({
    host: process.env.APP_HOST,
    port: process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : undefined,
    debug: process.env.APP_DEBUG === 'true',
  });
}