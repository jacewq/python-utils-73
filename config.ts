interface AppConfig {
  env: string; // Application environment setting
  debug: boolean; // Debug mode flag
  logLevel: 'debug' | 'info' | 'warn' | 'error'; // Logging configuration
  maxRetries: number; // Network settings
  timeoutMs: number;
  features: { enableCache: boolean; useCompression: boolean; }; // Feature flags
}

const defaultConfig: AppConfig = { env: 'development', debug: true, logLevel: 'info', maxRetries: 3, timeoutMs: 10000, features: { enableCache: true, useCompression: false } };

function mergeConfig(base: AppConfig, overrides: Partial<AppConfig>): AppConfig {
  return { ...base, ...overrides, features: { ...base.features, ...(overrides.features || {}) } };
}

function validateConfig(config: AppConfig): void {
  if (config.maxRetries < 0) throw new Error('maxRetries must be non-negative');
  if (config.timeoutMs <= 0) throw new Error('timeoutMs must be positive');
  const validLevels = ['debug', 'info', 'warn', 'error'];
  if (!validLevels.includes(config.logLevel)) throw new Error('Invalid log level');
}

export class ConfigManager {
  private config: AppConfig;
  constructor(initial?: Partial<AppConfig>) {
    this.config = mergeConfig(defaultConfig, initial || {});
    validateConfig(this.config);
  }
  getConfig(): AppConfig {
    return JSON.parse(JSON.stringify(this.config)); // Return a copy to prevent mutation
  }
  setConfig(updates: Partial<AppConfig>): void {
    const newConfig = mergeConfig(this.config, updates);
    validateConfig(newConfig);
    this.config = newConfig;
  }
  isDebug(): boolean { return this.config.debug; }
  getLogLevel(): string { return this.config.logLevel; }
}

export { AppConfig };