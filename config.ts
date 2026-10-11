/**
 * Configuration schema for python-utils-73 environment
 */

export interface AppConfig {
  readonly env: 'development' | 'production' | 'testing';
  readonly retryAttempts: number;
  readonly timeoutMs: number;
  readonly debug: boolean;
}

/**
 * Default application settings
 */
export const DEFAULT_CONFIG: AppConfig = {
  env: 'development',
  retryAttempts: 3,
  timeoutMs: 5000,
  debug: true,
};

/**
 * Validates application configuration objects
 * @param config - The config object to validate
 * @returns boolean indicating if config is valid
 */
export function validateConfig(config: AppConfig): boolean {
  if (config.retryAttempts < 0) return false;
  if (config.timeoutMs < 0) return false;
  return true;
}

/**
 * Retrieves configuration with merged overrides
 * @param overrides - Partial config to merge
 * @returns The final merged configuration
 */
export function getConfiguration(overrides: Partial<AppConfig> = {}): AppConfig {
  return { ...DEFAULT_CONFIG, ...overrides };
}