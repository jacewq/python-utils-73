export interface AppConfig {
  env: 'development' | 'production' | 'test';
  port: number;
  host: string;
  debug: boolean;
  timeoutMs: number;
}

const DEFAULT_CONFIG: AppConfig = {
  env: 'development',
  port: 8080,
  host: '127.0.0.1',
  debug: false,
  timeoutMs: 30000,
};

/**
 * Loader and manager for application configuration with environment fallback.
 */
export class ConfigLoader {
  private config: AppConfig;

  constructor(overrides: Partial<AppConfig> = {}) {
    this.config = this.loadConfig(overrides);
  }

  /**
   * Merges defaults, environment variables, and manual overrides.
   */
  private loadConfig(overrides: Partial<AppConfig>): AppConfig {
    const env = (typeof process !== 'undefined' && process.env) || {};

    const envOverrides: Partial<AppConfig> = {
      env: (env.NODE_ENV as AppConfig['env']) || undefined,
      port: env.PORT ? parseInt(env.PORT, 10) : undefined,
      host: env.HOST || undefined,
      debug: env.DEBUG ? env.DEBUG === 'true' : undefined,
    };

    // Clean undefined values to prevent overriding defaults with undefined
    const filteredEnv = Object.fromEntries(
      Object.entries(envOverrides).filter(([_, value]) => value !== undefined)
    );

    return {
      ...DEFAULT_CONFIG,
      ...filteredEnv,
      ...overrides,
    };
  }

  /**
   * Retrieves a specific configuration option.
   */
  public get<K extends keyof AppConfig>(key: K): AppConfig[K] {
    return this.config[key];
  }

  /**
   * Retrieves the full configuration object.
   */
  public getAll(): AppConfig {
    return { ...this.config };
  }
}