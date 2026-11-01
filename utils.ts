export interface PythonProcessResult {
  stdout: string;
  stderr: string;
  exitCode: number;
}

/**
 * Cleans environment variables to prevent shell injection
 */
export function sanitizeEnv(env: Record<string, string | undefined>): Record<string, string> {
  const clean: Record<string, string> = {};
  for (const [key, value] of Object.entries(env)) {
    if (value !== undefined && /^[a-zA-Z0-9_]+$/.test(key)) {
      clean[key] = value;
    }
  }
  return clean;
}

/**
 * Formats python path separators for cross-platform compatibility
 */
export function normalizePath(path: string): string {
  return path.replace(/[\\/]/g, '/');
}

/**
 * Truncates long output logs to maintain memory efficiency
 */
export function truncateOutput(output: string, maxLength: number = 10000): string {
  if (output.length <= maxLength) return output;
  return output.slice(0, maxLength) + '\n...[truncated]';
}

export const DEFAULT_PYTHON_VERSION = '3.10';

export function getPythonCommand(isWindows: boolean): string {
  return isWindows ? 'python' : 'python3';
}