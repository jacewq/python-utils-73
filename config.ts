export interface PythonUtilsConfig {
  pythonPath: string;
  timeoutMs: number;
  maxBufferMB: number;
  environment: Record<string, string>;
  debug: boolean;
}

export const DEFAULT_CONFIG: Readonly<PythonUtilsConfig> = Object.freeze({
  pythonPath: 'python3',
  timeoutMs: 30000,
  maxBufferMB: 10,
  environment: {},
  debug: false,
});

/**
 * Merges user-provided configuration with default settings.
 * Ensures types and fallback values are applied correctly.
 */
export function loadConfig(userConfig?: Partial<PythonUtilsConfig>): PythonUtilsConfig {
  if (!userConfig) {
    return { ...DEFAULT_CONFIG, environment: { ...DEFAULT_CONFIG.environment } };
  }

  return {
    pythonPath: typeof userConfig.pythonPath === 'string' && userConfig.pythonPath.trim() !== ''
      ? userConfig.pythonPath
      : DEFAULT_CONFIG.pythonPath,
    timeoutMs: typeof userConfig.timeoutMs === 'number' && userConfig.timeoutMs > 0
      ? userConfig.timeoutMs
      : DEFAULT_CONFIG.timeoutMs,
    maxBufferMB: typeof userConfig.maxBufferMB === 'number' && userConfig.maxBufferMB > 0
      ? userConfig.maxBufferMB
      : DEFAULT_CONFIG.maxBufferMB,
    environment: {
      ...DEFAULT_CONFIG.environment,
      ...(userConfig.environment || {}),
    },
    debug: typeof userConfig.debug === 'boolean'
      ? userConfig.debug
      : DEFAULT_CONFIG.debug,
  };
}
