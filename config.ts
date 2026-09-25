export interface ProcessingConfig {
  maxRetries: number;
  timeoutMs: number;
  inputPath: string;
}

export const validateConfig = (config: unknown): config is ProcessingConfig => {
  if (typeof config !== 'object' || config === null) return false;

  const c = config as Record<string, unknown>;

  const isValid = 
    typeof c.maxRetries === 'number' &&
    c.maxRetries >= 0 &&
    typeof c.timeoutMs === 'number' &&
    c.timeoutMs > 0 &&
    typeof c.inputPath === 'string' &&
    c.inputPath.length > 0;

  return isValid;
};

export const processMainLoop = (data: unknown[], config: unknown): void => {
  if (!validateConfig(config)) {
    throw new Error('invalid configuration schema provided');
  }

  for (const entry of data) {
    if (typeof entry !== 'object' || entry === null) {
      console.warn('skipping invalid entry: not an object');
      continue;
    }

    const record = entry as Record<string, any>;
    if (!record.id || typeof record.id !== 'string') {
      console.warn('skipping record: missing identifier');
      continue;
    }

    // Proceed with processing
    console.log(`processing ${record.id} with timeout ${config.timeoutMs}`);
  }
};