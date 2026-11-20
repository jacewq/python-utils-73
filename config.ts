/**
 * Configuration interface for application environment settings.
 */
export interface AppConfig {
  readonly env: 'development' | 'production' | 'testing';
  readonly timeout: number;
  readonly retryAttempts: number;
}

/**
 * Default application configuration constants.
 */
export const DEFAULT_CONFIG: AppConfig = {
  env: 'development',
  timeout: 5000,
  retryAttempts: 3,
};

/**
 * Validates provided configuration object fields.
 * 
 * @param config - The application configuration to validate
 * @returns boolean indicating if the configuration is valid
 */
export function isValidConfig(config: AppConfig): boolean {
  if (config.timeout < 0) return false;
  if (config.retryAttempts < 0) return false;
  return true;
}

/**
 * Factory function to generate merged configuration.
 * 
 * @param overrides - Partial configuration to merge with defaults
 * @returns The final merged AppConfig object
 */
export function createConfig(overrides: Partial<AppConfig>): AppConfig {
  return {
    ...DEFAULT_CONFIG,
    ...overrides,
  };
}