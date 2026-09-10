export interface AppConfig {
  port: number;
  debug: boolean;
  timeout: number;
}

const DEFAULT_CONFIG: AppConfig = {
  port: 3000,
  debug: false,
  timeout: 5000,
};

/**
 * Merges partial user config with sensible defaults
 */
export function loadConfig(userConfig: Partial<AppConfig> = {}): AppConfig {
  return { ...DEFAULT_CONFIG, ...userConfig };
}

/**
 * Validates environment variables and merges into config
 */
export function loadConfigFromEnv(): AppConfig {
  const envConfig: Partial<AppConfig> = {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : undefined,
    debug: process.env.DEBUG === 'true',
    timeout: process.env.TIMEOUT ? parseInt(process.env.TIMEOUT, 10) : undefined,
  };

  // Filter out undefined values to preserve default fallbacks
  const cleanEnv = Object.fromEntries(
    Object.entries(envConfig).filter(([_, v]) => v !== undefined)
  );

  return loadConfig(cleanEnv as Partial<AppConfig>);
}