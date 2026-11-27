export interface PythonProcessConfig {
  executablePath: string;
  workingDirectory: string;
  timeoutMs: number;
  env?: Record<string, string>;
}

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number | null;
  durationMs: number;
}

export interface ScriptMetadata {
  id: string;
  filename: string;
  checksum: string;
  lastModified: Date;
}

export type LoggerLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogMessage {
  level: LoggerLevel;
  message: string;
  timestamp: Date;
  context?: Record<string, unknown>;
}

export type Nullable<T> = T | null | undefined;

export type ProcessHandler = (result: ExecutionResult) => void | Promise<void>;

export class PythonUtilsError extends Error {
  constructor(public message: string, public code: string) {
    super(message);
    this.name = 'PythonUtilsError';
  }
}