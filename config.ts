interface AppConfig {
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
 * Merges user-provided config with default settings
 */
export function loadConfig(userConfig: Partial<AppConfig>): AppConfig {
  return {
    ...DEFAULT_CONFIG,
    ...userConfig,
  };
}

/**
 * Validates environment variables for server settings
 */
export function getConfigFromEnv(): AppConfig {
  return loadConfig({
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : undefined,
    host: process.env.HOST,
    debug: process.env.NODE_ENV !== 'production',
  });
}