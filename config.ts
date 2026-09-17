/**
 * Configuration settings for Python-style utility functions.
 */
export interface PythonUtilsConfig {
  /** Default character encoding used for text processing. */
  encoding: string;
  /** Maximum allowed sequence length for safety checks. */
  maxSequenceLength: number;
  /** Enable strict type coercion matching Python semantics. */
  strictCoercion: boolean;
  /** Custom logger function for internal utility warnings. */
  logger?: (message: string) => void;
}

/** Default configuration instance. */
const defaultConfig: Readonly<PythonUtilsConfig> = {
  encoding: 'utf-8',
  maxSequenceLength: 10000,
  strictCoercion: false,
};

let activeConfig: PythonUtilsConfig = { ...defaultConfig };

/**
 * Retrieves the current global configuration object.
 * @returns The active PythonUtilsConfig options.
 */
export function getConfig(): Readonly<PythonUtilsConfig> {
  return { ...activeConfig };
}

/**
 * Updates global configuration with partial overrides.
 * @param overrides Partial options to apply to current configuration.
 */
export function setConfig(overrides: Partial<PythonUtilsConfig>): void {
  activeConfig = {
    ...activeConfig,
    ...overrides,
  };
}

/**
 * Resets the active configuration back to the default values.
 */
export function resetConfig(): void {
  activeConfig = { ...defaultConfig };
}
