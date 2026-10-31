export interface AppConfig {
  env: 'development' | 'staging' | 'production';
  port: number;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  pythonPath: string;
  timeoutMs: number;
  maxRetries: number;
}

export const DEFAULT_CONFIG: AppConfig = {
  env: 'development',
  port: 8080,
  logLevel: 'info',
  pythonPath: 'python3',
  timeoutMs: 5000,
  maxRetries: 3,
};

export class ConfigLoader {
  private config: AppConfig;

  constructor(overrides: Partial<AppConfig> = {}) {
    this.config = this.mergeWithDefaults(overrides);
  }

  /**
   * Merges user-defined options over standard default settings
   */
  private mergeWithDefaults(overrides: Partial<AppConfig>): AppConfig {
    return {
      ...DEFAULT_CONFIG,
      ...overrides,
    };
  }

  /**
   * Retrieves a typed value from current configuration
   */
  public get<K extends keyof AppConfig>(key: K): AppConfig[K] {
    return this.config[key];
  }

  /**
   * Returns a copy of the resolved configuration object
   */
  public getAll(): AppConfig {
    return { ...this.config };
  }

  /**
   * Validates critical fields for runtime correctness
   */
  public validate(): boolean {
    if (this.config.port <= 0 || this.config.port > 65535) {
      throw new Error(`Invalid port number: ${this.config.port}`);
    }
    if (this.config.timeoutMs < 0) {
      throw new Error(`Invalid timeout value: ${this.config.timeoutMs}`);
    }
    return true;
  }
}