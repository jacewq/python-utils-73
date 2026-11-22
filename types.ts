export interface PythonProcessResult {
  exitCode: number;
  stdout: string;
  stderr: string;
  durationMs: number;
}

export interface PythonConfig {
  executablePath: string;
  timeoutMs: number;
  environment: Record<string, string>;
}

export type ExecutionStatus = 'success' | 'failed' | 'timeout';

/**
 * Represents a structured response from python script execution.
 */
export interface ExecutionOutcome {
  status: ExecutionStatus;
  result: PythonProcessResult | null;
  error: Error | null;
}

/**
 * Configuration validator for utility runtime environment.
 */
export const validateConfig = (config: PythonConfig): boolean => {
  return !!config.executablePath && config.timeoutMs > 0;
};

/**
 * Default utility settings provider.
 */
export const getDefaultConfig = (): PythonConfig => ({
  executablePath: 'python3',
  timeoutMs: 5000,
  environment: { PYTHONUNBUFFERED: '1' }
});