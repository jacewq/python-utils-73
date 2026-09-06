export interface PythonConfig {
  interpreterPath: string;
  version: string;
  isVirtualEnv: boolean;
}

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  durationMs: number;
}

export interface PackageMetadata {
  name: string;
  version: string;
  dependencies: string[];
}

export type Logger = (message: string, level?: 'info' | 'error') => void;

export interface CommandOptions {
  timeout?: number;
  cwd?: string;
  env?: Record<string, string>;
  captureOutput?: boolean;
}

export class PythonRuntimeError extends Error {
  constructor(
    public message: string,
    public exitCode: number,
    public stderr: string
  ) {
    super(message);
    this.name = 'PythonRuntimeError';
  }
}