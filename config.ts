/**
 * Options for configuring environment variable retrieval and parsing.
 */
export interface ConfigOptions {
  /** Default value if key is not set */
  defaultValue?: string;
  /** Whether to throw an error if missing and no default is provided */
  required?: boolean;
}

/**
 * Utility for parsing and retrieving typed configuration values.
 */
export class ConfigManager {
  private store: Map<string, string>;

  /**
   * Initializes the ConfigManager with an optional initial dictionary.
   * @param initial - Optional key-value record of configurations.
   */
  constructor(initial?: Record<string, string>) {
    this.store = new Map(Object.entries(initial ?? {}));
  }

  /**
   * Retrieves a string value from configuration or process environment.
   * @param key - The configuration key to look up.
   * @param options - Configuration options for default and required settings.
   * @returns The resolved string configuration value.
   */
  public getString(key: string, options: ConfigOptions = {}): string {
    const value = this.store.get(key) ?? process.env[key] ?? options.defaultValue;
    if (value === undefined && options.required) {
      throw new Error(`Missing required configuration key: "${key}"`);
    }
    return value ?? "";
  }

  /**
   * Retrieves a boolean value from configuration.
   * Parses 'true', '1', 'yes', 'on' as true, and 'false', '0', 'no', 'off' as false.
   * @param key - The configuration key to look up.
   * @param defaultValue - Fallback value if key is absent.
   */
  public getBool(key: string, defaultValue: boolean = false): boolean {
    const raw = this.getString(key, { defaultValue: String(defaultValue) }).toLowerCase().trim();
    if (['true', '1', 'yes', 'on'].includes(raw)) return true;
    if (['false', '0', 'no', 'off'].includes(raw)) return false;
    return defaultValue;
  }

  /**
   * Retrieves an integer configuration value.
   * @param key - The configuration key to look up.
   * @param defaultValue - Fallback value if key is absent or invalid.
   */
  public getInt(key: string, defaultValue: number = 0): number {
    const raw = this.getString(key, { defaultValue: String(defaultValue) });
    const parsed = parseInt(raw, 10);
    return Number.isNaN(parsed) ? defaultValue : parsed;
  }
}
