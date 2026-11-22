interface AppConfig {
  port: number;
  host: string;
  debug: boolean;
}

const DEFAULT_CONFIG: AppConfig = {
  port: 8080,
  host: 'localhost',
  debug: false,
};

/**
 * Merges partial user config with defaults
 */
export function loadConfig(userConfig: Partial<AppConfig> = {}): AppConfig {
  return {
    ...DEFAULT_CONFIG,
    ...userConfig,
  };
}

/**
 * Validates environment variables for config
 */
export function loadFromEnv(): AppConfig {
  return loadConfig({
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : undefined,
    host: process.env.HOST,
    debug: process.env.DEBUG === 'true',
  });
}