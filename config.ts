export interface AppConfig {
  env: 'development' | 'staging' | 'production';
  port: number;
  host: string;
  debug: boolean;
  timeoutMs: number;
  maxRetries: number;
}

export const DEFAULT_CONFIG: AppConfig = {
  env: 'development',
  port: 8080,
  host: 'localhost',
  debug: false,
  timeoutMs: 5000,
  maxRetries: 3,
};

/**
 * Merges user-defined configuration overrides with environment defaults.
 * Automatically reads process.env when running in a Node environment.
 */
export function loadConfig(overrides: Partial<AppConfig> = {}): AppConfig {
  const envVars: Partial<AppConfig> = {};

  if (typeof process !== 'undefined' && process.env) {
    if (process.env.NODE_ENV) {
      const env = process.env.NODE_ENV.toLowerCase();
      if (env === 'production' || env === 'staging' || env === 'development') {
        envVars.env = env;
      }
    }

    if (process.env.PORT) {
      const parsedPort = parseInt(process.env.PORT, 10);
      if (!isNaN(parsedPort)) {
        envVars.port = parsedPort;
      }
    }

    if (process.env.HOST) {
      envVars.host = process.env.HOST;
    }

    if (process.env.DEBUG) {
      envVars.debug = process.env.DEBUG.toLowerCase() === 'true';
    }
  }

  return {
    ...DEFAULT_CONFIG,
    ...envVars,
    ...overrides,
  };
}
