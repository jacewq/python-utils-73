export interface PythonUtilsConfig {
  maxDepth: number;
  strictMode: boolean;
  encoding: string;
  timeoutMs: number;
}

const DEFAULT_CONFIG: PythonUtilsConfig = {
  maxDepth: 10,
  strictMode: false,
  encoding: 'utf-8',
  timeoutMs: 5000,
};

/**
 * Safely parses and validates configuration options with edge-case protection.
 */
export function parseConfig(rawConfig: Record<string, unknown> | null | undefined): PythonUtilsConfig {
  if (!rawConfig || typeof rawConfig !== 'object' || Array.isArray(rawConfig)) {
    return { ...DEFAULT_CONFIG };
  }

  const result: PythonUtilsConfig = { ...DEFAULT_CONFIG };

  // Validate maxDepth: handle NaN, negative values, and numeric strings
  if ('maxDepth' in rawConfig) {
    const val = rawConfig.maxDepth;
    if (typeof val === 'number' && Number.isInteger(val) && val >= 0) {
      result.maxDepth = val;
    } else if (typeof val === 'string' && !Number.isNaN(Number(val))) {
      const parsed = parseInt(val, 10);
      if (parsed >= 0) result.maxDepth = parsed;
    }
  }

  // Validate strictMode boolean conversion
  if ('strictMode' in rawConfig) {
    result.strictMode = Boolean(rawConfig.strictMode);
  }

  // Validate encoding: trim string and fallback if empty
  if ('encoding' in rawConfig && typeof rawConfig.encoding === 'string') {
    const trimmed = rawConfig.encoding.trim();
    if (trimmed.length > 0) {
      result.encoding = trimmed.toLowerCase();
    }
  }

  // Validate timeoutMs: must be positive finite integer
  if ('timeoutMs' in rawConfig) {
    const timeout = Number(rawConfig.timeoutMs);
    if (Number.isFinite(timeout) && timeout > 0) {
      result.timeoutMs = Math.floor(timeout);
    }
  }

  return result;
}

/**
 * Loads config safely from environment variables with error handling.
 */
export function loadEnvConfig(env: Record<string, string | undefined>): PythonUtilsConfig {
  try {
    return parseConfig({
      maxDepth: env.PYTHON_UTILS_MAX_DEPTH,
      strictMode: env.PYTHON_UTILS_STRICT === 'true' || env.PYTHON_UTILS_STRICT === '1',
      encoding: env.PYTHON_UTILS_ENCODING,
      timeoutMs: env.PYTHON_UTILS_TIMEOUT,
    });
  } catch {
    return { ...DEFAULT_CONFIG };
  }
}