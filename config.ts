export interface AppConfig {
  maxRetries: number;
  timeoutMs: number;
  endpoint: string;
}

export const DEFAULT_CONFIG: AppConfig = {
  maxRetries: 3,
  timeoutMs: 5000,
  endpoint: 'http://localhost:8080',
};

export function validateConfig(config: unknown): AppConfig {
  if (!config || typeof config !== 'object') {
    throw new Error('Configuration must be a valid object');
  }

  const c = config as Partial<AppConfig>;
  
  if (c.maxRetries !== undefined && (typeof c.maxRetries !== 'number' || c.maxRetries < 0)) {
    throw new Error('maxRetries must be a positive number');
  }

  if (c.timeoutMs !== undefined && (typeof c.timeoutMs !== 'number' || c.timeoutMs < 100)) {
    throw new Error('timeoutMs must be at least 100ms');
  }

  if (c.endpoint !== undefined && (typeof c.endpoint !== 'string' || !c.endpoint.startsWith('http'))) {
    throw new Error('endpoint must be a valid URL string');
  }

  return { ...DEFAULT_CONFIG, ...c };
}

export function safeLoadConfig(partialConfig: unknown): AppConfig {
  try {
    return validateConfig(partialConfig);
  } catch (error) {
    console.error('Configuration validation failed, using defaults:', error instanceof Error ? error.message : error);
    return DEFAULT_CONFIG;
  }
}