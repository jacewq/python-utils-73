/**
 * Configuration settings for the python-utils-73 library.
 */
export interface LibraryConfig {
  readonly environment: 'development' | 'production';
  readonly debug: boolean;
  readonly timeoutMs: number;
}

/**
 * Generic structure for processing python object metadata.
 */
export interface PythonMetadata {
  readonly name: string;
  readonly version: string;
  readonly dependencies: ReadonlyArray<string>;
}

/**
 * Result wrapper for utility function operations.
 */
export interface OperationResult<T> {
  readonly success: boolean;
  readonly data: T | null;
  readonly error: string | null;
}

/**
 * Type alias for path operations across platforms.
 */
export type FilePath = string;

/**
 * Mapping of configuration keys to typed values.
 */
export type ConfigMap = Map<string, string | number | boolean>;