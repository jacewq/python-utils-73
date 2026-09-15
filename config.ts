/**
 * Configuration manager providing typed access to environment variables
 * with optional default values and automatic type casting.
 */
export class ConfigManager {
  private env: Record<string, string | undefined>;

  /**
   * Initializes the config manager with a specified environment object.
   * Defaults to Node's process.env if available.
   */
  constructor(customEnv?: Record<string, string | undefined>) {
    this.env = customEnv || (typeof process !== 'undefined' ? process.env : {});
  }

  /**
   * Retrieves a configuration value as a string.
   * Throws an error if the key is missing and no default is provided.
   */
  get(key: string, defaultValue?: string): string {
    const value = this.env[key];
    if (value === undefined) {
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      throw new Error(`Configuration key "${key}" is missing and has no default value.`);
    }
    return value;
  }

  /**
   * Retrieves a configuration value cast to a number.
   * Throws an error if the value is not a valid number.
   */
  getNumber(key: string, defaultValue?: number): number {
    const value = this.env[key];
    if (value === undefined) {
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      throw new Error(`Configuration key "${key}" is missing.`);
    }
    const parsed = Number(value);
    if (isNaN(parsed)) {
      throw new Error(`Configuration key "${key}" value "${value}" is not a valid number.`);
    }
    return parsed;
  }

  /**
   * Retrieves a configuration value cast to a boolean.
   * "true", "1", and "yes" are considered true (case-insensitive).
   */
  getBoolean(key: string, defaultValue?: boolean): boolean {
    const value = this.env[key];
    if (value === undefined) {
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      throw new Error(`Configuration key "${key}" is missing.`);
    }
    const normalized = value.toLowerCase().trim();
    return normalized === 'true' || normalized === '1' || normalized === 'yes';
  }
}