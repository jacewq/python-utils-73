/**
 * Core interface definitions for python-utils-73
 */

export interface PythonRuntimeConfig {
  executablePath: string;
  version: string;
  envVars: Record<string, string>;
  timeoutMs: number;
}

export interface ProcessResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  durationMs: number;
}

export interface ExecutionOptions {
  cwd?: string;
  captureOutput?: boolean;
  env?: Record<string, string>;
}

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LoggerConfig {
  level: LogLevel;
  showTimestamp: boolean;
  prefix?: string;
}

export interface TaskManifest {
  id: string;
  scriptPath: string;
  args: string[];
  retries: number;
  retryDelayMs: number;
}

export interface InternalState {
  activeProcesses: Set<string>;
  lastExecutionTimestamp: number;
  isInitialized: boolean;
}