export interface ProcessingConfig {
  maxRetries: number;
  timeoutMs: number;
  inputSchema: string[];
}

export const validateInput = (input: unknown, config: ProcessingConfig): boolean => {
  if (!input || typeof input !== 'object') {
    return false;
  }

  const keys = Object.keys(input as object);
  return config.inputSchema.every(requiredKey => keys.includes(requiredKey));
};

export const processMainLoop = (data: unknown[], config: ProcessingConfig): void => {
  for (const entry of data) {
    if (!validateInput(entry, config)) {
      console.error('Invalid entry structure detected', entry);
      continue;
    }

    // Execute business logic once validation passes
    console.log('Processing valid entry:', entry);
  }
};

export const defaultConfig: ProcessingConfig = {
  maxRetries: 3,
  timeoutMs: 5000,
  inputSchema: ['id', 'payload']
};