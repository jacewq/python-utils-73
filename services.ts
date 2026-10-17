export interface ServiceResponse<T> {
  data: T | null;
  error: Error | null;
}

export const safeExecute = async <T>(operation: () => Promise<T>): Promise<ServiceResponse<T>> => {
  try {
    const result = await operation();
    return { data: result, error: null };
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error(`[Service Error]: ${error.message}`);
    return { data: null, error };
  }
};

export const validateConfig = (config: Record<string, unknown>): void => {
  if (!config || Object.keys(config).length === 0) {
    throw new Error('Configuration object cannot be empty');
  }
  
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined || value === null) {
      throw new Error(`Missing required configuration value for key: ${key}`);
    }
  }
};

export const retryOperation = async <T>(fn: () => Promise<T>, retries = 3): Promise<T> => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  throw new Error('Operation failed after maximum retries');
};