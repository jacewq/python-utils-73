export interface AppConfig {
  host: string;
  port: number;
  debug: boolean;
  timeoutMs: number;
  maxRetries: number;
  env: 'development' | 'staging' | 'production';
}

const DEFAULT_CONFIG: AppConfig = {
  host: '127.0.0.1',
  port: 8000,
  debug: false,
  timeoutMs: 5000,
  maxRetries: 3,
  env: 'development'
};

export class ConfigLoader {
  private config: AppConfig;

  constructor(initialOverrides: Partial<AppConfig> = {}) {
    this.config = this.load(initialOverrides);
  }

  /**
   * Merges defaults with environment variable overrides and explicit parameters.
   */
  private load(overrides: Partial<AppConfig>): AppConfig {
    const envConfig: Partial<AppConfig> = {};

    if (typeof process !== 'undefined' && process.env) {
      if (process.env.APP_HOST) envConfig.host = process.env.APP_HOST;
      if (process.env.APP_PORT) {
        const parsed = parseInt(process.env.APP_PORT, 10);
        if (!isNaN(parsed)) envConfig.port = parsed;
      }
      if (process.env.APP_DEBUG) {
        envConfig.debug = process.env.APP_DEBUG.toLowerCase() === 'true';
      }
      if (process.env.APP_ENV) {
        const envVal = process.env.APP_ENV as AppConfig['env'];
        if (['development', 'staging', 'production'].includes(envVal)) {
          envConfig.env = envVal;
        }
      }
    }

    return {
      ...DEFAULT_CONFIG,
      ...envConfig,
      ...overrides
    };
  }

  public get<K extends keyof AppConfig>(key: K): AppConfig[K] {
    return this.config[key];
  }

  public getAll(): Readonly<AppConfig> {
    return { ...this.config };
  }
}