export interface AppConfig {
  env: 'development' | 'staging' | 'production';
  port: number;
  timeoutMs: number;
  maxRetries: number;
  debug: boolean;
}

export class ConfigError extends Error {
  constructor(message: string, public readonly code: string) {
    super(`ConfigError [${code}]: ${message}`);
    this.name = 'ConfigError';
  }
}

const DEFAULT_CONFIG: AppConfig = {
  env: 'development',
  port: 8080,
  timeoutMs: 5000,
  maxRetries: 3,
  debug: false,
};

export function parseConfig(rawInput: unknown): AppConfig {
  if (rawInput === null || rawInput === undefined) {
    return { ...DEFAULT_CONFIG };
  }

  let parsed: Record<string, unknown>;

  if (typeof rawInput === 'string') {
    const trimmed = rawInput.trim();
    if (trimmed === '') {
      return { ...DEFAULT_CONFIG };
    }
    try {
      parsed = JSON.parse(trimmed);
    } catch (err) {
      throw new ConfigError(
        `Failed to parse JSON string: ${(err as Error).message}`,
        'INVALID_JSON'
      );
    }
  } else if (typeof rawInput === 'object' && !Array.isArray(rawInput)) {
    parsed = rawInput as Record<string, unknown>;
  } else {
    throw new ConfigError(
      `Unsupported configuration payload type: ${typeof rawInput}`,
      'INVALID_TYPE'
    );
  }

  const port = parsed.port ?? DEFAULT_CONFIG.port;
  if (typeof port !== 'number' || !Number.isInteger(port) || port < 1 || port > 65535) {
    throw new ConfigError(
      `Port must be an integer between 1 and 65535, received: ${String(port)}`,
      'INVALID_PORT'
    );
  }

  const timeoutMs = parsed.timeoutMs ?? DEFAULT_CONFIG.timeoutMs;
  if (typeof timeoutMs !== 'number' || Number.isNaN(timeoutMs) || timeoutMs < 0) {
    throw new ConfigError(
      `Timeout must be a non-negative number, received: ${String(timeoutMs)}`,
      'INVALID_TIMEOUT'
    );
  }

  const env = String(parsed.env ?? DEFAULT_CONFIG.env);
  if (!['development', 'staging', 'production'].includes(env)) {
    throw new ConfigError(
      `Invalid environment '${env}'. Expected development, staging, or production`,
      'INVALID_ENV'
    );
  }

  return {
    env: env as AppConfig['env'],
    port,
    timeoutMs,
    maxRetries: typeof parsed.maxRetries === 'number' && parsed.maxRetries >= 0 ? parsed.maxRetries : DEFAULT_CONFIG.maxRetries,
    debug: Boolean(parsed.debug ?? DEFAULT_CONFIG.debug),
  };
}