/**
 * Configuration interface for python-utils-73 environment settings.
 */
export interface AppConfig {
  readonly environment: 'development' | 'production' | 'testing';
  readonly timeoutMs: number;
  readonly debugMode: boolean;
  readonly retryAttempts: number;
}

/**
 * Default configuration instance with strict typing.
 */
export const defaultConfig: AppConfig = {
  environment: 'development',
  timeoutMs: 5000,
  debugMode: true,
  retryAttempts: 3
};

/**
 * Validates the provided configuration object.
 * @param config - The configuration object to validate
 * @returns boolean indicating if the config is valid
 */
export const isValidConfig = (config: AppConfig): boolean => {
  return config.timeoutMs > 0 && config.retryAttempts >= 0;
};

/**
 * Merges partial updates into the current configuration.
 * @param current - The existing configuration
 * @param updates - Partial configuration updates
 * @returns A new merged configuration object
 */
export const updateConfig = (current: AppConfig, updates: Partial<AppConfig>): AppConfig => {
  return { ...current, ...updates };
};