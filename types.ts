export interface PythonProcessResult {
  exitCode: number;
  stdout: string;
  stderr: string;
  durationMs: number;
}

export interface PythonConfig {
  executablePath: string;
  venvPath?: string;
  timeoutMs?: number;
  env?: Record<string, string>;
}

export interface ExecutionOptions {
  cwd?: string;
  args?: string[];
  captureOutput?: boolean;
}

export type PythonError = {
  code: 'EXECUTION_FAILED' | 'TIMEOUT' | 'PATH_NOT_FOUND';
  message: string;
  originalError?: Error;
};

export const DEFAULT_PYTHON_CONFIG: PythonConfig = {
  executablePath: 'python3',
  timeoutMs: 30000,
};

export type CleanupResult = {
  success: boolean;
  filesRemoved: number;
  errors: string[];
};