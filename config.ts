/**
 * Configuration schema and environment defaults for python-utils-73
 */

export interface AppConfig {
  readonly maxRetries: number;
  readonly timeoutMs: number;
  readonly environment: 'development' | 'production' | 'testing';
  readonly logPath: string | null;
}

/**
 * Default application settings based on process environment variables
 */
export const defaultConfig: AppConfig = {
  maxRetries: parseInt(process.env.MAX_RETRIES || '3', 10),
  timeoutMs: parseInt(process.env.TIMEOUT_MS || '5000', 10),
  environment: (process.env.NODE_ENV as AppConfig['environment']) || 'development',
  logPath: process.env.LOG_PATH || null,
};

/**
 * Validates that current configuration is operational
 * @param config - The application configuration to validate
 * @returns boolean indication of validity
 */
export function validateConfig(config: AppConfig): boolean {
  return (
    config.maxRetries >= 0 &&
    config.timeoutMs > 0 &&
    ['development', 'production', 'testing'].includes(config.environment)
  );
}

/**
 * Retrieves a typed environment variable with fallback
 * @param key - The environment variable name
 * @param defaultValue - The fallback value
 */
export const getEnv = (key: string, defaultValue: string): string => {
  return process.env[key] ?? defaultValue;
};