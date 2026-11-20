export interface AppConfig {
  version: string;
  debugMode: boolean;
  timeoutMs: number;
  retryAttempts: number;
}

/**
 * Application configuration management.
 * Holds the base settings for python-utils-73 execution.
 */
export const defaultConfig: AppConfig = {
  version: "0.1.0",
  debugMode: false,
  timeoutMs: 5000,
  retryAttempts: 3,
};

/**
 * Validates provided configuration against required schema.
 * @param config - The partial configuration object to check
 * @returns True if configuration is valid
 */
export function isValidConfig(config: Partial<AppConfig>): boolean {
  return (
    typeof config.timeoutMs === "number" &&
    config.timeoutMs > 0 &&
    typeof config.retryAttempts === "number" &&
    config.retryAttempts >= 0
  );
}

/**
 * Merges user settings with default configuration.
 * @param userConfig - Custom settings to override defaults
 * @returns The complete merged configuration
 */
export function getMergedConfig(userConfig: Partial<AppConfig>): AppConfig {
  return {
    ...defaultConfig,
    ...userConfig,
  };
}