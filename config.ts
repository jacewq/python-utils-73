export interface AppConfig {
  host: string;
  port: number;
  debug: boolean;
  timeoutMs: number;
  retryCount: number;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}

export const DEFAULT_CONFIG: Readonly<AppConfig> = {
  host: '127.0.0.1',
  port: 8080,
  debug: false,
  timeoutMs: 5000,
  retryCount: 3,
  logLevel: 'info',
};

/**
 * Loads and merges user configuration with standard defaults.
 * Environment variables are evaluated when available.
 */
export function loadConfig(userConfig: Partial<AppConfig> = {}): AppConfig {
  const envConfig: Partial<AppConfig> = {};

  if (typeof process !== 'undefined' && process.env) {
    if (process.env.APP_HOST) envConfig.host = process.env.APP_HOST;
    if (process.env.APP_PORT) envConfig.port = parseInt(process.env.APP_PORT, 10);
    if (process.env.APP_DEBUG) envConfig.debug = process.env.APP_DEBUG === 'true';
    if (process.env.APP_TIMEOUT) envConfig.timeoutMs = parseInt(process.env.APP_TIMEOUT, 10);
  }

  const merged = {
    ...DEFAULT_CONFIG,
    ...envConfig,
    ...userConfig,
  };

  if (isNaN(merged.port) || merged.port <= 0 || merged.port > 65535) {
    throw new Error(`Invalid configuration: port must be between 1 and 65535 (got ${merged.port})`);
  }

  if (isNaN(merged.timeoutMs) || merged.timeoutMs < 0) {
    throw new Error(`Invalid configuration: timeoutMs must be non-negative (got ${merged.timeoutMs})`);
  }

  return merged;
}