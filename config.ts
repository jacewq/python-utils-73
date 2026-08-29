export interface AppConfig {
  apiUrl: string;
  port: number;
  maxRetries: number;
  timeoutMs: number;
  logLevel: string;
}

export class ConfigError extends Error {
  constructor(message: string, public readonly field?: string) {
    super(message);
    this.name = 'ConfigError';
  }
}

export function loadConfig(configData: Record<string, string | undefined>): AppConfig {
  // Handle edge cases like null input
  if (configData === null || configData === undefined) {
    throw new ConfigError('Configuration data cannot be null or undefined');
  }

  // Validate API URL for required and protocol
  const apiUrl = configData.API_URL;
  if (!apiUrl || typeof apiUrl !== 'string' || apiUrl.trim().length === 0) {
    throw new ConfigError('API_URL must be a non-empty string', 'API_URL');
  }
  if (!apiUrl.startsWith('http://') && !apiUrl.startsWith('https://')) {
    throw new ConfigError('API_URL must start with http:// or https://', 'API_URL');
  }

  // Parse port handling missing and invalid values
  const portStr = configData.PORT;
  let port: number = 3000;
  if (portStr && portStr !== '') {
    const parsed = parseInt(portStr, 10);
    if (isNaN(parsed) || parsed <= 0 || parsed > 65535) {
      throw new ConfigError('PORT must be a valid number between 1 and 65535', 'PORT');
    }
    port = parsed;
  }

  // maxRetries edge case handling for range
  const retriesStr = configData.MAX_RETRIES;
  let maxRetries: number = 3;
  if (retriesStr && retriesStr !== '') {
    const parsed = parseInt(retriesStr, 10);
    if (isNaN(parsed) || parsed < 0 || parsed > 10) {
      throw new ConfigError('MAX_RETRIES must be between 0 and 10', 'MAX_RETRIES');
    }
    maxRetries = parsed;
  }

  // timeout validation for positive values
  const timeoutStr = configData.TIMEOUT_MS;
  let timeoutMs: number = 5000;
  if (timeoutStr && timeoutStr !== '') {
    const parsed = parseInt(timeoutStr, 10);
    if (isNaN(parsed) || parsed <= 0) {
      throw new ConfigError('TIMEOUT_MS must be a positive number', 'TIMEOUT_MS');
    }
    timeoutMs = parsed;
  }

  // logLevel check for valid options
  const logLevel = (configData.LOG_LEVEL || 'info').toLowerCase();
  const validLevels = ['error', 'warn', 'info', 'debug'];
  if (!validLevels.includes(logLevel)) {
    throw new ConfigError('LOG_LEVEL must be one of: error, warn, info, debug', 'LOG_LEVEL');
  }

  return {
    apiUrl: apiUrl.trim(),
    port,
    maxRetries,
    timeoutMs,
    logLevel
  };
}