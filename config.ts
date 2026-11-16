export interface AppConfig {
  maxRetries: number;
  timeoutMs: number;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  environment: 'development' | 'production';
}

export const DEFAULT_CONFIG: AppConfig = {
  maxRetries: 3,
  timeoutMs: 5000,
  logLevel: 'info',
  environment: 'production',
};

export function validateConfig(config: Partial<AppConfig>): AppConfig {
  return {
    ...DEFAULT_CONFIG,
    ...config,
  };
}

export const getEnv = (key: string, fallback: string): string => {
  return process.env[key] || fallback;
};

export const getConfig = (): AppConfig => {
  return validateConfig({
    maxRetries: parseInt(getEnv('MAX_RETRIES', '3'), 10),
    timeoutMs: parseInt(getEnv('TIMEOUT_MS', '5000'), 10),
    logLevel: (getEnv('LOG_LEVEL', 'info') as AppConfig['logLevel']),
  });
};