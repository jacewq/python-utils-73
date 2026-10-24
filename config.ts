export interface PythonUtilsConfig {
  logLevel: 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR';
  maxWorkers: number;
  timeoutMs: number;
  retryAttempts: number;
  cacheDir: string;
  enableAsync: boolean;
}

export const DEFAULT_CONFIG: PythonUtilsConfig = {
  logLevel: 'INFO',
  maxWorkers: 4,
  timeoutMs: 30000,
  retryAttempts: 3,
  cacheDir: '.py_cache',
  enableAsync: true,
};

/**
 * Loads and merges runtime configurations with standard defaults.
 */
export class ConfigLoader {
  private config: PythonUtilsConfig;

  constructor(overrides: Partial<PythonUtilsConfig> = {}) {
    this.config = this.mergeConfig(overrides);
  }

  private mergeConfig(overrides: Partial<PythonUtilsConfig>): PythonUtilsConfig {
    const merged = { ...DEFAULT_CONFIG, ...overrides };

    if (merged.maxWorkers <= 0) {
      merged.maxWorkers = DEFAULT_CONFIG.maxWorkers;
    }
    if (merged.timeoutMs < 0) {
      merged.timeoutMs = DEFAULT_CONFIG.timeoutMs;
    }
    if (merged.retryAttempts < 0) {
      merged.retryAttempts = 0;
    }

    return merged;
  }

  public get<K extends keyof PythonUtilsConfig>(key: K): PythonUtilsConfig[K] {
    return this.config[key];
  }

  public getAll(): Readonly<PythonUtilsConfig> {
    return Object.freeze({ ...this.config });
  }

  public update(overrides: Partial<PythonUtilsConfig>): PythonUtilsConfig {
    this.config = this.mergeConfig({ ...this.config, ...overrides });
    return this.getAll();
  }
}
