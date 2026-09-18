/**
 * Configuration interface for python-utils-73 execution settings
 */
export interface AppConfig {
  readonly environment: 'development' | 'production' | 'testing';
  readonly retryAttempts: number;
  readonly timeoutMs: number;
  readonly enableLogging: boolean;
}

/**
 * Default configuration instance with strict typing
 */
export const defaultConfig: AppConfig = {
  environment: 'production',
  retryAttempts: 3,
  timeoutMs: 5000,
  enableLogging: true,
};

/**
 * Validates provided partial config against requirements
 * @param config - The configuration object to validate
 * @returns True if configuration is valid, otherwise false
 */
export const validateConfig = (config: Partial<AppConfig>): boolean => {
  if (config.retryAttempts !== undefined && config.retryAttempts < 0) {
    return false;
  }
  if (config.timeoutMs !== undefined && config.timeoutMs < 0) {
    return false;
  }
  return true;
};

/**
 * Merges user provided config with defaults
 * @param customConfig - User defined settings
 * @returns Full validated AppConfig object
 */
export const getMergedConfig = (customConfig: Partial<AppConfig>): AppConfig => {
  return {
    ...defaultConfig,
    ...customConfig,
  };
};