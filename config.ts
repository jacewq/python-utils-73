/**
 * Interface representing core application configuration options.
 */
export interface UtilityConfig {
  /** Maximum number of retry attempts for operations */
  maxRetries: number;
  /** Timeout duration in milliseconds */
  timeoutMs: number;
  /** Enable detailed debug logging output */
  debugMode: boolean;
  /** Default string encoding used for formatting */
  encoding: BufferEncoding;
}

/**
 * Default configuration settings for general utilities.
 */
export const DEFAULT_CONFIG: Readonly<UtilityConfig> = {
  maxRetries: 3,
  timeoutMs: 5000,
  debugMode: false,
  encoding: 'utf-utf8' as BufferEncoding,
};

/**
 * Merges custom user configuration with default settings.
 *
 * @param userConfig - Partial configuration overrides provided by the user.
 * @returns Full configuration object with defaults applied.
 */
export function createConfig(userConfig?: Partial<UtilityConfig>): UtilityConfig {
  return {
    ...DEFAULT_CONFIG,
    ...userConfig,
  };
}

/**
 * Safely reads a numeric value from environment variables with a default fallback.
 *
 * @param envVarName - The key name of the environment variable.
 * @param defaultValue - Fallback value if variable is missing or invalid.
 * @returns Parsed numeric value or fallback.
 */
export function parseEnvNumber(envVarName: string, defaultValue: number): number {
  const rawValue = process.env[envVarName];
  if (!rawValue) {
    return defaultValue;
  }
  const parsed = parseInt(rawValue, 10);
  return Number.isNaN(parsed) ? defaultValue : parsed;
}
