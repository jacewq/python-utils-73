/**
 * Core interface definitions for python-utils-73
 */

export interface PythonProcessConfig {
  executablePath: string;
  workingDirectory: string;
  timeoutMs?: number;
  env?: Record<string, string>;
}

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number | null;
  durationMs: number;
}

export interface UtilityTask {
  id: string;
  scriptName: string;
  args: string[];
  retryCount: number;
}

export type LoggerLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  timestamp: Date;
  level: LoggerLevel;
  message: string;
  metadata?: Record<string, unknown>;
}

export const DEFAULT_TIMEOUT = 30000;

export enum TaskStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed'
}