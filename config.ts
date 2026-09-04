/**
 * Configuration interface for python-utils-73 environment.
 */
export interface AppConfig {
  readonly environment: 'development' | 'production' | 'testing';
  readonly retryAttempts: number;
  readonly timeoutMs: number;
}

/**
 * Default settings for the utility service.
 */
export const defaultConfig: AppConfig = {
  environment: 'development',
  retryAttempts: 3,
  timeoutMs: 5000
};

/**
 * Validates the provided configuration object.
 * @param config - The application configuration to validate
 * @returns boolean indicating if the configuration is valid
 */
export function validateConfig(config: AppConfig): boolean {
  if (config.retryAttempts < 0) return false;
  if (config.timeoutMs < 0) return false;
  return true;
}

/**
 * Factory to create a customized environment configuration.
 * @param overrides - Partial config overrides
 */
export function createConfig(overrides: Partial<AppConfig>): AppConfig {
  return {
    ...defaultConfig,
    ...overrides
  };
}