export interface AppConfig {
  port: number;
  host: string;
  debug: boolean;
}

const DEFAULT_CONFIG: AppConfig = {
  port: 3000,
  host: 'localhost',
  debug: false,
};

/**
 * Merges partial user config with application defaults
 */
export function loadConfig(userConfig: Partial<AppConfig> = {}): AppConfig {
  return {
    ...DEFAULT_CONFIG,
    ...userConfig,
  };
}

/**
 * Environment-aware configuration factory
 */
export function getConfigFromEnv(): AppConfig {
  return loadConfig({
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : undefined,
    host: process.env.HOST,
    debug: process.env.NODE_ENV !== 'production',
  });
}