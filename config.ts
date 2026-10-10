export interface AppConfig {
  port: number;
  debug: boolean;
  timeout: number;
}

const DEFAULT_CONFIG: AppConfig = {
  port: 8080,
  debug: false,
  timeout: 3000,
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
 * Validates that the configuration meets strict requirements
 */
export function validateConfig(config: AppConfig): void {
  if (config.port < 1024 || config.port > 65535) {
    throw new Error('Invalid port range. Use 1024-65535.');
  }

  if (config.timeout < 0) {
    throw new Error('Timeout must be a positive integer.');
  }
}