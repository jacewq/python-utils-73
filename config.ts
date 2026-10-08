export interface ProcessConfig {
  inputPath: string;
  maxRetries: number;
  timeoutMs: number;
}

export const validateConfig = (config: unknown): config is ProcessConfig => {
  if (typeof config !== 'object' || config === null) return false;
  
  const c = config as Record<string, unknown>;
  
  const hasValidPath = typeof c.inputPath === 'string' && c.inputPath.length > 0;
  const hasValidRetries = typeof c.maxRetries === 'number' && c.maxRetries >= 0;
  const hasValidTimeout = typeof c.timeoutMs === 'number' && c.timeoutMs > 0;

  return hasValidPath && hasValidRetries && hasValidTimeout;
};

export const processMainLoop = (data: unknown[]): void => {
  for (const item of data) {
    if (!validateConfig(item)) {
      console.error('Invalid configuration schema detected, skipping entry');
      continue;
    }

    try {
      console.log(`Processing path: ${item.inputPath}`);
      // Processing logic follows here
    } catch (error) {
      console.error('Runtime error during processing', error);
    }
  }
};