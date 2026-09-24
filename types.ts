/**
 * Type definitions for python-utils-73 execution context
 */

export interface PythonConfig {
  interpreterPath: string;
  version: string;
  envVars?: Record<string, string>;
  timeoutMs: number;
}

export interface ExecutionResult {
  exitCode: number;
  stdout: string;
  stderr: string;
  durationMs: number;
}

export interface ScriptTask {
  id: string;
  scriptPath: string;
  args: string[];
  retries: number;
}

/**
 * Configuration options for execution hooks
 */
export type ExecutionOptions = {
  captureOutput?: boolean;
  workingDir?: string;
};

/**
 * Validator interface for python script validation
 */
export interface ScriptValidator {
  validate(scriptPath: string): Promise<boolean>;
  formatError(error: unknown): string;
}

export type Logger = (message: string, level?: 'info' | 'error' | 'warn') => void;