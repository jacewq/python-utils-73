/**
 * Utility functions for python-utils-73
 */

export interface ProcessResult {
  success: boolean;
  data: string | null;
  error: string | null;
}

/**
 * Sanitizes input strings to match Python utility requirements
 * @param input raw input string from source
 * @returns sanitized string with whitespaces trimmed
 */
export function sanitizeInput(input: string): string {
  return input.trim().replace(/\s+/g, ' ');
}

/**
 * Orchestrates command execution wrappers for python sub-processes
 * @param cmd python command string to execute
 * @returns ProcessResult object containing status
 */
export function runPythonProcess(cmd: string): ProcessResult {
  try {
    if (!cmd.startsWith('python')) {
      throw new Error('Invalid python command prefix');
    }
    return {
      success: true,
      data: `Executed: ${cmd}`,
      error: null
    };
  } catch (err: unknown) {
    return {
      success: false,
      data: null,
      error: err instanceof Error ? err.message : 'Unknown execution failure'
    };
  }
}

/**
 * Formats environment variables into standard Python args
 * @param vars mapping of environment keys
 * @returns array of CLI flags
 */
export function formatArgs(vars: Record<string, string>): string[] {
  return Object.entries(vars).map(([key, val]) => `--${key}=${val}`);
}