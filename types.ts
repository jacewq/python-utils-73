/**
 * Core interface definitions for python-utils-73
 */

export interface PythonConfig {
  interpreterPath: string;
  version: string;
  virtualEnv?: string;
}

export interface ExecutionResult {
  output: string;
  exitCode: number;
  error?: string;
}

export interface TaskMetadata {
  id: string;
  timestamp: number;
  tags: string[];
}

export type ProcessStatus = 'pending' | 'running' | 'completed' | 'failed';

export interface JobState {
  jobId: string;
  status: ProcessStatus;
  lastUpdated: Date;
}

export interface ValidationResult {
  isValid: boolean;
  message?: string;
  details?: Record<string, unknown>;
}

export interface LoggerConfig {
  level: 'debug' | 'info' | 'warn' | 'error';
  format: 'json' | 'text';
  outputStream: NodeJS.WritableStream;
}

export const DEFAULT_PYTHON_VERSION = '3.10.0';

export const SUPPORTED_EXTENSIONS = ['.py', '.pyi', '.pyx'] as const;

export type SupportedExtension = typeof SUPPORTED_EXTENSIONS[number];