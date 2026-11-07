/**
 * Configuration interface for application environment settings.
 */
export interface AppConfig {
  readonly env: 'development' | 'production' | 'testing';
  readonly timeout: number;
  readonly retryAttempts: number;
  readonly host: string;
}

/**
 * Default application settings implementation.
 */
export const defaultConfig: AppConfig = {
  env: 'development',
  timeout: 5000,
  retryAttempts: 3,
  host: 'localhost',
};

/**
 * Validates that the provided configuration object matches the schema.
 * @param config - The partial configuration to validate
 * @returns boolean indicating if the config is valid
 */
export function validateConfig(config: Partial<AppConfig>): config is AppConfig {
  return (
    typeof config.env === 'string' &&
    typeof config.timeout === 'number' &&
    typeof config.retryAttempts === 'number' &&
    typeof config.host === 'string'
  );
}

/**
 * Merges user provided configuration with defaults.
 * @param userConfig - Partial configuration overrides
 * @returns Full validated AppConfig
 */
export function createConfig(userConfig: Partial<AppConfig>): AppConfig {
  const merged = { ...defaultConfig, ...userConfig };
  if (!validateConfig(merged)) {
    throw new Error('Invalid configuration provided');
  }
  return merged;
}