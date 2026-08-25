export interface AppConfig {
  apiUrl: string;
  timeout: number;
  maxRetries: number;
  logLevel: string;
  enableCache: boolean;
}

const DEFAULT_CONFIG: AppConfig = {
  apiUrl: 'https://api.example.com',
  timeout: 30000,
  maxRetries: 3,
  logLevel: 'info',
  enableCache: true,
};

/**
 * Loads configuration by merging provided options with defaults.
 * @param userConfig Partial configuration to override defaults
 * @returns Complete configuration object
 */
export function loadConfig(userConfig: Partial<AppConfig> = {}): AppConfig {
  const config: AppConfig = {
    ...DEFAULT_CONFIG,
    ...userConfig,
  };

  // Validate required fields
  if (!config.apiUrl || config.apiUrl.trim() === '') {
    throw new Error('API URL cannot be empty');
  }

  if (config.timeout <= 0) {
    throw new Error('Timeout must be greater than zero');
  }

  if (config.maxRetries < 0) {
    throw new Error('Max retries cannot be negative');
  }

  // Ensure log level is valid
  const validLogLevels = ['debug', 'info', 'warn', 'error'];
  if (!validLogLevels.includes(config.logLevel)) {
    config.logLevel = DEFAULT_CONFIG.logLevel;
  }

  return config;
}

// Utility to get config safely
export function getConfigValue<K extends keyof AppConfig>(
  config: AppConfig,
  key: K
): AppConfig[K] {
  return config[key];
}