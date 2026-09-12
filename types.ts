/**
 * Represents a Python execution result wrapper
 */
export interface PythonResult<T = any> {
  readonly output: T;
  readonly exitCode: number;
  readonly error?: string;
}

/**
 * Configuration options for execution tasks
 */
export interface ExecutionOptions {
  readonly timeoutMs: number;
  readonly env?: Record<string, string>;
  readonly cwd?: string;
}

/**
 * Mapping of Python version identifiers to system paths
 */
export type PythonPathMap = Record<string, string>;

/**
 * Standard return structure for utility status checks
 */
export interface StatusResponse {
  readonly isAvailable: boolean;
  readonly version: string | null;
  readonly lastChecked: Date;
}

/**
 * Callback signature for async stream processing
 */
export type StreamHandler = (chunk: string) => void;

/**
 * Union type for supported serialization formats
 */
export type ExportFormat = 'json' | 'yaml' | 'csv';