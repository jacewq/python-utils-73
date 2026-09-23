export interface ProcessingConfig {
  maxRetries: number;
  timeoutMs: number;
  inputPath: string;
}

export const validateConfig = (config: unknown): config is ProcessingConfig => {
  if (typeof config !== 'object' || config === null) return false;

  const c = config as Record<string, unknown>;

  // ensure required fields exist and types match
  const hasValidRetries = typeof c.maxRetries === 'number' && c.maxRetries >= 0;
  const hasValidTimeout = typeof c.timeoutMs === 'number' && c.timeoutMs > 0;
  const hasValidPath = typeof c.inputPath === 'string' && c.inputPath.length > 0;

  return hasValidRetries && hasValidTimeout && hasValidPath;
};

export const processMainLoop = (data: unknown[], config: unknown): void => {
  if (!validateConfig(config)) {
    throw new Error('invalid processing configuration provided');
  }

  // execute core processing with validated config
  for (const item of data) {
    if (item === null || typeof item !== 'object') {
      console.warn('skipping malformed input item');
      continue;
    }
    
    console.log(`processing item with timeout ${config.timeoutMs}ms`);
  }
};