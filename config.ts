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
 * Loads configuration from environment with defaults
 */
export function loadConfig(overrides: Partial<AppConfig> = {}): AppConfig {
  return {
    ...DEFAULT_CONFIG,
    ...overrides,
    port: Number(process.env.PORT) || overrides.port || DEFAULT_CONFIG.port,
    host: process.env.HOST || overrides.host || DEFAULT_CONFIG.host,
    debug: process.env.DEBUG === 'true' || overrides.debug || DEFAULT_CONFIG.debug,
  };
}

export const config = loadConfig();