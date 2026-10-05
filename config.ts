export interface AppConfig {
  env: 'development' | 'staging' | 'production';
  port: number;
  debug: boolean;
  timeoutMs: number;
  maxRetries: number;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}

export const DEFAULT_CONFIG: AppConfig = {
  env: 'development',
  port: 8080,
  debug: false,
  timeoutMs: 5000,
  maxRetries: 3,
  logLevel: 'info',
};

/**
 * Loads application configuration by combining default values,
 * environment variable overrides, and explicit user settings.
 */
export function loadConfig(overrides: Partial<AppConfig> = {}): AppConfig {
  const envOverrides: Partial<AppConfig> = {};

  if (typeof process !== 'undefined' && process.env) {
    if (process.env.NODE_ENV) {
      const env = process.env.NODE_ENV.toLowerCase();
      if (env === 'production' || env === 'staging' || env === 'development') {
        envOverrides.env = env;
      }
    }
    if (process.env.PORT) {
      const parsedPort = parseInt(process.env.PORT, 10);
      if (!isNaN(parsedPort)) {
        envOverrides.port = parsedPort;
      }
    }
    if (process.env.LOG_LEVEL) {
      const level = process.env.LOG_LEVEL.toLowerCase();
      if (['debug', 'info', 'warn', 'error'].includes(level)) {
        envOverrides.logLevel = level as AppConfig['logLevel'];
      }
    }
  }

  return {
    ...DEFAULT_CONFIG,
    ...envOverrides,
    ...overrides,
  };
}