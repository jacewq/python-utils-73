/**
 * Configuration management for python-utils utility functions.
 */

export interface PythonUtilsConfig {
  /** Default string encoding used across text operations */
  encoding: BufferEncoding;
  /** Whether to throw errors or return defaults on soft failures */
  strictMode: boolean;
  /** Maximum depth limit for recursive utility functions */
  maxRecursionDepth: number;
  /** Custom formatting truncate length for string representations */
  reprTruncateLength: number;
}

const DEFAULT_CONFIG: PythonUtilsConfig = {
  encoding: 'utf-8',
  strictMode: false,
  maxRecursionDepth: 1000,
  reprTruncateLength: 80,
};

let activeConfig: PythonUtilsConfig = { ...DEFAULT_CONFIG };

/**
 * Retrieves the current active global configuration.
 */
export function getConfig(): Readonly<PythonUtilsConfig> {
  return Object.freeze({ ...activeConfig });
}

/**
 * Updates the global configuration with partial settings.
 */
export function setConfig(overrides: Partial<PythonUtilsConfig>): Readonly<PythonUtilsConfig> {
  activeConfig = {
    ...activeConfig,
    ...overrides,
  };
  return getConfig();
}

/**
 * Resets the configuration back to default system values.
 */
export function resetConfig(): Readonly<PythonUtilsConfig> {
  activeConfig = { ...DEFAULT_CONFIG };
  return getConfig();
}